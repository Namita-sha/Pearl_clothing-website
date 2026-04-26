import API from './axios';

export const createRazorpayOrder = (totalAmount)  => API.post('/orders/create-razorpay-order', { totalAmount });
export const verifyPayment        = (data)         => API.post('/orders/verify-payment', data);
export const getMyOrders          = ()             => API.get('/orders/my-orders');