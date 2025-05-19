import axios from 'axios';

export const createTicket = async (data, token, isFile = false) => {
  if (isFile) {
    // For file uploads, data is FormData
    return axios.post('/api/tickets', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  // For non-file requests
  return axios.post('/api/tickets', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};