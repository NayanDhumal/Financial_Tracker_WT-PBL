const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  console.log("🔐 Token from cookie:", token);

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "Nayan", (err, user) => {
    if (err) {
      console.log("❌ JWT verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("✅ Decoded user from token:", user); // Should have _id
    req.user = user;
    next();
  });
};

module.exports = { protect };

