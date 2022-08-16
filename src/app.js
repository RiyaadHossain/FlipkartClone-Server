// External Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const cors = require('cors');
const app = express();

// Internal Imports
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoutes");
const dataRoute = require("./routes/dataRoute");

// Environment Variable
dotenv.config();

// Middlewares
app.use(cors())
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "upload")));

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
app.use("/cart", cartRoute);
app.use("/data", dataRoute);

// Listen to PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});

// Test Commits