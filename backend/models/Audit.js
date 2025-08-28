const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  action: { type: String, required: true }, // 'created', 'paid', 'cancelled', 'picked_up'
  timestamp: { type: Date, default: Date.now },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Audit', auditSchema);
