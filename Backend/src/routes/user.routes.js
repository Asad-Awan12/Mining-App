import express from "express";
import { getSingleUser, loginUser, postUser } from "../controllers/user.controllers.js";

const userRouter = express.Router();



userRouter.route('/').post(postUser)
userRouter.route('/getsingleUser/:userId').post(getSingleUser)
userRouter.route('/login').post(loginUser)

export {
    userRouter
}
