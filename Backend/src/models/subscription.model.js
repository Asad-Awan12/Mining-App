import mongoose, { Schema } from "mongoose";

const subSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    subType:{
       type:String,
       enum: ["Premium","Free"],
       default:"Free"
    },
},{timestamps:true})

export const Sub = mongoose.model("Sub",subSchema)