const Task = require('../models/Task');
const User = require('../models/User');
const matchingService = require('./matching.service');
const gamificationService = require('./gamification.service');

/**
 * Task Service
 * Handles task CRUD, assignment, completion, and verification
 */

/**
 * Create a new task (NGO only)
 */
const createTask = async (taskData, creatorId) => {
  try {
    const task = await Task.create({
      ...taskData,
      createdBy: creatorId,
      location: {
        type: 'Point',
        coordinates: taskData.location.coordinates,
        address: taskData.location.address || '',
      },
    });

    return task;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all tasks with pagination and filtering
 */
const getTasks = async (query = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      urgency,
      category,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;
    if (category) filter.category = category;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate('createdBy', 'name organizationName email')
        .populate('assignedVolunteers.volunteer', 'name email skills level')
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Task.countDocuments(filter),
    ]);

    return {
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get a single task by ID
 */
const getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId)
      .populate('createdBy', 'name organizationName email')
      .populate('assignedVolunteers.volunteer', 'name email skills level points')
      .populate('matchedVolunteers.volunteer', 'name email skills level');

    if (!task) {
      throw { statusCode: 404, message: 'Task not found' };
    }

    return task;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a task
 */
const updateTask = async (taskId, updateData, userId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw { statusCode: 404, message: 'Task not found' };
    }

    // Only the creator can update
    if (task.createdBy.toString() !== userId.toString()) {
      throw { statusCode: 403, message: 'Not authorized to update this task' };
    }

    // Update location if provided
    if (updateData.location) {
      updateData.location = {
        type: 'Point',
        coordinates: updateData.location.coordinates,
        address: updateData.location.address || task.location.address,
      };
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    })
      .populate('createdBy', 'name organizationName email')
      .populate('assignedVolunteers.volunteer', 'name email skills');

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

/**
 * Smart assign volunteers to a task
 * Uses the matching service to find the best candidates
 */
const smartAssignTask = async (taskId, options = {}) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw { statusCode: 404, message: 'Task not found' };
    }

    if (task.status === 'completed' || task.status === 'verified') {
      throw { statusCode: 400, message: 'Cannot assign volunteers to a completed task' };
    }

    // Get matched volunteers from the matching engine
    const matchedVolunteers = await matchingService.findMatchingVolunteers(task, options);

    // Store matching results on the task
    task.matchedVolunteers = matchedVolunteers.map((match) => ({
      volunteer: match.volunteer._id,
      score: match.score,
      breakdown: match.breakdown,
    }));

    await task.save();

    return {
      task,
      matchedVolunteers,
      totalCandidates: matchedVolunteers.length,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Manually assign specific volunteers to a task
 */
const assignVolunteers = async (taskId, volunteerIds, userId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw { statusCode: 404, message: 'Task not found' };
    }

    // Check if assigner is the task creator
    if (task.createdBy.toString() !== userId.toString()) {
      throw { statusCode: 403, message: 'Only the task creator can assign volunteers' };
    }

    // Validate volunteers exist and are actual volunteers
    const volunteers = await User.find({
      _id: { $in: volunteerIds },
      role: 'volunteer',
    });

    if (volunteers.length !== volunteerIds.length) {
      throw { statusCode: 400, message: 'One or more volunteer IDs are invalid' };
    }

    // Check max volunteers limit
    const currentCount = task.assignedVolunteers.length;
    if (currentCount + volunteerIds.length > task.maxVolunteers) {
      throw {
        statusCode: 400,
        message: `Cannot assign more than ${task.maxVolunteers} volunteers. Currently ${currentCount} assigned.`,
      };
    }

    // Add new volunteers (avoid duplicates)
    const existingIds = task.assignedVolunteers.map((a) => a.volunteer.toString());
    const newAssignments = volunteerIds
      .filter((id) => !existingIds.includes(id.toString()))
      .map((id) => ({
        volunteer: id,
        assignedAt: new Date(),
        status: 'assigned',
      }));

    task.assignedVolunteers.push(...newAssignments);
    task.status = 'assigned';
    await task.save();

    const populatedTask = await Task.findById(taskId)
      .populate('assignedVolunteers.volunteer', 'name email skills level');

    return populatedTask;
  } catch (error) {
    throw error;
  }
};

/**
 * Complete a task and trigger gamification
 */
const completeTask = async (taskId, volunteerId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw { statusCode: 404, message: 'Task not found' };
    }

    // Check if volunteer is assigned to this task
    const assignment = task.assignedVolunteers.find(
      (a) => a.volunteer.toString() === volunteerId.toString()
    );

    if (!assignment) {
      throw { statusCode: 400, message: 'You are not assigned to this task' };
    }

    // Update assignment status
    assignment.status = 'completed';

    // Check if all volunteers have completed
    const allCompleted = task.assignedVolunteers.every((a) => a.status === 'completed');
    if (allCompleted) {
      task.status = 'completed';
      task.completedAt = new Date();
    }

    await task.save();

    // Trigger gamification — award points, check levels, badges
    const gamificationResult = await gamificationService.awardPoints(volunteerId, task);

    return {
      task,
      gamification: gamificationResult,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  smartAssignTask,
  assignVolunteers,
  completeTask,
};
