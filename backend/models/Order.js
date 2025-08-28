const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  status: { type: String, enum: ['pending', 'paid', 'cancelled', 'picked_up'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  paidAt: Date,
  pickedUpAt: Date,
  cancelledAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
