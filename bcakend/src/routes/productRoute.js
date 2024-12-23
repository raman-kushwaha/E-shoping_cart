const express = require("express");
const productRoute = express.Router();

//product Routes
const {
  handleAddProduct,
  handleGetProducts,
  handleDeleteProduct,
  handleSingleProductGet,
  handleUpdateProduct,
  handleSearchProductByKey,
} = require("../controller/productController");

//
//
productRoute.get("/products", handleGetProducts);
productRoute.post("/product", handleAddProduct);
productRoute.get("/search", handleSearchProductByKey);

productRoute
  .route("/:id")
  .delete(handleDeleteProduct)
  .get(handleSingleProductGet)
  .put(handleUpdateProduct);

module.exports = {
  productRoute,
};
