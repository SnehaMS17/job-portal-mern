const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");

/**
 * GET /api/internships
 * Query params:
 *  - search
 *  - workType
 *  - page
 *  - limit
 */
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      workType,
      page = 1,
      limit = 6,
    } = req.query;

    const query = {};

    // 🔍 Search by title or company
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 Work type filter
    if (workType) {
      query.workType = workType;
    }

    const skip = (page - 1) * limit;

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
