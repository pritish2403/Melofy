const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // store hashed password, not plaintext
  },
  {
    collection: "users", // use lowercase and plural for convention
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model("User", userSchema);
