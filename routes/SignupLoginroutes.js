const express = require("express");
const router = express.Router();
const Schema = require("../schema/Schema");

router.post("/create", async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const existingUser = await Schema.findOne({ username: username });
  const existingEmail = await Schema.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json("Username already exists. Please choose a different username.");
  }
  if (existingEmail) {
    return res
      .status(400)
      .json("Email already exists. Please choose a different email.");
  }

  try {
    const newUser = await Schema.create({
      name,
      username,
      email,
      password,
    });
    return res.json("User added successfully");
  } catch (error) {
    next(error);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Schema.findOne({ username: username }).then((login) => {
    if (login) {
      if (login.password === password) {
        res.json("Login successfull");
      } else if (password === "") {
        return res.status(400).json("Enter password");
      } else {
        return res.status(400).json("Username or Password incorrect");
      }
    } else if (username === "" && password === "") {
      return res.status(400).json("Enter username and password");
    } else if (username === "") {
      return res.status(400).json("Enter username");
    } else {
      return res.status(400).json("No Record Exist");
    }
  });
});

module.exports = router;
