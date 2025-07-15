const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Schema = require("../schema/Schema"); // User model

const SALT_ROUNDS = 10;

// ➕ Register New User
router.post("/create", async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await Schema.findOne({ username });
    const existingEmail = await Schema.findOne({ email });

    if (existingUser) {
      return res.status(400).json("Username already exists.");
    }
    if (existingEmail) {
      return res.status(400).json("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await Schema.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.json("User registered successfully");
  } catch (error) {
    next(error);
  }
});

// 🔐 User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json("Please enter username and password");

  try {
    const user = await Schema.findOne({ username });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.json("Login successful");
    } else {
      return res.status(400).json("Incorrect password");
    }
  } catch (error) {
    return res.status(500).json("Server error during login");
  }
});

// 👤 Get User Data
router.post("/data", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await Schema.findOne({ username }).select("-password"); // exclude password
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return res.status(500).json("Error fetching user");
  }
});

// ❌ Delete User
router.delete("/delete", async (req, res) => {
  const { username } = req.body;

  try {
    const deletedUser = await Schema.findOneAndDelete({ username });

    if (deletedUser) {
      return res.json({ message: "User deleted successfully", deletedUser });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return res.status(500).json("Failed to delete user");
  }
});

// 🔄 Update User (name + password)
router.post("/update", async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    const user = await Schema.findOne({ username });

    if (!user) {
      return res.status(404).json("User not found");
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    await user.save();

    return res.json("User data updated successfully");
  } catch (error) {
    return res.status(500).json("Failed to update user");
  }
});

module.exports = router;
