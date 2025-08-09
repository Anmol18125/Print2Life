const ScanEvent = require('../models/ScanEvent');

module.exports = function(io) {
  io.on('connection', socket => {
    console.log('Socket connected', socket.id);

    // attach io to express app for controllers to emit
    try {
      socket.server && socket.server.app && socket.server.app.set && socket.server.app.set('io', io);
    } catch (e) {
      // ignore
    }

    // on client request for full metrics
    socket.on('analytics:fetch', async (payload = {}) => {
      try {
        const campaignId = payload.campaignId || undefined;
        const filter = campaignId ? { campaignId } : {};
        const total = await ScanEvent.countDocuments(filter);

        const avgObj = await ScanEvent.aggregate([
          { $match: filter },
          { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
        ]);
        const avgDuration = (avgObj[0] && avgObj[0].avgDuration) ? Number(avgObj[0].avgDuration.toFixed(2)) : 0;

        const unique = await ScanEvent.distinct('ip', filter);

        const topLocations = await ScanEvent.aggregate([
          { $match: filter },
          { $group: { _id: '$location.country', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 }
        ]);

        socket.emit('analytics:data', {
          total,
          avgDuration,
          uniqueUsers: unique.length,
          topLocations: topLocations.map(t => ({ country: t._id || 'Unknown', count: t.count }))
        });
      } catch (err) {
        socket.emit('analytics:error', { message: err.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });
  });
};
