import express, { Router } from "express"
import { createCoin, getCoins, updateCoin } from "../controllers/coin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const coinRoute = Router();

coinRoute.route('/').post( isAdmin,createCoin)
coinRoute.route('/getCoins').get(getCoins)
coinRoute.route('/updateCoin').post( isAdmin,updateCoin)

export{
    coinRoute
}
