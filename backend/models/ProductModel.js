const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const productSchema = Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    discount: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
    },
    category: {
      type: String,
      ref: "categories",
      require: true,
    },
    image1: {
      required: true,
      type: String,
    },
    image2: {
      required: true,
      type: String,
    },
    image3: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);
module.exports = model("product", productSchema);
