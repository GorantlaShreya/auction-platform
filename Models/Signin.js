const SigninLogModel = require("./Models/SigninLog");
app.post("/signin", async (req, res) => {
  try {
    const { Rollno, password } = req.body;
    const user = await SignupModel.findOne({ Rollno });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    await SigninLogModel.create({ Rollno, timestamp: new Date() });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});