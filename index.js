const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SL = require("./routes/SignupLoginroutes");
const FL = require("./routes/Favourites");

const app = express();

// ✅ CORS must be configured before routes
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://melofy-frontend.onrender.com",
      "https://melofy-otpb.onrender.com" // Added new frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Optional but good for preflight handling
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(
  "mongodb+srv://divatepritish:BDbOzQbezPDEvqcn@cluster0.pgjmyf1.mongodb.net/melofy?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ Database Connected"))
.catch((err) => console.error("❌ Database Connection Error:", err));

// ✅ Routes
app.use("/Signup-Login", SL);
app.use("/Fav", FL);

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
