const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    rating: { type: Number, min: 1, max: 5 },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
