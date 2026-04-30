require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');
const connectDB = require('../config/db');

/**
 * Database Seed Script
 * Populates the database with realistic test data
 * Run: npm run seed
 */

const seedData = async () => {
  try {
    await connectDB();
    console.log('\n🌱 Starting database seed...\n');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // ── Create NGOs ──────────────────────────
    const ngos = await User.create([
      {
        role: 'ngo',
        name: 'Rajesh Kumar',
        organizationName: 'Green Earth Foundation',
        email: 'greenearth@ngo.org',
        password: 'password123',
        verified: true,
      },
      {
        role: 'ngo',
        name: 'Priya Sharma',
        organizationName: 'Hope Relief International',
        email: 'hope@ngo.org',
        password: 'password123',
        verified: true,
      },
    ]);
    console.log(`✅ Created ${ngos.length} NGOs`);

    // ── Create Volunteers ─────────────────────
    const volunteers = await User.create([
      {
        role: 'volunteer',
        name: 'Amit Patel',
        email: 'amit@volunteer.com',
        password: 'password123',
        skills: ['first-aid', 'driving', 'cooking'],
        location: { type: 'Point', coordinates: [72.8777, 19.0760] }, // Mumbai
        availability: [
          { day: 'monday', startTime: '09:00', endTime: '17:00' },
          { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
          { day: 'saturday', startTime: '10:00', endTime: '14:00' },
        ],
        reliabilityScore: 85,
        points: 250,
        tasksCompleted: 12,
      },
      {
        role: 'volunteer',
        name: 'Sneha Reddy',
        email: 'sneha@volunteer.com',
        password: 'password123',
        skills: ['teaching', 'counseling', 'first-aid'],
        location: { type: 'Point', coordinates: [72.8560, 19.0220] }, // Near Mumbai
        availability: [
          { day: 'tuesday', startTime: '10:00', endTime: '16:00' },
          { day: 'thursday', startTime: '10:00', endTime: '16:00' },
          { day: 'saturday', startTime: '09:00', endTime: '13:00' },
        ],
        reliabilityScore: 92,
        points: 450,
        tasksCompleted: 20,
      },
      {
        role: 'volunteer',
        name: 'Vikram Singh',
        email: 'vikram@volunteer.com',
        password: 'password123',
        skills: ['construction', 'driving', 'logistics'],
        location: { type: 'Point', coordinates: [77.1025, 28.7041] }, // Delhi
        availability: [
          { day: 'monday', startTime: '08:00', endTime: '18:00' },
          { day: 'friday', startTime: '08:00', endTime: '18:00' },
        ],
        reliabilityScore: 70,
        points: 120,
        tasksCompleted: 6,
      },
      {
        role: 'volunteer',
        name: 'Kavya Nair',
        email: 'kavya@volunteer.com',
        password: 'password123',
        skills: ['teaching', 'translation', 'data-entry'],
        location: { type: 'Point', coordinates: [72.9000, 19.1000] }, // Near Mumbai
        availability: [
          { day: 'monday', startTime: '14:00', endTime: '20:00' },
          { day: 'tuesday', startTime: '14:00', endTime: '20:00' },
          { day: 'wednesday', startTime: '14:00', endTime: '20:00' },
          { day: 'thursday', startTime: '14:00', endTime: '20:00' },
          { day: 'friday', startTime: '14:00', endTime: '20:00' },
        ],
        reliabilityScore: 95,
        points: 800,
        tasksCompleted: 35,
      },
      {
        role: 'volunteer',
        name: 'Arjun Mehta',
        email: 'arjun@volunteer.com',
        password: 'password123',
        skills: ['first-aid', 'logistics', 'cooking', 'driving'],
        location: { type: 'Point', coordinates: [72.8300, 18.9900] }, // Near Mumbai
        availability: [
          { day: 'saturday', startTime: '07:00', endTime: '19:00' },
          { day: 'sunday', startTime: '07:00', endTime: '19:00' },
        ],
        reliabilityScore: 60,
        points: 80,
        tasksCompleted: 4,
      },
    ]);

    // Recalculate levels for seeded volunteers
    for (const vol of volunteers) {
      vol.calculateLevel();
      await vol.save({ validateBeforeSave: false });
    }
    console.log(`✅ Created ${volunteers.length} Volunteers`);

    // ── Create Tasks ──────────────────────────
    const tasks = await Task.create([
      {
        title: 'Emergency Medical Camp Setup',
        description: 'Set up a medical camp in the flood-affected area. Need volunteers with first-aid skills to assist doctors and manage supply distribution.',
        category: 'healthcare',
        location: { type: 'Point', coordinates: [72.8800, 19.0800], address: 'Dharavi, Mumbai' },
        urgency: 'critical',
        requiredSkills: ['first-aid', 'logistics'],
        maxVolunteers: 3,
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        createdBy: ngos[1]._id,
      },
      {
        title: 'Community Teaching Program',
        description: 'Teach basic English and Math to underprivileged children in the Andheri community center. 2-hour sessions.',
        category: 'education',
        location: { type: 'Point', coordinates: [72.8500, 19.1200], address: 'Andheri, Mumbai' },
        urgency: 'medium',
        requiredSkills: ['teaching'],
        maxVolunteers: 2,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        createdBy: ngos[0]._id,
      },
      {
        title: 'Tree Plantation Drive',
        description: 'Plant 500 saplings along the highway. Need volunteers to dig, plant, and water saplings. Tools provided.',
        category: 'environment',
        location: { type: 'Point', coordinates: [72.9200, 19.0500], address: 'Thane Highway, Mumbai' },
        urgency: 'low',
        requiredSkills: [],
        maxVolunteers: 10,
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        createdBy: ngos[0]._id,
      },
      {
        title: 'Disaster Relief Supply Distribution',
        description: 'Distribute food, water, and essential supplies to families affected by recent floods. Need drivers and logistics coordinators.',
        category: 'disaster-relief',
        location: { type: 'Point', coordinates: [72.8600, 19.0100], address: 'South Mumbai' },
        urgency: 'high',
        requiredSkills: ['driving', 'logistics'],
        maxVolunteers: 5,
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
        createdBy: ngos[1]._id,
      },
    ]);
    console.log(`✅ Created ${tasks.length} Tasks`);

    // ── Print Summary ─────────────────────────
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SEED COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📊 Summary:`);
    console.log(`   NGOs:        ${ngos.length}`);
    console.log(`   Volunteers:  ${volunteers.length}`);
    console.log(`   Tasks:       ${tasks.length}`);
    console.log('\n🔑 Test Credentials:');
    console.log('   NGO Login:       greenearth@ngo.org / password123');
    console.log('   Volunteer Login: amit@volunteer.com / password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedData();
