import API from './axios';

export const fetchProducts = ({ gender, category } = {}) => {
  const params = {};
  if (gender)   params.gender   = gender;
  if (category) params.category = category;
  return API.get('/products', { params });
};