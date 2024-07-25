
import axios from 'axios';
import config from './config';

const apiClient = axios.create({
  baseURL: config.backendUrl,
});

export const getEmployees = () => apiClient.get('/employees');
export const getEmployeeById = (id) => apiClient.get(`/employees/${id}`);
export const createEmployee = (employeeData) => apiClient.post('/employees', employeeData);
export const updateEmployee = (id, employeeData) => apiClient.put(`/employees/${id}`, employeeData);
export const deleteEmployee = (id) => apiClient.delete(`/employees/${id}`);
