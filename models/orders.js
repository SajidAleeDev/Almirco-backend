import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    today: { type: String, required: true },
    this_month: { type: String, required: true },
    total: { type: String, required: true },
    total_orders_qty: { type: Number, required: true },
    pending_orders_qty: { type: Number, required: true },
    processing_orders_qty: { type: Number, required: true },
    delivered_orders_qty: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema, "orders");
