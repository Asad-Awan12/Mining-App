import express from "express";
import { checkEmail, resetPassword, verifyOtp } from "../controllers/password.controller.js";

const passwordRouter = express.Router();

passwordRouter.route('/checkemail').post(checkEmail)
passwordRouter.route('/checkOtp').post(verifyOtp)
passwordRouter.route('/resetPassword').post(resetPassword)

export {
    passwordRouter
}