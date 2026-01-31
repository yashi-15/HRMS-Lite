import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeAPI = {
  getAll: async (isActive = true) => {
    try {
      const response = await api.get(`/employees?is_active=${isActive}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  getById: async (employeeId) => {
    try {
      const response = await api.get(`/employees/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  },

  create: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  update: async (employeeId, employeeData) => {
    try {
      const response = await api.put(`/employees/${employeeId}`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },

  delete: async (employeeId, hardDelete = false) => {
    try {
      const response = await api.delete(`/employees/${employeeId}?hard_delete=${hardDelete}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  },
};

export const attendanceAPI = {
  getByEmployee: async (employeeId) => {
    try {
      const response = await api.get(`/attendance/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  },

  getByDate: async (date) => {
    try {
      const response = await api.get(`/attendance/date/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance by date:', error);
      throw error;
    }
  },

  markBulk: async (attendanceData) => {
    try {
      const response = await api.post('/attendance/bulk', attendanceData);
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw error;
    }
  },

  getStats: async (employeeId) => {
    try {
      const response = await api.get(`/attendance/stats/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
      throw error;
    }
  },
};

export default api;