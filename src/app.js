// External Imports
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Internal Imports
const userRoute = require("./routes/user/userRoute");
const adminRoute = require("./routes/admin/adminRoute");
const categoryRoute = require("./routes/category/categoryRoutes");

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

// Listen to PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
