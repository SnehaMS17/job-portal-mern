const express = require("express");
const Application = require("../models/Application");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply internship (User)
router.post("/apply", protect, async (req, res) => {
  const { internshipId } = req.body;

  const alreadyApplied = await Application.findOne({
    userId: req.user.id,
    internshipId,
  });

  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied" });
  }

  const application = await Application.create({
    userId: req.user.id,
    internshipId,
  });

  res.status(201).json(application);
});

// Get my applications (User)
router.get("/my", protect, async (req, res) => {
  const apps = await Application.find({ userId: req.user.id }).populate(
    "internshipId"
  );
  res.json(apps);
});

// Get all applications (Admin)
router.get("/", protect, adminOnly, async (req, res) => {
  const apps = await Application.find()
    .populate("userId", "name email")
    .populate("internshipId", "title company");
  res.json(apps);
});

// Update application status (Admin)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
