import API from "./axios";

export const getWishlist = () => API.get("/wishlist");

export const addToWishlist = (data) =>
  API.post("/wishlist", data);

export const removeFromWishlist = (id) =>
  API.delete(`/wishlist/${id}`);