import express, { Router } from "express"
import { claimDailyReward } from "../controllers/reward.controller.js";

const rewardRoute = Router();

rewardRoute.route('/').post(claimDailyReward)

export{
    rewardRoute
}