import express from "express";
import { adminLogin, login, register } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/admin", adminLogin);


export default userRouter;