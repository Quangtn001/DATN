const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/ProductModel");
const CategoryModel = require("../models/Category");
class Product {
  async create(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];
        if (parsedData.title.trim().length === 0) {
          errors.push({ msg: "Title is required" });
        }
        if (parseInt(parsedData.price) < 1) {
          errors.push({ msg: "Price should be above $1" });
        }
        if (parseInt(parsedData.discount) < 0) {
          errors.push({ msg: "Discount should not be negative" });
        }
        if (parseInt(parsedData.stock) < 20) {
          errors.push({ msg: "Stock should be above 20" });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ msg: "Description is required" });
        }
        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ msg: "Image1 is required" });
          }
          if (!files["image2"]) {
            errors.push({ msg: "Image2 is required" });
          }
          if (!files["image3"]) {
            errors.push({ msg: "Image3 is required" });
          }
          if (errors.length === 0) {
            const images = {};
            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimeType = files[`image${i + 1}`].mimetype;
              const extension = mimeType.split("/")[1].toLowerCase();
              if (
                extension === "jpeg" ||
                extension === "jpg" ||
                extension === "png"
              ) {
                const imageName = uuidv4() + `.${extension}`;
                const __dirname = path.resolve();
                const newPath =
                  __dirname + `/../client/public/images/${imageName}`;
                images[`image${i + 1}`] = imageName;
                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                const error = {};
                error["msg"] = `image${i + 1} has invalid ${extension} type`;
                errors.push(error);
              }
            }
            if (errors.length === 0) {
              try {
                const response = await ProductModel.create({
                  title: parsedData.title,
                  price: parseInt(parsedData.price),
                  discount: parseInt(parsedData.discount),
                  stock: parseInt(parsedData.stock),
                  category: parsedData.category,
                  image1: images["image1"],
                  image2: images["image2"],
                  image3: images["image3"],
                  description: fields.description,
                });
                return res
                  .status(201)
                  .json({ msg: "Product has created", response });
              } catch (error) {
                console.log(error);
                return res.status(500).json(error);
              }
            } else {
              return res.status(400).json({ errors });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }
      }
    });
  }
  async get(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await ProductModel.find({}).countDocuments();
      const response = await ProductModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findOne({ _id: id })
        .populate("category")
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: { path: "user", select: "name email" },
        });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async updateProduct(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const { _id, title, price, discount, stock, category, description } =
          req.body;
        const response = await ProductModel.updateOne(
          { _id },
          {
            $set: {
              title,
              price,
              discount,
              stock,
              category,
              description,
            },
          }
        );
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findOne({ _id: id });
      [1, 2, 3].forEach((number) => {
        let key = `image${number}`;
        console.log(key);
        let image = product[key];
        let __dirname = path.resolve();
        let imagePath = __dirname + `/../client/public/images/${image}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      });
      await ProductModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ msg: "Product has been deleted successfully" });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.find({});
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json("Server internal error!");
    }
  }

  async getProductByCategory(req, res) {
    try {
      const { slug } = req.params;
      const category = await CategoryModel.findOne({ slug });
      if (!category) {
        return res.status(404).json({ message: "Không tìm thấy danh mục." });
      }
      const count = await ProductModel.find({
        category: category._id,
      })
        .where("stock")
        .gt(0)
        .countDocuments();
      const products = await ProductModel.find({
        category: category._id,
      }).populate("reviews");
      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: "Danh mục này chưa có sản phẩm!" });
      }
      return res.status(200).json({ products, count });
    } catch (error) {
      return res.status(500).json("Lỗi máy chủ!");
    }
  }
  async randomProductsByCategory(req, res) {
    const { categoryName, perPage = 4 } = req.query;

    try {
      const products = await ProductModel.aggregate([
        { $match: { category: categoryName } },
        { $sample: { size: parseInt(perPage) } },
      ]);

      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json("Internal server error!");
    }
  }
}
module.exports = new Product();
