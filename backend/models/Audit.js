import mongoose from "mongoose";
const auditSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    action: { type: String, required: true }, // 'created', 'paid', 'cancelled', 'picked_up'
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Audit", auditSchema);
