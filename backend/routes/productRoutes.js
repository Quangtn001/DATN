const express = require("express");
const router = new express.Router();
const Product = require("../controller/Product");
const Authorization = require("../services/Authorization");
const productValidations = require("../validations/productValidations");
const HomeProducts = require("../controller/HomeProducts");
router.post("/create-product", [Authorization.authorized], Product.create);
router.get("/products/:page", Authorization.authorized, Product.get);
router.get("/product/:id", Product.getProduct);
router.get("/random-products-by-category", Product.randomProductsByCategory);
router.put(
  "/product",
  [Authorization.authorized, productValidations],
  Product.updateProduct
);
router.delete("/delete/:id", Authorization.authorized, Product.deleteProduct);
router.get(
  "/cat-products/:slug/:page?/:sort?/:order?",
  HomeProducts.catProducts
);

router.get("/search-products/:keyword/:page?", HomeProducts.catProducts);
router.get("/allproducts", Product.getAllProducts);
router.get("/get-productCat/:slug", Product.getProductByCategory);
module.exports = router;
