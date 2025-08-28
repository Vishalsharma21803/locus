import Order from "../models/Order.js";
import MenuItem from "../models/Product.js";
import mongoose from "mongoose";


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check and lock stock for each item
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.itemId).session(session);
      if (!menuItem || menuItem.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: `Insufficient stock for item: ${item.name}` });
      }
      menuItem.stock -= item.quantity;
      await menuItem.save({ session });
    }
    // Set expiresAt to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const newOrder = new Order({
      userId,
      items,
      expiresAt,
      status: "pending"
    });
    await newOrder.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ success: true, newOrder });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const confirmPayment = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== "pending") {
      return res.status(400).json({ error: "Order not found or not pending" });
    }
    order.status = "paid";
    order.paidAt = new Date();
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const confirmPickup = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== "paid") {
      return res.status(400).json({ error: "Order not found or not paid" });
    }
    order.status = "picked_up";
    order.pickedUpAt = new Date();
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error confirming pickup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findById(orderId).session(session);
    if (!order || order.status !== "pending") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Order not found or not pending" });
    }
    // Restore stock for each item
    for (const item of order.items) {
      const menuItem = await MenuItem.findById(item.itemId).session(session);
      if (menuItem) {
        menuItem.stock += item.quantity;
        await menuItem.save({ session });
      }
    }
    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error cancelling order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllOrders, createOrder, confirmPayment, confirmPickup, cancelOrder };
