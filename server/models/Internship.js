const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    workType: String, // Full time / Part time / Internship
    workMode: String, // Remote | On-site | Hybrid
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
