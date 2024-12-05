const { productModel } = require("../model/product");

const handleAddProduct = async (req, res) => {
  try {
    const { productname, category, company, userID, price } = req.body;

    if (!productname || !category || !company || !userID || !price)
      return res.json({ err: "All Fields must required" });

    const product = await productModel.create({
      product_name: productname,
      category,
      company,
      userID,
      price,
    });

    return res.json(product);
  } catch (err) {
    return res.json({ product: "Not Found" });
  }
};

const handleGetProducts = async (req, res) => {
  try {
    const product = await productModel.find();
    return res.json(product);
  } catch (err) {
    return res.json({ product: "Not Found" });
  }
};

const handleDeleteProduct = async (req, res) => {
  const deleteProductID = `${req.params.id}`;

  try {
    if (deleteProductID.length > 24 || deleteProductID.length < 24) {
      return res.json({ err: "productID must be under 24 character" });
    } else if (deleteProductID) {
      const deletedProduct = await productModel.findOneAndDelete({
        _id: deleteProductID,
      });

      if (deletedProduct) {
        return res.json(deletedProduct);
      } else {
        return res.json({ err: "Not found" });
      }
    } else return res.json({ err: "ID must required" });
  } catch (err) {
    return res.json({ product: "Not Found" });
  }
};

const handleSingleProductGet = async (req, res) => {
  const productID = `${req.params.id}`;

  try {
    if (productID.length > 24 || productID.length < 24) {
      return res.json({ err: "productID must be under 24 character" });
    } else if (productID && productID.length !== -1) {
      const product = await productModel.findOne({ _id: productID });
      if (product) {
        return res.json(product);
      } else {
        return res.json({ product: "Not Found" });
      }
    }
  } catch (err) {
    return res.json({ product: "Not Found" });
  }
};

const handleUpdateProduct = async (req, res) => {
  const productID = req.params.id;

  try {
    if (productID.toString().length > 24 || productID.toString().length < 24) {
      throw new Error("Product ID must required and under 24 character");
    } else if (productID && productID.toString().length === 24) {
      const { productname, category, company, userID, price } = req.body;

      const product = await productModel.findOneAndUpdate(
        {
          _id: productID,
        },
        {
          $set: {
            product_name: productname,
            category: category,
            company: company,
            userID: userID,
            price: price,
          },
        }
      );

      return res.json(product);
    }
  } catch (err) {
    return res.json({ err: `${err}`.replace("Error: ", "") });
  }
};

module.exports = {
  handleAddProduct,
  handleGetProducts,
  handleDeleteProduct,
  handleSingleProductGet,
  handleUpdateProduct,
};
