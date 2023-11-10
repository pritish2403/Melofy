const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    username: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    collection: "Signup-Login",
  }
);

module.exports = mongoose.model("Signup-Login", Schema);
