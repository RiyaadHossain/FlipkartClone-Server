// External Imports
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Internal Imports
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute")
const cartRoute = require("./routes/cartRoutes")

// Environment Variable
dotenv.config();

// Middlewares
app.use(bodyParser.json());

// Connect to DB
require("./db/connect");

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running" });
});

// Routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

// Listen to PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
