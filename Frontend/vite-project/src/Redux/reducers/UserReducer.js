import { success } from "../builder";
import axios from "axios";


const initialState = {
  user: null,
  loginUser: null,
  // fullUser: null,
  userLoader: true,
  error: null,
  success: false,
  email: null,
  isOTPSent: false,
  isVerified: false,
  isLoggin: false,
  isMining: false,
  startMining: null,
  stopMining: null,
  coin: null,
  reward: null,
  all_Coins: null,
  subsciption: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST":
    case "LOGIN_REQUEST":
    case "CHECK_EMAIL_REQUEST":
    case "VERIFY_OTP_REQUEST":
    case "RESET_PASSWORD_REQUEST":
    case "LOGOUT_REQUEST":
    case "START_MINING_REQUEST":
    case "STOP_MINING_REQUEST":
    case "GET_COIN_REQUEST":
    case "GET_REWARD_REQUEST":
    case "GET_FREE_COINS_REQUEST":
    case "GET_ALL_COINS_REQUEST":
    case "SUBSCRIPTION_REQUEST":
      return {
        ...state,
        userLoader: true,
        error: null,
        isLoggin:false,
        success: false,
        isMining: false,
      };
        case "CLEAR_USER_ERROR":
      return { ...state, error: null };

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        userLoader: false,
        user: action.payload,
        success: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        success:true,
        isLoggin: false,
        user: null,
        error:null,
        loginUser: null,
        subsciption:null
        // startMining: null,
        // stopMining: null,
        // coin: null,
        // reward: null,
        // all_Coins: null,
        // subsciption: null,
        // email: null,
      };
    case "FETCH_FULL_USER":
      return {
        ...state,
        fullUser: action.payload,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        userLoader: false,
        loginUser: action.payload,
        success: true,
        isLoggin: true,
      };

    case "CHECK_EMAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        email: action.payload,
        isOTPSent: true,
        success: true,
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        success: true,
      };

    case "VERIFY_OTP_SUCCESS":
      return {
        ...state,
        loading: false,
        isVerified: true,
      };
    case "START_MINING_SUCCESS":
      return {
        ...state,
        isMining: true,
        startMining: action.payload,
      };
    case "STOP_MINING_SUCCESS":
      return {
        ...state,
        isMining: false,
        stopMining: action.payload,
      };
       case "RESET_MINING_STATE":
      return {
        ...state,
        success:false,
        error:false
      };
    case "GET_COIN_SUCCESS":
      return {
        ...state,
        success: true,
        coin: action.payload,
      };
    case "GET_REWARD_SUCCESS":
      return {
        ...state,
        success: true,
        reward: action.payload,
      };
      
    case "RESET_REWARD_STATE":
      return {
        ...state,
        success:false,
        error:false
      };

    case "GET_ALL_COINS_SUCCESS":
      return {
        ...state,
        success: true,
        all_Coins: action.payload,
      };
    case "SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        success: true,
        subsciption: action.payload,
      };

    case "SIGNUP_FAILURE":
    case "LOGIN_FAILURE":
    case "CHECK_EMAIL_FAILURE":
    case "VERIFY_OTP_FAILURE":
    case "RSET_PASSWORD_FAILURE":
    case "START_MINING_FAILURE":
    case "GET_REWARD_FAILURE":
    case "GET_ALL_COINS_FAILURE":
    case "SUBSCRIPTION_FAILURE":
      return {
        ...state,
        userLoader: true,
        error: action.error,
        success: false,
        isMining: false,
        isLoggin:false,
      };

    default:
      return state;
  }
};
