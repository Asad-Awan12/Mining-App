import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
     origin: '*',
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import {userRouter} from "./src/routes/user.routes.js"
import {passwordRouter} from "./src/routes/password.routes.js"
import {coinRoute} from "./src/routes/coins.routes.js"
import {miningRoute} from "./src/routes/mining.routes.js"
import {subRoute} from "./src/routes/sub.routes.js"
import {rewardRoute} from "./src/routes/reward.routes.js"




app.use("/api/v1/users", userRouter)
app.use("/api/v1/password", passwordRouter)
app.use("/api/v1/coin", coinRoute)
app.use("/api/v1/mining", miningRoute)
app.use("/api/v1/sub", subRoute)
app.use("/api/v1/reward", rewardRoute)


app.get("/",(req, res)=>{

    res.json({message:"Server is running ssssssssssssss"})
})

export { app }
