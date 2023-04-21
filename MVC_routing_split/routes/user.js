import express from "express";
import User from "../models/user.js";
import { deleteUser, getAllUsers, getUserById, register, test, updateUser } from "../controllers/user.js";

const router = express.Router();

router.use(express.json())

router.get("/", test)

router.post("/new", register)
router.get("/all", getAllUsers)

//testing params
// router.get("/:id", getUserById)
// router.put("/:id", updateUser)
// router.delete("/:id", deleteUser)

//or we can make a chain 


router.
    route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)


export default router