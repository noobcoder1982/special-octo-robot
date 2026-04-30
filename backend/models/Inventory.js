const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Medical & Healthcare', 'Rescue & Tactical', 'Food & Water', 'Logistics & Power', 'Shelter & Comfort']
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  unit: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Operational', 'Pristine', 'Maintenance', 'Fresh', 'Certified', 'Charged', 'Active', 'Good', 'Sealed'],
    default: 'Operational'
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Ready', 'Active', 'Maintenance', 'Sealed'],
    default: 'Ready'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
