import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/events';

// Get all events
export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new event
export const createEvent = async (event) => {
  const response = await axios.post(API_URL, event);
  return response.data;
};

// Get event by ID
export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update an event by ID
export const updateEvent = async (id, event) => {
    const response = await axios.put(`${API_URL}/${id}`, event);
    return response.data;
  };
  
  // Delete an event by ID
  export const deleteEvent = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  };