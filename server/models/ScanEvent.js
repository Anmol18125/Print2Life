const mongoose = require('mongoose');

const ScanEventSchema = new mongoose.Schema({
  campaignId: { type: String, default: 'default-campaign' },
  ip: { type: String },
  userAgent: { type: String },
  location: {
    country: String,
    region: String,
    city: String
  },
  sessionId: { type: String },
  duration: { type: Number, default: 0 }, // seconds
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanEvent', ScanEventSchema);
