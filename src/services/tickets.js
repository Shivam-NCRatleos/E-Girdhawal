import axios from 'axios';
const API_BASE_URL = "http://localhost:8000";

export const createTicket = async (data, token, isFile = false) => {
  if (isFile) {
    // For file uploads, data is FormData
    return axios.post(`${API_BASE_URL}/api/tickets`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  // For non-file requests
  return axios.post(`${API_BASE_URL}/api/tickets`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};