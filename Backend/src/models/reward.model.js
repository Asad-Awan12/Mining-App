// models/reward.model.js
import mongoose, { Schema } from "mongoose";

const rewardSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    coinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coin",
      required: true
    },
    amount: {
      type: Number,
      default: 10
    },
    reason: {
      type: String,
      default: "DailyReward"
    },
    claimedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Prevent duplicate reward in 24h (optional compound index)
rewardSchema.index({ userId: 1, reason: 1, claimedAt: 1 });

export const Reward = mongoose.model("Reward", rewardSchema);
