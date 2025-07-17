import mongoose, { Schema } from "mongoose";

const miningSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    coinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coin",
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    isActive: { type: Boolean, default: true },
    coinmining: { type: Number, default: 0 },
    miningPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Mining = mongoose.model("Mining", miningSchema);
