const express = require("express");
const router = express.Router();
const categoryValidations = require("../validations/categoryValidations");
const CategoryController = require("../controller/categoryController");
const Authorization = require("../services/Authorization");
router.post(
  "/create-category",
  [categoryValidations, Authorization.authorized],
  CategoryController.create
);
router.get(
  "/categories/:page",
  Authorization.authorized,
  CategoryController.categories
);
router.get(
  "/fetch-category/:id",
  Authorization.authorized,
  CategoryController.fetchCategory
);
router.put(
  "/update-category/:id",
  [categoryValidations, Authorization.authorized],
  CategoryController.updateCategory
);
router.delete(
  "/delete-category/:id",
  Authorization.authorized,
  CategoryController.deleteCategory
);
router.get("/allcategories", CategoryController.allCategories);
router.get("/random-categories", CategoryController.randomCategories);
module.exports = router;
