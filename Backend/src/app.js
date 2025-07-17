import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
     origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Importing routes
import { userRouter } from "./routes/user.routes.js"
import { passwordRouter } from "./routes/password.routes.js"
import { coinRoute } from "./routes/coins.routes.js"
import { miningRoute } from "./routes/mining.routes.js"
import { subRoute } from "./routes/sub.routes.js"
import { rewardRoute } from "./routes/reward.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/password", passwordRouter)
app.use("/api/v1/coin", coinRoute)
app.use("/api/v1/mining", miningRoute)
app.use("/api/v1/sub", subRoute)
app.use("/api/v1/reward", rewardRoute)


export { app }