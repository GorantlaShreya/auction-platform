const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "my_super_secret_123!";

// Connect to MongoDB
mongoose.connect("mongodb+srv://Shreya:Chandramma2008@auction.1hurvpv.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Auction Item Schema
const auctionItemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  originalPrice: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  highestBidder: String,
  closingTime: Date,
  isClosed: { type: Boolean, default: false },
});
const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Post New Auction
app.post("/post-auction", authenticate, async (req, res) => {
  try {
    const { itemName, description, originalPrice, closingTime } = req.body;

    if (!itemName || !description || !originalPrice || !closingTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAuction = new AuctionItem({
      itemName,
      description,
      originalPrice,
      currentBid: 0,
      highestBidder: "",
      closingTime: new Date(closingTime),
    });

    await newAuction.save();
    res.status(201).json({ message: "Auction posted successfully", newAuction });
  } catch (error) {
    console.error("Post Auction Error:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

// Fetch All Auctions
app.get("/auctions", async (req, res) => {
  try {
    const auctions = await AuctionItem.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch auctions" });
  }
});

// Place a Bid
app.post("/bid/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { bid } = req.body;
    const item = await AuctionItem.findById(id);

    if (!item) return res.status(404).json({ message: "Auction item not found" });
    if (item.isClosed) return res.status(400).json({ message: "Auction is closed" });

    if (new Date() > new Date(item.closingTime)) {
      item.isClosed = true;
      await item.save();
      return res.json({ message: "Auction closed", winner: item.highestBidder });
    }

    if (typeof bid !== "number" || bid <= item.currentBid) {
      return res.status(400).json({ message: "Bid must be higher than current bid" });
    }

    item.currentBid = bid;
    item.highestBidder = req.user.username;
    await item.save();

    res.json({ message: "Bid successful", currentBid: item.currentBid });
  } catch (error) {
    console.error("Bid Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start Server
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});