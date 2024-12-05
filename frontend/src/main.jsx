import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./component/SignupPage.jsx";
import PrivateComponent from "./component/PrivateComponent.jsx";
import Login from "./component/Login.jsx";
import AddProduct from "./component/AddProduct.jsx";
import Products from "./component/Products.jsx";
import ProductList from "./component/ProductList.jsx";
import UpdateProduct from "./component/UpdateProduct.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <PrivateComponent />,
          children: [
            {
              path: "/",
              element: <ProductList />,
            },
            {
              path: "/addProduct",
              element: <AddProduct />,
            },
            {
              path: "/updateProduct/:id",
              element: <UpdateProduct />,
            },
            {
              path: "profile",
              element: <h1>Profile</h1>,
            },
            {
              path: "/logout",
              element: <h1>Logout</h1>,
            },
          ],
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ],
  {
    future: { v7: true },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
