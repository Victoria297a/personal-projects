const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    avatarUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    favoriteGenres: [{ type: String }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shelves: {
      reading: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
      finished: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
      wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
