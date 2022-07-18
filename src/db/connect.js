const mongoose = require("mongoose");

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@mycluster.rn7n6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(console.log("Database connected Successfully"))
  .catch((err) => console.log(err));
