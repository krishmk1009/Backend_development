const express = require("express")
const mongoose = require("mongoose")

const app = express();

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/api_routing").then(() => {
    console.log("connnected succesfully")
})
    .catch((e) => {
        console.log(e)
    });

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema)



app.get("/", (req, res) => {
    res.send(" hello how are you")
})
app.post("/user/new", async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    })


    res.json({
        success: true,
        message: "registered succesfully",
    })
})
app.get("/users/all", async (req, res) => {

    const users = await User.find({});


    res.json({
        success: true,
        users,
    })
})

//testing params
app.get("/user/:id", async (req, res) => {


    const id = req.params.id

    const user = await User.findById(id)




    res.json({
        success: true,
        user,
    })

})

app.listen(4000, () => {
    console.log("app is listening")
})
