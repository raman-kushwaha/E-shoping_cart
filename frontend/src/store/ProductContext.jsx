import { createContext, useEffect, useReducer, useState } from "react";

export const ProductContextList = createContext({
  productList: [],
  dispatchProductList: () => {},
});

const reducer = (productList, action) => {
  let newProductList = productList;

  if (action.type === "ADD_PRODUCT") {
    newProductList = [action.payload.product, ...productList];
  } else if (action.type === "GET_PRODUCTS") {
    newProductList = [...action.payload.products];
  } else if (action.type === "DELETE_PORDUCT") {
    const productID = action.payload.product_id;
    newProductList = productList.filter((product) => product._id !== productID);
  } else if (action.type === "SEARCHING_PRODUCT") {
    newProductList = action.payload.result;
  }
  return newProductList;
};

const ProductContext = ({ children }) => {
  const [productList, dispatchProductList] = useReducer(reducer, []);
  const user = JSON.parse(localStorage.getItem("user"));

  const controller = new AbortController();
  const { signal } = controller;
  useEffect(() => {
    fetch("http://localhost:8001/product/products", { signal })
      .then((res) => res.json())
      .then((products) => {
        dispatchProductList({
          type: "GET_PRODUCTS",
          payload: {
            products,
          },
        });
      });

    return () => {
      controller.abort;
    };
  }, []);

  return (
    <ProductContextList.Provider value={{ productList, dispatchProductList }}>
      {children}
    </ProductContextList.Provider>
  );
};

export default ProductContext;
