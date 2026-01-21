const express = require("express");
const Internship = require("../models/Internship");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all internships (Public)
router.get("/", async (req, res) => {
  const internships = await Internship.find();
  res.json(internships);
});

// Create internship (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  const internship = await Internship.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(internship);
});

// Update internship (Admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  const updated = await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete internship (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Internship.findByIdAndDelete(req.params.id);
  res.json({ message: "Internship deleted" });
});

module.exports = router;
