import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

//  coin type, coin usd price, coinmining, coin name,
const coinSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    coinType:{
        type:String,
       enum: ["Premium","Free"],
       default:"Free"
    },
    miningPrice:{
        type:Number,
        default: 0
    },
    coinmining:{
        type:Number,
        default:0
    }
},{timestamps:true})


export const Coin = mongoose.model('Coin',coinSchema);