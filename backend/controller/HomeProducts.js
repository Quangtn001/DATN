const ProductModel = require("../models/ProductModel");
class HomeProducts {
  async catProducts(req, res) {
    const { slug, page, keyword, sort, order } = req.params;
    const perPage = 4;
    const skip = (page - 1) * perPage;

    let sortQuery = {};
    if (sort === "price") {
      sortQuery = { price: order === "asc" ? 1 : -1 };
    } else if (sort === "title") {
      sortQuery = { title: order === "asc" ? 1 : -1 };
    } else {
      sortQuery = { createdAt: -1 };
    }
    const options = slug
      ? { category: slug }
      : keyword && { title: { $regex: `${keyword}`, $options: "i" } };
    if (page) {
      try {
        const count = await ProductModel.find({
          ...options,
        })
          .where("stock")
          .gt(0)
          .countDocuments();
        const response = await ProductModel.find({ ...options })
          .where("stock")
          .gt(0)
          .skip(skip)
          .limit(perPage)
          .populate("reviews")
          .sort(sortQuery);
        return res.status(200).json({ products: response, perPage, count });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const response = await ProductModel.find({ ...options })
        .where("stock")
        .gt(0)
        .limit(4)
        .populate("reviews")
        .sort(sortQuery);
      return res.status(200).json({ products: response });
    }
  }
}
module.exports = new HomeProducts();
