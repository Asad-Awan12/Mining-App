import express, { Router } from "express"
import { getSingleUserMining, startMining, stopMining } from "../controllers/mining.controller.js";

const miningRoute = Router();

miningRoute.route('/start').post(startMining)
miningRoute.route('/stop').post(stopMining)
miningRoute.route('/:userId').post(getSingleUserMining)


export {
    miningRoute
}