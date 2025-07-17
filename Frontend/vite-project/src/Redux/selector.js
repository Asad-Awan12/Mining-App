import { useSelector } from "react-redux";

export const stateLogin = (state)=>state?.user
export const loginUser = (state)=>state?.user?.loginUser
export const coins = (state)=>state.user.coin
export const subscription = (state)=>state.user.subsciption

export const stop_Mining = (state)=>state?.user?.stopMining
export const All_Coins_Mining_Data = (state)=>state?.user?.all_Coins?.userMining