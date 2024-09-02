import express from "express";
import {createAdmin, loginUser, registerUser} from "../controllers/User.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/createAdmin", createAdmin);

export default UserRouter;
