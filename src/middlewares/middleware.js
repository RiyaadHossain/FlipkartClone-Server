const jwt = require("jsonwebtoken");

// Verify Authetication ______________________
exports.requireAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else {
    return res.status(400).json({ error: "Authorization Required" });
  }
};

// Verify User Access______________________
exports.requireUser = (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    return res.status(400).json({
      error: "User Access Denied",
    });
  }
};

// Verify Admin Access______________________
exports.requireAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(400).json({
      error: "Admin Access Denied",
    });
  }
};
