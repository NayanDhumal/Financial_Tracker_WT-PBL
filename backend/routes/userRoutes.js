const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { protect } = require('../middlewares/authMiddleware'); // <-- make sure path is correct

// GET user by ID (protected)
router.get("/profile", protect, async (req, res) => {
    try {
      console.log("👤 Authenticated user ID:", req.user._id);
  
      const user = await userModel.findById(req.user._id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      console.error("Error in /profile:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

// UPDATE user (protected)
router.put('/profile', protect, async (req, res) => {
    try {
      const updated = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
      res.json(updated)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
  
  
  
  

module.exports = router;

