const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    year: { type: Number, required: true },
    targetBooks: { type: Number, required: true, min: 1 },
    currentBooks: { type: Number, default: 0, min: 0 },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
