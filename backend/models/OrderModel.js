const { Schema, model, Types } = require("mongoose");
const orderSchema = Schema(
  {
    productId: { type: Types.ObjectId, ref: "product" },
    userId: { type: Types.ObjectId, ref: "user" },
    quantities: {
      type: Number,
      required: true,
    },
    address: {
      required: true,
      type: Map,
    },
    status: {
      type: String,
      default: "Chưa xử lý",
      enum: ["Chưa xử lý", "Đang xử lý", "Đã giao", "Hủy"],
    },
    received: {
      default: false,
      type: Boolean,
    },
    review: {
      default: false,
      type: Boolean,
    },
    paymentMethod: {
      type: String,
    },
  },
  { timestamps: true }
);
const OrderModel = model("order", orderSchema);
module.exports = OrderModel;
