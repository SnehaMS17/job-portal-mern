const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
    },
    status: {
      type: String,
      enum: ["Applied", "Approved", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
