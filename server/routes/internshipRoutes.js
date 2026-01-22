const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");

router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      workType,
      workMode,
      page = 1,
      limit = 6,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (workType) {
      query.workType = workType;
    }

    if (workMode) {
      query.workMode = workMode;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      internships,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
