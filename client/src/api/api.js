import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export async function recordScan(payload) {
  return axios.post(`${SERVER}/api/scan`, payload);
}

export async function getTotalScans() {
  return axios.get(`${SERVER}/api/metrics/total-scans`);
}

export async function getUniqueUsers() {
  return axios.get(`${SERVER}/api/metrics/unique-users`);
}

export async function getPerformance() {
  return axios.get(`${SERVER}/api/metrics/performance`);
}
