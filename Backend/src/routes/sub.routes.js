import express, { Router } from "express"
import { checkSubscription, createSub, getSubscription, purchaseSubscription } from "../controllers/sub.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const subRoute = Router();

subRoute.route('/').post(createSub)
subRoute.route('/getSubscriptions').get(getSubscription)
subRoute.route('/purchase').post(purchaseSubscription)
subRoute.route('/checkSub/:userId').get(checkSubscription)

export{
    subRoute
}