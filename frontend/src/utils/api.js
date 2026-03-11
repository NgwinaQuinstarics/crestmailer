import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

api.interceptors.response.use(
  res => res.data,
  err => {
    const message = err.response?.data?.error || err.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const contactsApi = {
  getAll: (params = {}) => api.get('/contacts.php', { params }),
  create: (data) => api.post('/contacts.php', data),
  update: (id, data) => api.put(`/contacts.php?id=${id}`, data),
  delete: (id) => api.delete(`/contacts.php?id=${id}`),
};

export const mailApi = {
  getLogs: (params = {}) => api.get('/mail.php', { params }),
  send: (data) => api.post('/mail.php', data),
};

export const templatesApi = {
  getAll: () => api.get('/templates.php'),
  getOne: (id) => api.get(`/templates.php?id=${id}`),
  create: (data) => api.post('/templates.php', data),
  update: (id, data) => api.put(`/templates.php?id=${id}`, data),
  delete: (id) => api.delete(`/templates.php?id=${id}`),
};

export const settingsApi = {
  get: () => api.get('/settings.php'),
  update: (data) => api.post('/settings.php', data),
};

export const statsApi = {
  get: () => api.get('/stats.php'),
};

export default api;
