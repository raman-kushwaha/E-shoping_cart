const express = require("express");
const app = express();
const PORT = 8001;

//cors middleware
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Database Connectivity
const { connectToMongoDB } = require("./model/connectToMongoDB");
connectToMongoDB("mongodb://127.0.0.1:27017/dashboard").then(
  console.log(`MongoDB is now connected`)
);

//Routes
const { userRoute } = require("./routes/userRoute");
const { productRoute } = require("./routes/productRoute");
app.use("/", userRoute);
app.use("/product", productRoute);

//listener
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
