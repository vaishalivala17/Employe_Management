import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const api = axios.create({ baseURL })

export async function fetchEmployees(params) {
  return api.get('/api/employees', { params })
}

export async function getEmployee(id) {
  return api.get(`/api/employees/${id}`)
}

export async function createEmployee(data) {
  return api.post('/api/employees', data)
}

export async function updateEmployee(id, data) {
  return api.put(`/api/employees/${id}`, data)
}

export async function deleteEmployee(id) {
  return api.delete(`/api/employees/${id}`)
}

export default api;
