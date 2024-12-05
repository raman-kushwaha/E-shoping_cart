import styles from "./ProductList.module.css";
import { useContext } from "react";
import Products from "./Products";
import { ProductContextList } from "../store/ProductContext";

const ProductList = () => {
  const { productList, dispatchProductList } = useContext(ProductContextList);

  const deleteProduct = async (productID) => {
    const res = await fetch(`http://localhost:8001/product/${productID}`, {
      method: "delete",
      headers: { "content-type": "application/json" },
    });
    const product = await res.json();

    dispatchProductList({
      type: "DELETE_PORDUCT",
      payload: {
        product_id: product._id,
      },
    });
  };
  return (
    <div className={styles.productList}>
      {productList.map((product) => (
        <Products
          key={product._id}
          product={product}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
