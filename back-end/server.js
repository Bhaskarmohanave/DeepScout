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
    const { username, password} = req.body;

    const user = users.find((u) => u.username === username && u.password === password)
    
    if (user){
        res.json({success:true, message:"hello", username:user.username})
    }
    
})

app.listen(3000, () => console.log("Server Running"))