import { Coin } from "../models/coins.model.js";
import { Mining } from "../models/mining.model.js";
import { Sub } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";


const startMining = async (req, res) => {
  const { coinId, userId } = req.body;

  try {
    const findCoin = await Coin.findById(coinId);
    if (!findCoin) {
      return res.status(404).json({ message: "Coin not found" });
    }

    if (userId === findCoin.userId.toString()) {
      return res.status(400).json({ message: "Owner cannot mine their own coin" });
    }

    const user = await User.findById(userId);
    const findPremiunSub = await Sub.find({subType:"Premium"})
    console.log("findPremiunSub ",findPremiunSub[0]._id);
    
    console.log("usersss ",user);
    
    // const isPremiumUser = user?.subId?.id;
  
    let mining = await Mining.findOne({ userId, coinId });

    if (mining) {
      mining.isActive = true;
      mining.startTime = new Date();
      await mining.save();
      return res.status(200).json({ message: "Mining resumed", mining });
    }

    // If not found, create new one
     if (user?.subId?.id.toString() !== findPremiunSub[0]._id?.toString() && findCoin.coinType === "Premium") {
      return res.status(400).json({ message: "Upgrade to premium to mine this coin" });
    }else{
    mining = await Mining.create({
      userId,
      coinId,
      coinmining: 0,
      miningPrice: 0,
      isActive: true,
      startTime: new Date(),
    });
  }
    return res.status(201).json({ message: "Mining started", mining });

  } catch (error) {
    console.error("startMining error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const stopMining = async (req, res) => {
  const { userId, coinId } = req.body;
  try {
    const mining = await Mining.findOne({
      userId,
      coinId,
      isActive: true,
    }).populate("coinId");

    if (!mining) {
      return res.status(404).json({ message: "Mining not found" });
    }

    const user = await User.findById(userId);
    const isPremiumUser = user?.subId?.id;
    const findPremiunSub = await Sub.find({subType:"Premium"})
    console.log("findPremiunSub ",findPremiunSub[0]._id);
    const findCoin = await Coin.findById(coinId);


    const endTime = new Date();
    const durationInSec = (endTime - mining.startTime) / 1000;
    const intervals = Math.floor(durationInSec / 5); // 5-second mining interval

    let earnedCoins = intervals;

    if (user?.subId?.id.toString() === findPremiunSub[0]?._id.toString() && findCoin.coinType === "Premium") {
      earnedCoins = intervals * 10; // Premium user + Premium coin boost
    }

    const updatedCoinTotal = (mining.coinmining || 0) + earnedCoins;
    const updatedPrice = Math.floor(updatedCoinTotal / 5); // adjust this formula if needed

    // Update mining record in-place
    mining.coinmining = updatedCoinTotal;
    mining.miningPrice = updatedPrice;
    mining.isActive = false;
    mining.endTime = endTime;
    await mining.save();

    return res.status(200).json({
      message: "Successfully stopped mining",
      minedCoin: earnedCoins,
      totalCoin: updatedCoinTotal,
      totalPrice: updatedPrice,
      duration: `${Math.floor(durationInSec)} sec`,
    });
  } catch (error) {
    console.error("stopMining error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getSingleUserMining = async (req, res) => {
  const { userId } = req.params;
  try {
    const userMining = await Mining.find({ userId });
    return res
      .status(201)
      .json({
        message: "Successfully Fetching Single User Mining",
        userMining,
      });
  } catch (error) {
    console.log("errror ", error);
    return res
      .status(401)
      .json({ message: "Errror in Fetching Single User Mining",error });
  }
};

export { startMining, stopMining, getSingleUserMining };










// const startMining = async (req, res) => {
//   const { coinId, userId } = req.body;
//   try {
//     const existing = await Mining.findOne({
//       userId: userId,
//       coinId: coinId,
//       isActive: true,
//     });
//     if (existing) return res.status(400).json({ msg: "Already mining" });

//     const findCoin = await Coin.findOne({ _id: coinId });
//     console.log("findCoin ", findCoin);

//     if (!findCoin) {
//       return res.status(404).json({ message: "Coin Does not found" });
//     }
//     // check Owner if coin owner start mining send error
//     if (userId == findCoin?.userId?.toString()) {
//       return res
//         .status(404)
//         .json({ message: "Coin Owner is unable to start mining" });
//     }

//     const premiumSubcription = await Sub.findOne({ subType: "Premium" });
//     console.log("premiumSubcription ", premiumSubcription);

//     const findPremiumUser = await User.findOne({ _id: userId });
//     console.log("findPremiumUser ", findPremiumUser);
//     console.log("aaaede ", findPremiumUser?.subId.id.toString());

//     if (
//       findPremiumUser?.subId.id.toString() !==
//         premiumSubcription?._id.toString() &&
//       findCoin?.coinType === "Premium"
//     ) {
//       return res
//         .status(201)
//         .json({ message: "Please Upgrade User Subscription" });
//     }
//     if (existing) {
      
//     }
//     const start = await Mining.create({
//       userId,
//       coinId,
//       coinmining: 0,
//       miningPrice:0,
//       // miningPrice: findCoin?.miningPrice || 0,
//       startTime: new Date(),
//     });
    
//     return res
//       .status(201)
//       .json({ message: "Successfully Start Mining", start });
//   } catch (error) {
//     console.log("error ", error);
//     return res.status(501).json({ message: "Error in start Mining" });
//   }
// };

// const stopMining = async (req, res) => {
//   const { userId, coinId } = req.body;
//   try {
//     //  const find_Mining = await Mining.findById(userId).populate("coinId")
//     const findMining = await Mining.findOne({
//       userId: userId,
//       coinId: coinId,
//       isActive: true,
//     }).populate("coinId");
//     if (!findMining) {
//       return res.status(404).json({ message: "User is not start mining" });
//     }
//     const endTime = new Date();
//     let miningDuration = (endTime - findMining?.startTime) / 1000;
//     console.log("miningDuration ", miningDuration);

//     const interval = Math.floor(miningDuration / 5);
//     console.log("interval ", interval);

//     let earnedCoin;

//     const findCoin = await Coin.findOne({ _id: coinId });
//     if (!findCoin) {
//       return res.status(201).json({ message: "Coin Does not found!!" });
//     }
//     const premiumSubcription = await Sub.findOne({ subType: "Premium" });
//     const findPremiumUser = await User.findOne({
//       subId: premiumSubcription?._id,
//     });

//     if (
//       findPremiumUser?.subId.id.toString() ===
//         premiumSubcription?._id.toString() &&
//       findCoin?.coinType === "Premium"
//     ) {
//       earnedCoin = interval * 10;
//     } else {
//       earnedCoin = interval;
//     }
//     findMining.coinmining += earnedCoin;

//     // previous coins
//     const previousTotal = findMining.coinmining;
//     // total mining coins
//     const newTotal = previousTotal + earnedCoin;

//     // increment in Price
//     let miningPriceIncrements = Math.floor(findMining.coinmining / 5);
//     console.log("miningPriceIncrements ", miningPriceIncrements);

//     findMining.coinmining = newTotal;
//     findMining.miningPrice = miningPriceIncrements;

//     await findMining.save();

//     findMining.endTime = new Date();
//     findMining.isActive = false;

//     await findMining.save();

//     return res.status(201).json({
//       message: "Successfully Stop Mining",
//       minedCoin: earnedCoin,
//       totalCoin: newTotal,
//       TotalminingPrice: findMining.miningPrice,
//       // findMining,
//       // minedCoin: newTotal,
//       duration: `${Math.floor(miningDuration)} sec`,
//     });
//   } catch (error) {
//     console.log("error ", error);
//     return res.status(501).json({ message: "Error in Stop Mining" });
//   }
// };