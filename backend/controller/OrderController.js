const { validationResult } = require("express-validator");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/User");
const Reviews = require("../models/Reviews");
class Orders {
  async getOrders(req, res) {
    const query = req.query;
    const perPage = 5;
    const skip = (query.page - 1) * perPage;
    const option = query.userId ? { userId: query.userId } : {};
    try {
      const count = await OrderModel.find(option).countDocuments();
      const response = await OrderModel.find(option)
        .populate("productId", "-createdAt -updatedAt -stock -image2 -image3")
        .populate("userId", "-password -updatedAt -createdAt -admin")
        .skip(skip)
        .limit(perPage)
        .sort({ createdAt: -1 });
      return res.status(200).json({ orders: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async orderDetails(req, res) {
    const { id } = req.params;
    try {
      const details = await OrderModel.findOne({ _id: id })
        .populate("productId", "-createdAt -updatedAt -stock -image2 -image3")
        .populate("userId", "-password -updatedAt -createdAt -admin");
      return res.status(200).json({ details });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ errors: error });
    }
  }
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await OrderModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      res.json(order);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  async updateReceivedOrder(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra và cập nhật trạng thái đã nhận hàng
      const order = await OrderModel.findByIdAndUpdate(
        id,
        { received: true },
        { new: true }
      );

      // Trả về đơn hàng đã được cập nhật
      res.json(order);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  async createRating(req, res) {
    const errors = validationResult(req);
    const { rating, message, user, product, id } = req.body;
    if (errors.isEmpty()) {
      try {
        const createdReview = await Reviews.create({
          rating: parseInt(rating),
          comment: message,
          product,
          user,
        });
        console.log("review created: ", createdReview);
        await OrderModel.findByIdAndUpdate(id, { review: true });
        await ProductModel.findOneAndUpdate(
          { _id: product },
          { $push: { reviews: createdReview._id } }
        );
        return res.status(201).json({ msg: "review has created successfully" });
      } catch (error) {
        return res.status(500).json({ errors: error.message });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async createOrder(req, res) {
    try {
      // Retrieve order information from request body
      const { productId, userId, quantities, address } = req.body;

      // Create a new order using the OrderModel schema
      const order = new OrderModel({
        productId,
        userId,
        quantities,
        address,
      });

      // Save the new order to the database
      await order.save();

      // Send a response with the saved order object
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
  async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.find({});
      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json("Server internal error!");
    }
  }
}

module.exports = new Orders();
