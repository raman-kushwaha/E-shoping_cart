const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
      require: true,
    },
    company: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
