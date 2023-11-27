import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    Amount: { type: String, required: true },
    OrderStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Cancelled", "Delivered"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema, "customers");
