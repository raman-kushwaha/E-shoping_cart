import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Products.module.css";
import { MdDelete } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { ProductContextList } from "../store/ProductContext";

const Products = ({ product, deleteProduct }) => {
  const { dispatchProductList } = useContext(ProductContextList);
  const navigate = useNavigate();

  return (
    <div className={`card ${styles.Card}`} style={{ width: "18rem" }}>
      <div className={styles.img_body}>
        <div className={styles.image}></div>
      </div>
      <div className={`card-body ${styles.cardBody}`}>
        <h5 className={`card-title ${styles.card_heading}`}>
          {product.product_name}
        </h5>
        <div className={styles.card_detail}>
          <p className={`card-text ${styles.para}`}>
            Category : {product.category}
          </p>
          <p className={`card-text ${styles.para}`}>
            Company : {product.company}
          </p>
        </div>
        <div className={styles.priceContainer}>
          <label className={styles.price}>${product.price}</label>
        </div>
        <div className={styles.icons}>
          <MdOutlineUpdate
            onClick={() => navigate(`/updateProduct/${product._id}`)}
          />
          <MdDelete
            onClick={() => {
              deleteProduct(product._id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
