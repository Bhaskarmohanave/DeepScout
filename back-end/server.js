const express = require("express");
const cors = require("cors");
const users = require("./fakeDB");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://automatic-eureka-j69j57jwqjwfp6xj-5173.app.github.dev",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  try {
    console.log(req.body);
    const { userName, password } = req.body;

    const user = users.find(
      (u) => u.userName === userName && u.password === password
    );

    if(!req.body){
        res.status(400).json({success:false, message: "Credentials are required"})
    }
    if(!userName||!password||!userName.trim()||!password.trim()){
        res.status(400).json({success: false, message: "Credentials are required"})
    }
    if (user) {
      res.status(200).json({ success: true, user: user.userName });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Credentials are not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(err);
  }
});

app.listen(3000, () => console.log("Server Running"));
