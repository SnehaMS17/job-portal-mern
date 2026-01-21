const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    description: String,
    stipend: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
