import { Sub } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

//  Validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^[0-9]{10,15}$/;

const postUser = async (req, res) => {
  const { username, email, password, confirmPassword, phoneNumber, isAdmin } =
    req.body;
  try {
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({
        message: `Please fill all the fields`,
      });
    }
     if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
        });
    }
    if (!phoneRegex.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Phone number must be 10 to 15 digits" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }
const findUser = await User.findOne({email})
 if (findUser?.email === email) {
      return res.status(400).json({message:"User with Email Already Exist"})
    }
    const subscription = await Sub.findOne({ subType: "Free" });

    const user = await User.create({
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
      isAdmin,
      subId: { id: subscription?._id, duraion: null },
    });

    const createdUser = await User.findById(user?._id).select(
      "-password -confirmPassword"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
   
    if (createdUser.subId.duration < Date.now()) {
      createdUser.subId.id = subscription?._id;
      createdUser.subId.duration = null;
    }
    await createdUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", createdUser });
  } catch (error) {
    console.log("Error in Post User ", error);
   
    
    return res
      .status(500)
      .json({ message: "Error in Post User", error });
  }
};
// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Credential Error" });
    }
    const login_User = await User.findOne({ email }).select("-password");

    if (!login_User) {
      return res
        .status(404)
        .json({ message: "Something went wrong while registering the user" });
    }
    return res
      .status(200)
      .json({ message: "User logged in successfully", user: login_User });
  } catch (error) {
    console.log("Error in Login User ", error);
    return res.status(501).json({ message: "Error in Login User", error });
  }
};

// getSingle User
const getSingleUser = async(req,res)=>{
  const {userId} = req.params
  try {
    const user = await User.findOne({_id:userId})
    return res.status(201).json({message:"Fetch Single User Successfully",user})
  } catch (error) {
    console.log("error ",error);
    return res.status(401).json({message:"Error in Fetching User"})
  }
}

export { postUser, loginUser,getSingleUser };
