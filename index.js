const mongoose = require("mongoose");
const express = require("express");
const SL = require("./routes/SignupLoginroutes");
const FL = require("./routes/Favourites");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://chethannv:chethan@chethan.kjdlxwb.mongodb.net/VibeVerse"
);
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
});
db.on("error", () => {
  console.log("Database not Connected");
});

app.use(express.json());
app.use(cors());
app.use("/Signup-Login", SL);
app.use("/Fav", FL);
const port = 5000;
app.listen(port, () => {
  console.log("Server Started on " + port);
});
