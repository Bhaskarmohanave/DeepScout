const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const users = require("./fakeDB");
const mongoose = require("mongoose");
const User = require("./model/User");

const SECRET_KEY = "mySuperSecretKey";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://automatic-eureka-j69j57jwqjwfp6xj-5173.app.github.dev",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// currently this function is called in /dashboard route which doing nothing so for now this function is doing nothing
function verifyToken(req, res, next) {
  const autHeader = req.headers.authorization;
  const token = autHeader && autHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
}

mongoose
  .connect(
    "mongodb+srv://Bhaskar123:Bhaskar123@usersdb.ck9nhv7.mongodb.net/?appName=UsersDB"
  )
  .then(() => console.log("DataBase Connected"))
  .catch((err) => console.log(err));

// default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    // console.log(req.headers);
    const { userName, password } = req.body;

    const user = await User.findOne({ userName, password });

    if (!req.body) {
      res
        .status(400)
        .json({ success: false, message: "Credentials are required" });
    }
    if (!userName || !password || !userName.trim() || !password.trim()) {
      res
        .status(400)
        .json({ success: false, message: "Credentials are required" });
    }

    // if user found in the DB server needs to send a JWToken to the front-end to ensure to user to be logged in
    if (user) {
      const token = jwt.sign({ userName: user.userName }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ success: true, user: user.userName, token: token });
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

app.get("/dashboard", verifyToken, (req, res) => {
  res.send(`welcome ${req.user.userName}`);
});

app.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if(!userName && password){
      res.status(400).json({success: false, message: "Input Fields are required"})
    }

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({ userName, password });
    res
      .status(200)
      .json({
        success: true,
        message: "User registered successfully",
        user: newUser,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({success: false, message: "Internal server error"});
  }
});

app.listen(3000, () => console.log("Server Running"));
