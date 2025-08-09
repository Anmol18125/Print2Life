const ScanEvent = require('../models/ScanEvent');
const { getGeoFromIP } = require('../services/geo.service');
const uaParser = require('ua-parser-js');

/**
 * Record a scan event
 * body: { campaignId, sessionId, duration }
 */
async function recordScan(req, res) {
  try {
    const { campaignId = 'default-campaign', sessionId, duration = 0 } = req.body || {};
    // ip detection (behind proxies)
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

    const uaString = req.headers['user-agent'] || '';
    const ua = uaParser(uaString);

    const location = getGeoFromIP(ip);

    const event = new ScanEvent({
      campaignId,
      ip,
      userAgent: uaString,
      sessionId,
      duration,
      location
    });

    await event.save();

    // If socket is attached to req.app (we will set it in socket init)
    if (req.app && req.app.get('io')) {
      const io = req.app.get('io');
      // emit simple metrics update; client can request full metrics too
      io.emit('analytics:update', { type: 'scan_recorded', campaignId });
    }

    return res.status(201).json({ ok: true, id: event._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}

/**
 * fetch total scans
 */
async function getTotalScans(req, res) {
  try {
    const campaignId = req.query.campaignId || undefined;
    const filter = campaignId ? { campaignId } : {};
    const total = await ScanEvent.countDocuments(filter);
    return res.json({ total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * unique users by IP
 */
async function getUniqueUsers(req, res) {
  try {
    const campaignId = req.query.campaignId || undefined;
    const filter = campaignId ? { campaignId } : {};
    // distinct ip count
    const ips = await ScanEvent.distinct('ip', filter);
    return res.json({ uniqueUsers: ips.length });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * aggregated performance
 */
async function getPerformance(req, res) {
  try {
    const campaignId = req.query.campaignId || undefined;
    const filter = campaignId ? { campaignId } : {};

    const total = await ScanEvent.countDocuments(filter);
    const avgObj = await ScanEvent.aggregate([
      { $match: filter },
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
    ]);

    const avgDuration = (avgObj[0] && avgObj[0].avgDuration) ? Number(avgObj[0].avgDuration.toFixed(2)) : 0;

    // top locations (country)
    const topLocations = await ScanEvent.aggregate([
      { $match: filter },
      { $group: { _id: '$location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return res.json({
      total,
      avgDuration,
      topLocations: topLocations.map(t => ({ country: t._id || 'Unknown', count: t.count }))
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  recordScan,
  getTotalScans,
  getUniqueUsers,
  getPerformance
};
