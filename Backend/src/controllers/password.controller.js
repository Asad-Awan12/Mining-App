import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/nodemailer.js";

const genarateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
let otpStore = [];

let limit_otp_Store = [];
const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(400).json({ message: "Email does not found!!" });
    }

    // otp generator
    let currentTime = Date.now();
    let otp = genarateOtp();
    // otp data
    const otp_data = { email, otp, expireAt: currentTime + 30 * 1000 };
    // limit otp obj
    let max_limit = 3;
    const limit_otp = {
      email,
      count: 1,
      expireRequest: currentTime +  60 * 1000,
    };

    // otp store (find email if exist change only otp otherwise push "otp_data" obj)
    let findEmail = otpStore?.find((i) => i?.email == email);
    console.log("findEmail ", findEmail);
    if (findEmail) {
      findEmail.otp = otp;
    } else {
      otpStore.push(otp_data);
    }
    // send otp by node mailer
    sendEmail(email, otp_data?.otp);

    // otp limit (find email if exist change only count otherwise push "limit_otp" obj)
    let findLimitEmail = limit_otp_Store?.find((i) => i?.email == email);

    if (findLimitEmail?.expireRequest < currentTime) {
      limit_otp_Store = (limit_otp_Store ?? []).filter(
        (i) => i.email !== findLimitEmail.email
      );
    }

    // const regenrateOtpTime = findLimitEmail?.expireRequest +(60*60)
    if (findLimitEmail?.email == email) {
      if (findLimitEmail?.count < max_limit) {
        findLimitEmail.count++;
      } else {
        return res
          .status(201)
          .json({ message: "you can regenrate otp after 5 mint" });
      }
    }
    // remove "limit_otp" obj from "limit_otp_Store" after time out
    if (!findLimitEmail) {
      limit_otp_Store.push(limit_otp);
    }

    console.log("limit_otp_Store ", limit_otp_Store);

    return res
      .status(200)
      .json({ message: "Email found!!", otpStore, limit_otp_Store });
  } catch (error) {
    console.log("Error in Check Email ", error);
    return res
      .status(501)
      .json({ message: "Error in Check Email", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }
    let findOtp = otpStore?.find((i) => i?.email == email);
    if (!findOtp) {
      return res.status(200).json({ message: "Credential Error" });
    }
    if (findOtp?.otp != otp) {
      return res.status(200).json({ message: "Please Enter Valid Otp" });
    }
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log("Error in Verify OTP ", error);
    return res
      .status(501)
      .json({ message: "Error in Verify OTP", error: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const updatePassword = await User.findOneAndUpdate(
      { email },
      {
        password: hashPassword,
      },
      {
        new: true,
      }
    );
    return res
      .status(201)
      .json({ message: "Reset Password Successfully", updatePassword });
  } catch (error) {
    console.log("error ", error);
    return res.status(400).json({ message: "Error in Reset Password" });
  }
};
export { checkEmail, verifyOtp, resetPassword };
