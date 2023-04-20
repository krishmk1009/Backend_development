const express = require('express')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const app = express()
app.use(cookieParser())
const port = 3000
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))


mongoose.connect("mongodb://localhost:27017/ejs").then(() => {
    console.log("connnected succesfully")
})
    .catch((e) => {
        console.log(e)
    });


const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    }
})

const User = mongoose.model("User", userSchema);

const isAuthentcated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {

        const decoded = jwt.verify(token, "sskskmkmkk")
        // console.log(decoded)

        req.user = await User.findById(decoded._id)
        next();
    }
    else {
        res.render("login")
    }
}
app.get('/', isAuthentcated, (req, res) => {
    console.log(req.user)
    res.render("logout", { name: req.user.name })

})


//for testing purpose

app.post('/', async (req, res) => {


    const { name, email } = req.body;
    await Message.create({ name, email })
    // console.log(name, email)
    res.redirect("/success")
})





app.post("/login", async (req, res) => {
    const { name, email } = req.body;
    const user = await User.create({ name, email });

    const token = jwt.sign({ _id: user._id }, "sskskmkmkk")

    // console.log(token)
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    })

    res.redirect("/")
})

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.redirect("/")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})