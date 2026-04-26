import API from "./axios";

export const getCart = () => API.get("/cart");

export const addToCart = (data) =>
  API.post("/cart", data);

export const removeFromCart = (id) =>
  API.delete(`/cart/${id}`);