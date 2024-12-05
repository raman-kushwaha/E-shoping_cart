import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./component/Header";
import { useState } from "react";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";
import ProductContext from "./store/ProductContext";

function App() {
  const [selectedTab, setSelectedTab] = useState("Products");

  return (
    <ProductContext>
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <center>
        <Outlet />
      </center>
      <Footer />
    </ProductContext>
  );
}

export default App;
