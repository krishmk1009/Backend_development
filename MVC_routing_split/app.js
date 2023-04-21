import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

config({
    path: "./data/config.env"
})
export const app = express();
app.use("/users", userRouter)

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})


