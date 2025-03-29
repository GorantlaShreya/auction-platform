const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
const SignupModel = require("./Models/Signup");
const AuctionModel = require("./Models/Auction");

app.get("/sayhello", (req, res) => {
  res.send("Hey Shreya!");
});

app.post("/signin", async (req, res) => {
  try {
    const { Rollno, password } = req.body;

    if (!Rollno || !password) {
      return res.status(400).json({ message: "Rollno and Password are required" });
    }
    const user = await SignupModel.findOne({ Rollno });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    if (!req.body.Rollno) {
      return res.status(400).json({ message: "Rollno is required" });
    }

    req.body.dateofbirth = new Date(req.body.dateofbirth);
    const Signup1 = await SignupModel.create(req.body);
    console.log("User Created:", Signup1);
    res.status(201).json(Signup1);
  } catch (err) {
    console.error("Signup Error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Rollno already exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const users = await SignupModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addauctiondata", async (req, res) => {
  try {
    const Auction = await AuctionModel.create(req.body);
    res.status(201).json(Auction);
  } catch (error) {
    console.error("Error adding auction data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getauctiondata", async (req, res) => {
  try {
    const Auction = await AuctionModel.find();
    res.status(200).json(Auction);
  } catch (error) {
    console.error("Error fetching auction data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect("mongodb+srv://Shreya:Chandramma2008@auction.1hurvpv.mongodb.net/auctionDB",)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
