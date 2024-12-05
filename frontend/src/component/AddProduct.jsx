import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddProduct.module.css";
import AddProductName from "./AddProductName";
import { ProductContextList } from "../store/ProductContext";

const AddProduct = () => {
  const { dispatchProductList } = useContext(ProductContextList);

  const navigate = useNavigate();

  const Product = useRef();
  const Category = useRef();
  const Company = useRef();
  const Price = useRef();

  const handleOnSubmitFormData = async (event) => {
    event.preventDefault();
    const productname = Product.current.value;
    const category = Category.current.value;
    const company = Company.current.value;
    const price = Price.current.value;

    Product.current.value = "";
    Category.current.value = "";
    Company.current.value = "";
    Price.current.value = "";

    const user = JSON.parse(localStorage.getItem("user"));

    if (productname && category && company && price) {
      fetch("http://localhost:8001/product/product", {
        headers: { "content-type": "application/json" },
        method: "post",
        body: JSON.stringify({
          productname,
          category,
          company,
          price,
          userID: `${user._id}`,
        }),
      })
        .then((res) => res.json())
        .then((product) => {
          dispatchProductList({
            type: "ADD_PRODUCT",
            payload: {
              product,
            },
          });
          localStorage.setItem("productID", product._id);
        });
      navigate("/");
    } else {
      alert("All Fields must required");
    }
  };
  return (
    <>
      <AddProductName />
      <div className={styles.productContainer}>
        <form
          className={styles.form}
          action="#"
          method="post"
          onSubmit={handleOnSubmitFormData}
        >
          <div className="mb-3">
            <label htmlFor="product" className="form-label">
              Product
            </label>
            <input
              placeholder="product name"
              type="text"
              className="form-control"
              id="product"
              ref={Product}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              placeholder="category"
              type="text"
              className="form-control"
              id="category"
              ref={Category}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              placeholder="company"
              type="text"
              className="form-control"
              id="company"
              ref={Company}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              placeholder="price"
              type="text"
              className="form-control"
              id="price"
              ref={Price}
            />
          </div>
          <div className={styles.submitBtn}>
            <button type="reset" className="btn btn-primary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
