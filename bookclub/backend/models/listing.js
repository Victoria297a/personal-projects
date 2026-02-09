const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    type: { type: String, enum: ["sale", "swap", "giveaway"], required: true },
    condition: {
      type: String,
      enum: ["like_new", "very_good", "good", "fair"],
      required: true,
    },
    price: { type: Number, min: 0 },
    currency: { type: String, default: "EUR" },
    swapDetails: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["active", "pending", "completed"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
