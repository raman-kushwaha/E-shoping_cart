const express = require("express");
const productRoute = express.Router();

//product Routes
const {
  handleAddProduct,
  handleGetProducts,
  handleDeleteProduct,
  handleSingleProductGet,
  handleUpdateProduct,
} = require("../controller/productController");

//
//
productRoute.get("/products", handleGetProducts);
productRoute.post("/product", handleAddProduct);

productRoute
  .route("/:id")
  .delete(handleDeleteProduct)
  .get(handleSingleProductGet)
  .put(handleUpdateProduct);

module.exports = {
  productRoute,
};
