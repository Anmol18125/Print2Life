const geoip = require('geoip-lite');

/**
 * getGeoFromIP - returns { country, region, city } or {}
 */
function getGeoFromIP(ip) {
  if (!ip) return {};
  try {
    const geo = geoip.lookup(ip);
    if (!geo) return {};
    return {
      country: geo.country || '',
      region: geo.region || '',
      city: geo.city || ''
    };
  } catch (e) {
    return {};
  }
}

module.exports = { getGeoFromIP };
