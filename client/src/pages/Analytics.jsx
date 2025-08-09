import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import StatCard from '../components/StatCard';
import { getPerformance } from '../api/api';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL?.replace('/api','') || 'http://localhost:5000';

export default function Analytics() {
  const [metrics, setMetrics] = useState({ total: 0, avgDuration: 0, uniqueUsers: 0, topLocations: [] });

  useEffect(() => {
    const socket = io(SOCKET_URL, { autoConnect: true });

    socket.on('connect', () => {
      console.log('Connected to socket', socket.id);
      socket.emit('analytics:fetch', {});
    });

    socket.on('analytics:update', () => {
      // fetch new data after short delay
      socket.emit('analytics:fetch', {});
    });

    socket.on('analytics:data', data => {
      setMetrics(prev => ({ ...prev, ...data }));
    });

    socket.on('analytics:error', e => {
      console.error('Socket analytics error', e);
    });

    // fallback: fetch via REST if socket doesn't return data
    getPerformance().then(res => {
      const d = res.data;
      setMetrics({ total: d.total, avgDuration: d.avgDuration, topLocations: d.topLocations, uniqueUsers: d.topLocations ? d.topLocations.reduce((acc, t)=> acc + t.count, 0) : 0 });
    }).catch(err => { /* ignore */ });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Campaign Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Scans" value={metrics.total} note="Total recorded QR scans" />
        <StatCard title="Unique Users" value={metrics.uniqueUsers} note="Count by IP/device" />
        <StatCard title="Avg Time Spent (s)" value={metrics.avgDuration} note="Average session duration" />
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Top Locations</h3>
        <ul className="mt-2">
          {metrics.topLocations && metrics.topLocations.length > 0 ? metrics.topLocations.map((t, i) => (
            <li key={i} className="py-1 border-b last:border-b-0 flex justify-between">
              <span>{t.country}</span>
              <span className="font-bold">{t.count}</span>
            </li>
          )) : <li className="text-gray-500">No data yet</li>}
        </ul>
      </div>
    </div>
  );
}
