const express = require('express');
const router = express.Router();

/**
 * API Route Index
 * Aggregates all route modules under /api/v1
 */

// Import route modules
const authRoutes = require('./auth.routes');
const taskRoutes = require('./task.routes');
const volunteerRoutes = require('./volunteer.routes');
const aiRoutes = require('./ai.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/ai', aiRoutes);

module.exports = router;
