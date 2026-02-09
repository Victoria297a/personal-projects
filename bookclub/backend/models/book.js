const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: {
      name: { type: String, required: true, trim: true },
      bio: { type: String, default: "" },
    },
    plot: { type: String, required: true },
    coverUrl: { type: String, required: true },
    genres: [{ type: String }],
    isbn: { type: String, index: true },
    pages: { type: Number, min: 1 },
    publishedDate: { type: Date },
    averageRating: { type: Number, min: 0, max: 5, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
