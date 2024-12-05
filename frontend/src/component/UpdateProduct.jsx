import styles from "./UpdateProduct.module.css";
import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContextList } from "../store/ProductContext";

const UpdateProduct = () => {
  const { dispatchProductList } = useContext(ProductContextList);

  const navigate = useNavigate();

  const Product = useRef();
  const Category = useRef();
  const Company = useRef();
  const Price = useRef();

  const { id } = useParams();

  useEffect(() => {
    try {
      if (id.toString().length > 24 || id.toString().length < 24) {
        throw new Error("Product Id must be required and under 24 character");
      } else if (id) {
        fetch(`http://localhost:8001/product/${id}`)
          .then((res) => res.json())
          .then((getProduct) => {
            Product.current.value = getProduct.product_name;
            Category.current.value = getProduct.category;
            Company.current.value = getProduct.company;
            Price.current.value = getProduct.price;
          });
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const product = Product.current.value;
    const category = Category.current.value;
    const company = Company.current.value;
    const price = Price.current.value;

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`http://localhost:8001/product/${id}`, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productname: Product.current.value,
        category: Category.current.value,
        company: Company.current.value,
        userID: user._id,
        price: Price.current.value,
      }),
    });

    navigate("/");
  };
  return (
    <>
      <div className={styles.productContainer}>
        <form
          className={styles.form}
          action="#"
          method="post"
          onSubmit={handleUpdateProduct}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
