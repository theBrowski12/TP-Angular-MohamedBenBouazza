// api-server/models/order.model.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  userId: String,
  items: [{
    productId: String,
    productTitle: String,
    productImage: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: {
    type: String,
    enum: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  },
  trackingNumber: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);