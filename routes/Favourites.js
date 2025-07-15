const express = require("express");
const router = express.Router();
const FavSchema = require("../schema/FavSchema");

// ➕ Add to Favourites
router.post("/create", async (req, res, next) => {
  const { username, id, type } = req.body;

  try {
    const existing = await FavSchema.findOne({ username, id, type });
    if (existing) {
      return res.status(400).json("Already Added to Favourites");
    }

    await FavSchema.create({ username, id, type });
    return res.json("Added to Favourites");
  } catch (error) {
    next(error);
  }
});

// 📥 Get Favourites by Username
router.get("/", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username parameter is missing" });
  }

  try {
    const favourites = await FavSchema.find({ username });
    return res.json(favourites);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching favourites" });
  }
});

// ❌ Delete a Specific Favourite
router.delete("/delete", async (req, res, next) => {
  const { username, id } = req.body;

  try {
    const deleted = await FavSchema.findOneAndDelete({ username, id });
    if (deleted) {
      return res.json("Removed Successfully");
    } else {
      return res.status(404).json("Item not found in Favourites");
    }
  } catch (error) {
    next(error);
  }
});

// ❌ Delete All Favourites for a User
router.delete("/deleteAll", async (req, res, next) => {
  const { username } = req.body;

  try {
    const result = await FavSchema.deleteMany({ username });
    if (result.deletedCount > 0) {
      return res.json("All Favourites deleted successfully");
    } else {
      return res.status(404).json("No Favourites found for user");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
