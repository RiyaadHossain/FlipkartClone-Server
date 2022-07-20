const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userId;
  next();
};
