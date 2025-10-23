const express = require("express")
const cors = require("cors")
const users = require("./fakeDB")
const app  = express()

app.use(express.json())
app.use(cors({
    origin:"*",
    methods: ['GET', 'POST'],
    credentials: true
}))

app.get("/", (req,res) => {
    res.send("Hello World")
})

app.post("/login", (req,res) => {
    console.log(req.body)
})

app.listen(3000, () => console.log("Server Running"))