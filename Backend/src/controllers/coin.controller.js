import { Coin } from "../models/coins.model.js";
import { User } from "../models/user.model.js";

const createCoin = async (req, res) => {
  const { userId, coinType, coinmining, miningPrice } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (user?.isAdmin == false) {
      return res.status(501).json({ message: "Only Admin can create coins" });
    }
    const coin_create = await Coin.create({
      userId,
      coinType,
      coinmining,
      miningPrice,
    });
    return res
      .status(201)
      .json({ message: "Coins Created Successfully", coin_create });
  } catch (error) {
    console.log("error ", error);
    return res.status(501).json({ message: "Error in creating Coin!!" });
  }
};

const updateCoin = async (req,res) => {
  const { userId, coinId, coinType } = req.body;
  try {
    const findOwner = await User.findOne({ _id: userId });
    if (!findOwner) {
      return res.status(404).json({ message: "Coin Owner does not found!!" });
    }
    const findCoin = await Coin.findOne({ _id: coinId });
    if (!findCoin) {
      return res.status(404).json({ message: "Coin does not found!!" });
    }
    const update = await Coin.findByIdAndUpdate(
      coinId,
      {
        coinType,
      },
      {
        new: true,
      }
    );
    return res
      .status(201)
      .json({ message: "Coin Update Successfully", update });
  } catch (error) {
    console.log("error ", error);
    return res.status(501).json({ message: "Error in updating Coin!!" });
  }
};

const getCoins = async(req,res)=>{
  try {
    const getcoins = await Coin.find()
    return res.status(201).json({message:"Successfully Getting Coins ",getcoins})
  } catch (error) {
    console.log("error ",error);
    return res.status(404).json({message:"Error in getting coins"})
    
  }
}

export { createCoin, updateCoin,getCoins };
