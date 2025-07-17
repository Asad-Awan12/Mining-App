import { Coin } from "../models/coins.model.js";
import { Mining } from "../models/mining.model.js";
import { Reward } from "../models/reward.model.js";
import { Sub } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

const claimDailyReward = async (req, res) => {
  const { userId } = req.body;
  try {
    const findMining = await Mining.findOne({ userId: userId });
    const freeCoin = await Coin.findOne({ coinType: "Free" });
    const PremiumCoin = await Coin.findOne({ coinType: "Premium" });
    if (!freeCoin)
      return res.status(404).json({ message: "User's free coin not found." });
    if (!PremiumCoin)
      return res
        .status(404)
        .json({ message: "User's Premium coin not found." });

    const lastReward = await Reward.findOne({
      userId,
      reason: "DailyReward",
    }).sort({ claimedAt: -1 });

    const now = new Date();
    if (lastReward && now - lastReward.claimedAt < 24 * 60 * 60 * 1000) { 
       const hoursLeft = Math.ceil(
        24 - (now - lastReward.claimedAt) / (1000 * 60 * 60)
      );  
      return res
        .status(301)
        .json({
          message: `Reward already claimed. Try again in ${hoursLeft} hour(s).`,
        });
    }

    const newReward = await Reward.create({
      userId,
      coinId: freeCoin._id,
      amount: 10,
      reason: "DailyReward",
    });

    const premiumSubcription = await Sub.findOne({ subType: "Premium" });
    const findPremiumUser = await User.findOne({ _id: userId });

    if (
      findPremiumUser?.subId.id.toString() ===
        premiumSubcription?._id.toString()
      // PremiumCoin?.coinType === "Premium"
    ) {
      findMining.coinmining += 20;
      findMining.miningPrice += 4;
    } else {
      findMining.coinmining += 10;
      findMining.miningPrice += 2;
    }

    //  Update user's coinmining

    await findMining.save();

    const findreward = await Reward.findOne({userId})
    if (findreward) {
      return res.status(301).json({message:"User Alredy Get reward"})
    }

    return res
      .status(200)
      .json({ message: "Daily reward claimed!", reward: newReward });
  } catch (error) {
    console.error("Reward Claim Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while claiming reward." });
  }
};

export { claimDailyReward };




