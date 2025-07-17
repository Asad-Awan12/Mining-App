import { Sub } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

const createSub = async (req, res) => {
  const { adminId } = req.body;
  try {
    const admin = await User.findOne({ _id: adminId, isAdmin: true });
    if (!admin) {
      return res
        .status(501)
        .json({ message: "Only Admin can create Subscriptions Model" });
    }

    let subscription = await Sub.findOne({ userId: adminId, subType: "Free" });
    if (!subscription) {
      await Sub.create({
        userId: adminId,
        subType: "Free",
      });
    }

    const premiumSub = await Sub.findOne({
      userId: adminId,
      subType: "Premium",
    });
    if (!premiumSub) {
      await Sub.create({ userId: adminId, subType: "Premium" });
    }

    return res
      .status(201)
      .json({ message: "Successfully create Subscriber!!", subscription });
  } catch (error) {
    console.log("error ", error);
    return res.status(501).json({ message: "Error in create Subscriber!!" });
  }
};

const purchaseSubscription = async (req, res) => {
  const { userId, subId } = req.body;
  try {
    const premiumSubcription = await Sub.findOne({ _id: subId });
    const freeSubcription = await Sub.findOne({ subType: "Free" });
    const expTime = 300* 30 * 1000;
    console.log("premiumSubcription ", premiumSubcription);
    const findUser = await User.findOne({ _id: userId });
    console.log("findUser ", findUser);
    findUser.subId = {
      id: premiumSubcription._id,
      duration: Date.now() + expTime,
    };

    await findUser.save();

    return res.status(201).json({
      message: "Purchased Premium Subscription Successfully!!",
      findUser,
    });
  } catch (error) {
    console.log("error ", error);
    return res.status(501).json({ message: "Error in Purchasing!!" });
  }
};

const checkSubscription = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });
    const freeSubscription = await Sub.findOne({ subType: "Free" });

    const currentTime = Date.now();
    const expTime = user.subId?.duration;

    console.log("currentTime", currentTime, typeof currentTime);
    console.log("expTime", expTime, typeof expTime);

    let expired = false;

    if (expTime && Number(expTime) < currentTime) {
      user.subId = {
        id: freeSubscription._id,
        duration: null,
      };
      await user.save();
      expired = true;
    }

    if (expired) {
      return res.status(403).json({
        message: "Subscription expired. Please renew.",
        user,
      });
    } else {
      return res.status(200).json({
        message: "Subscription is active.",
        user,
      });
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




const getSubscription = async (req, res) => {
  try {
    const subscriptions = await Sub.find();
    return res
      .status(201)
      .json({ message: "Fetch All Subscription Successfully", subscriptions });
  } catch (error) {
    console.log("error ", error);
    return res
      .status(401)
      .json({ message: " Error in Fetch All Subscription " });
  }
};

export { createSub, purchaseSubscription, checkSubscription, getSubscription };


















































// const checkSubscription = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findOne({ _id: userId });
//     console.log("user ", user);

//     const freeSubscription = await Sub.findOne({ subType: "Free" });
//     console.log("freeSubscription ", freeSubscription);

//     const currentTime = Date.now();
//     const expTime = user.subId.duration; // this should already be a timestamp in ms

//     console.log("currentTime", currentTime, typeof currentTime); // number
//     console.log("expTime", expTime, typeof expTime); // number

//     if (expTime && Number(expTime) < currentTime) {
//       user.subId = {
//         id: freeSubscription?._id,
//         duration: null,
//       };
//       console.log("Subscription expired. Updating user...");
//       await user.save();
//     }
//     return res
//       .status(201)
//       .json({ message: "Subscription expired. Please renew.", user });
//   } catch (error) {
//     console.log("error ", error);
//     return res.status(501).json({ message: "Error in get Subscribe User" });
//   }
// };