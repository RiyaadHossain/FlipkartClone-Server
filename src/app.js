// External Imports
const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Internal Imports
const userRoute = require("./routes/userRoute");

// Environment Variable
dotenv.config();

// Middlewares
app.use(express.json());

// Connect to DB
require("./db/connect");

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running" });
});

// Routes
app.use("/api", userRoute);

// Listen to PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
