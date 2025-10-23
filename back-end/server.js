const express = require("express")
const cors = require("cors")
const users = require("./fakeDB")
const app  = express()

console.log(users)
app.use(cors({
    origin:"https://automatic-eureka-j69j57jwqjwfp6xj-5173.app.github.dev/"
}))

app.get("/", (req,res) => {
    res.send("Hello World")
})

app.listen(3000, () => console.log("Server Running"))