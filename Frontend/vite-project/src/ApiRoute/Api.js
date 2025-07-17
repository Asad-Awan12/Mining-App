const baseUrl = `http://localhost:8000/api/v1/users`
const passwordUrl = `http://localhost:8000/api/v1/password`
const miningUrl = `http://localhost:8000/api/v1/mining`
const coinUrl = `http://localhost:8000/api/v1/coin`
const subscribeUrl = `http://localhost:8000/api/v1/sub`


export const expireSubscription = `${subscribeUrl}/checkSub`
export const getSubscriptions = `${subscribeUrl}/getSubscriptions`
export const getsingleUser = `${baseUrl}/getsingleUser`
export const REGISTER_URL = `${baseUrl}/`
export const LOGIN_URL = `${baseUrl}/login`
export const CHECKEMAIL_URL = `${passwordUrl}/checkemail`
export const OTP_URL = `${passwordUrl}/checkOtp`
export const RESET_PASSWORD_URL = `${passwordUrl}/resetPassword`
export const START_MINING = `${miningUrl}/start`
export const STOP_MINING = `${miningUrl}/stop`
export const GET_COIN = `${coinUrl}/getCoins`
export const SUBSCRIBE_USER = `${subscribeUrl}/purchase`
export const rewardUrl = `http://localhost:8000/api/v1/reward` 
export const getminingCoinsUrl = `http://localhost:8000/api/v1/mining`




