import axios from 'axios';

const USER_API_URL = process.env.REACT_APP_API_URL + '/users';

// Login User
export const loginUser = async (credentials) => {
  const response = await axios.post(`${USER_API_URL}/login`, credentials);
  return response.data.token; // Return the token directly
};

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(USER_API_URL, userData);
  return response.data;
};
