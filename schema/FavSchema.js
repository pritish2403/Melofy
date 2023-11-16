const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    username: { type: String },
    id: { type: String },
  },
  {
    collection: "Fav",
  }
);

module.exports = mongoose.model("Fav", FavSchema);
