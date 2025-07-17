import {
  LOGIN_URL,
  REGISTER_URL,
  CHECKEMAIL_URL,
  OTP_URL,
  RESET_PASSWORD_URL,
  START_MINING,
  STOP_MINING,
  GET_COIN,
  rewardUrl,
  getminingCoinsUrl,
  SUBSCRIBE_USER,
} from "../../ApiRoute/Api.js";
import { getApi, postApi } from "../../utils/apiMethods.js";
import { failure, success, request } from "../builder.jsx";

export const Signup = (credentials) => async (dispatch) => {
  dispatch(request({ type: "SIGNUP_REQUEST" }));

  try {
    const response = await postApi({
      url: REGISTER_URL,
      data: credentials, // pass the credentials as body
    });

    const user = response?.createdUser;
    console.log("user", user);

    dispatch(success({ type: "SIGNUP_SUCCESS", payload: user }));

    console.log("Successfully Registered");
    return user;
  } catch (error) {
    console.log("error in signup...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || // fixed typo: massage → message
      "SIGN UP failed!";

    dispatch(failure({ type: "SIGNUP_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(request({ type: "LOGIN_REQUEST" }));

  try {
    const response = await postApi({
      url: LOGIN_URL,
      data: credentials, // pass the credentials as body
    });

    const user = response?.user;
    console.log("user", user);

    dispatch(success({ type: "LOGIN_SUCCESS", payload: user }));

    console.log("Successfully login");
    return user;
  } catch (error) {
    console.log("error in login...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || // fixed typo: massage → message
      "login failed!";

    dispatch(failure({ type: "LOGIN_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  }
};

export const checkEmail = (credentials) => async (dispatch) => {
  dispatch(request({ type: "CHECK_EMAIL_REQUEST" }));

  try {
    const response = await postApi({
      url: CHECKEMAIL_URL,
      data: credentials, // pass the credentials as body
    });
    console.log("checkEmail action payload:", credentials);

    const user = response.user;
    console.log("user", user);

    dispatch(
      success({ type: "CHECK_EMAIL_SUCCESS", payload: credentials?.email })
    );

    console.log("Successfully CHECK EMAIL");
    return user;
  } catch (error) {
    console.log("error in CHECK EMAIL...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || // fixed typo: massage → message
      "EMAIL failed!";

    dispatch(failure({ type: "CHECK_EMAIL_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  }
};

// Verify OTP
export const verifyOTP = (credentials) => async (dispatch) => {
  dispatch(request({ type: "VERIFY_OTP_REQUEST " }));

  try {
    const response = await postApi({
      url: OTP_URL,
      data: credentials, // pass the credentials as body
    });

    const user = response?.user;
    console.log("user", user);

    dispatch(success({ type: "VERIFY_OTP_SUCCESS ", payload: user }));

    console.log("Successfully CHECK OTP");
    return user;
  } catch (error) {
    console.log("error in CHECK OTP...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || // fixed typo: massage → message
      "CHECK OTP failed!";

    dispatch(failure({ type: "VERIFY_OTP_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  }
};

// resetPassword
export const reset_Password = (credentials) => async (dispatch) => {
  dispatch(request({ type: "RESET_PASSWORD_REQUEST " }));

  try {
    const response = await postApi({
      url: RESET_PASSWORD_URL,
      data: credentials, // pass the credentials as body
    });

    const user = response?.user;
    // console.log("user", user);

    dispatch(success({ type: "RESET_PASSWORD_SUCCESS ", payload: user }));

    console.log("Successfully RESET PASSWORD");
    return user;
  } catch (error) {
    console.log("error in RESET_PASSWORD...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "RESET_PASSWORD failed!";

    dispatch(failure({ type: "RSET_PASSWORD_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  }
};

export const logOut = () =>(dispatch)=> {
  dispatch(request({ type: "LOGOUT_REQUEST " }));
  try {
    dispatch(success({ type: "LOGOUT_SUCCESS" }));
    console.log("LogOut Successfylly");
  } catch (error) {
    dispatch(failure({ type: "LOGOUT_FAILURE", error }));
    console.log("error ", error);
  }
};


// Mining 
export const startMining = (credentials)=>async(dispatch)=>{
  dispatch(request({type:"START_MINING_REQUEST"}))
  try {
    const response = await postApi({
      url:START_MINING,
      data:credentials
    });
    const user = response;
    dispatch(success({type:"START_MINING_SUCCESS",payload:user}))
    console.log("Mining Start Successfully");
    
  } catch (error) {
     console.log("error in ... START_MINING", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "START_MINING failed!";

    dispatch(failure({ type: "START_MINING_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  }
}

// Mining 
export const stopMining = (credentials)=>async(dispatch)=>{
  dispatch(request({type:"STOP_MINING_REQUEST"}))
  try {
    const response = await postApi({
      url:STOP_MINING,
      data:credentials
    });
    const user = response;
    dispatch(success({type:"STOP_MINING_SUCCESS",payload:user}))
    console.log("Mining Stop Successfully");
    
  } catch (error) {
     console.log("error in STOP_MINING...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "STOP_MINING failed!";

    dispatch(failure({ type: "STOP_MINING_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  } 
}

// get Coins
export const getCoin = (credentials)=>async(dispatch)=>{
  dispatch(request({type:"GET_COIN_REQUEST"}))
  try {
    const response = await getApi({
      url:GET_COIN,
    });
    const user = response;
    dispatch(success({type:"GET_COIN_SUCCESS",payload:user}))
    console.log("GET_COIN Successfully");
    
  } catch (error) {
     console.log("error in GET_COIN...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "GET_COIN failed!";

    dispatch(failure({ type: "GET_COIN_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  } 
}

// get Reward
export const getReward = (credentials)=>async(dispatch)=>{
  dispatch(request({type:"GET_REWARD_REQUEST"}))
  try {
    const response = await postApi({
      url:rewardUrl,
      data:credentials
    });
    const user = response;
    dispatch(success({type:"GET_REWARD_SUCCESS",payload:user}))
    console.log("GET_REWARD Successfully");
    
  } catch (error) {
     console.log("error in GET_REWARD...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "GET_REWARD failed!";

    dispatch(failure({ type: "GET_REWARD_FAILURE", error: errorMessage }));
    


    console.log(errorMessage);
  } 
}

// Free coin Mining
export const getAllCoins = (credentials)=>async(dispatch)=>{
  dispatch(request({type:"GET_ALL_COINS_REQUEST"}))
  try {
    const response = await postApi({
      url:getminingCoinsUrl,
      data:credentials
    });
    const user = response;
    dispatch(success({type:"GET_ALL_COINS_SUCCESS",payload:user}))
    console.log("GET_ALL_COINS Successfully");
    
  } catch (error) {
     console.log("error in GET_ALL_COINS...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "GET_ALL_COINS failed!";

    dispatch(failure({ type: "GET_ALL_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  } 
}

// Subscribe User
export const userSubscription = (credentials)=>async(dispatch)=>{
  dispatch(request({type:"SUBSCRIPTION_REQUEST"}))
  try {
    const response = await postApi({
      url:SUBSCRIBE_USER,
      data:credentials
    });
    const user = response;
    dispatch(success({type:"SUBSCRIPTION_SUCCESS",payload:user}))
    console.log("SUBSCRIPTION Successfully");
    
  } catch (error) {
     console.log("error in SUBSCRIPTION...", error);
    if (!error.response) {
      console.error("Backend server is not reachable");
    }

    const errorMessage =
      error?.response?.data?.message || 
      "SUBSCRIPTION failed!";

    dispatch(failure({ type: "SUBSCRIPTION_FAILURE", error: errorMessage }));

    console.log(errorMessage);
  } 
}

// clear Error
export const clearUserError = () => {
  return {
    type: "CLEAR_USER_ERROR",
  };
};



