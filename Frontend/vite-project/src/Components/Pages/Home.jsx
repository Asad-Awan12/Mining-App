import React, { useEffect, useState } from "react";
import { images } from "../../assets/Images/image";
import {
  coins,
  loginUser,
  stateLogin,
  stop_Mining,
  subscription,
} from "../../Redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ChevronDown, Check } from "lucide-react";
import {
  clearUserError,
  getCoin,
  startMining,
  stopMining,
} from "../../Redux/actions/UserActions";
import { useRef } from "react";
import {
  expireSubscription,
  getminingCoinsUrl,
  getsingleUser,
} from "../../ApiRoute/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { success, error, userLoader } = useSelector((state) => state.user);

  // for timer
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  // for timer end
  const navigate = useNavigate();
  const [isMining, setIsMining] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const subscriptionUser = useSelector(subscription);
  console.log("subscriptionUser ", subscriptionUser?.findUser);

  const state = useSelector(stateLogin);

  const coin_id = useSelector(coins);
  console.log("coins ", coin_id?.getcoins);

  const stopmining = useSelector(stop_Mining);
  // console.log("stopMining... ",stopmining);

  console.log("state ", state);
  console.log("premiumCoinId ", state?.coin?.getcoins[0]?._id);
  console.log("FreeCoinId ", state?.coin?.getcoins[1]?._id);
  console.log("state ", state?.loginUser?._id);
  const dispatch = useDispatch();
  const loginuser = useSelector(loginUser);

  useEffect(() => {
    dispatch(getCoin());
  }, []);
  // free coinId
  const coinid = state?.coin?.getcoins[1]?._id;
  const [coinID, setCoinID] = useState(coinid);
  let coinId = coinID;
  const [userId, setUserId] = useState();

  const [allCoinsData, setAllCoinsData] = useState([]);
  console.log("allCoinsData ", allCoinsData);
  let login_id = state?.loginUser?._id;
  useEffect(() => {
    const fetchUpdatedUserId = async () => {
      try {
        const res = await axios.post(`${getsingleUser}/${login_id}`);
        setUserId(res?.data?.user._id);
      } catch (err) {
        console.error("Error fetching mining data:", err);
      }
    };
    if (login_id) fetchUpdatedUserId();
  }, [login_id]);
  console.log("UserIdddd ", userId);

  const fetchMiningData = async () => {
    try {
      const res = await axios.post(`${getminingCoinsUrl}/${userId}`);
      const allMining = res.data.userMining || [];
      setAllCoinsData(allMining);
      const active = allMining.find((m) => m.coinId === coinId && m.isActive);
      setIsMining(!!active);
    } catch (err) {
      console.error("Error fetching mining data:", err);
    }
  };
  useEffect(() => {
    if (userId && coinId) {
      fetchMiningData();
    }
  }, [userId, coinId]);

  console.log("allCoinsData ", allCoinsData);

  const handleMining = async () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIsRunning(true);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setSeconds(0); // reset timer
      setIsRunning(false);
    }

    if (!userId || !coinId) {
      toast.error("User or Coin not loaded");
      return;
    }

    setIsMining((prev) => !prev);
    if (!isMining) {
      const res = await dispatch(startMining({ userId, coinId }));
      if (
        res?.startMining?.mining ||
        res?.payload?.startMining?.message === "Mining resumed" ||
        error === null
      ) {
        setIsMining(true);
        await fetchMiningData();
      } else {
        toast.error(error);
      }
    } else {
      await dispatch(stopMining({ userId, coinId }));
      setIsMining(false);
      await fetchMiningData();
    }
    dispatch(clearUserError());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "RESET_MINING_STATE" });
    }
    if (success) {
      dispatch({ type: "RESET_MINING_STATE" });
    }
  }, [error, success, dispatch]);

  // handle error when change component clear error
  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_USER_ERROR" });
    };
  }, []);

  // coin dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("Free");
  const dropdownRef = useRef(null);

  const coinOptions = [
    {
      label: "Free Coin",
      value: "Free",
      icon: images.coinlogo,
      id: coin_id.getcoins[1]?._id,
    },
    {
      label: "Premium Coin",
      value: "Premium",
      icon: "💎",
      id: coin_id.getcoins[0]?._id,
    },
  ];
  console.log("selectedCoin ", selectedCoin);
  console.log("coinID ", coinID);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format seconds into hh:mm:ss
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    // Pad with leading zero if needed (e.g., 09 instead of 9)
    const padded = (num) => String(num).padStart(2, "0");
    if (isMining) {
      return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
    } else {
      return `${padded(0)}:${padded(0)}:${padded(0)}`;
    }
  };

  // Expire Subscription
  useEffect(() => {
    if (!userId) return;
    const expireSub = async () => {
      try {
        const res = await axios.get(`${expireSubscription}/${userId}`);
        // (res.data.userMining); //
        console.log("expireSub... ", res);
      } catch (err) {
        console.error("Error fetching mining data:", err);
      }
    };

    expireSub();
  }, [userId]);

  return (
    <>
      <div className="bg-[#141943] pb-10 pt-10">
        <div className=" px-10  py-4 rounded-b-4xl flex justify-center  max-md:items-center max-md:text-center ">
          <img
            src={images.userpic}
            className="w-15 border-2 border-gray-600 rounded-4xl h-15 max-sm:w-12 max-sm:h-12"
          />
          <div className="pt-1 pl-5 ">
            <h6 className="text-[20px] text-white font-bold max-sm:text-[18px]">
              Hello!
            </h6>
            <p className="text-lg text-white max-sm:text-[16px]">
              {loginuser?.username.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <div
            onClick={() => navigate("/reward")}
            className="border-2 rounded-2xl mx-auto cursor-pointer px-5 border-gray-700"
          >
            <img src={images.reward} className="w-30" />
            <p className="text-xl text-white pb-3">Daily Reward</p>
          </div>
        </div>
        {/* coin Section */}
        <div
          className="relative w-88 max-md:w-80   mt-10 flex items-center space-x-4 mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-[#4F5BD5] to-[#5C67F2] text-white shadow-lg font-medium text-sm"
          ref={dropdownRef}
        >
          {/* Live Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span>Live</span>
          </div>

          {/* Timer */}
          <div className="font-semibold">{formatTime(seconds)}</div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/30"></div>

          {/* Coin Earnings + Dropdown Toggle */}
          <div className="relative flex items-center space-x-1">
            <span className="text-xl">
              {selectedCoin === "Free" ? (
                <img src={images.coinlogo} className="w-10" />
              ) : (
                "💎"
              )}
            </span>
            <span className="font-semibold">
              {selectedCoin === "Free" ? "+878.49" : "+1500.00"}
            </span>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <ChevronDown size={16} className="text-white ml-1" />
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
              <div className="absolute right-0 top-8 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 p-2 space-y-2">
                {coinOptions.map((coin) => (
                  <div
                    key={coin.value}
                    onClick={() => {
                      setSelectedCoin(coin.value);
                      setCoinID(coin.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all duration-200 ${
                      selectedCoin === coin.value
                        ? "bg-indigo-100 border-indigo-500"
                        : "hover:bg-gray-100 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <img src={coin.icon} className="w-10" alt="" />
                      <span className="text-sm font-medium text-gray-800">
                        {coin.label}
                      </span>
                    </div>
                    <div>
                      {selectedCoin === coin.value ? (
                        <Check className="text-indigo-600 w-5 h-5" />
                      ) : (
                        <div className="w-5 h-5 rounded border border-gray-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Pricing section Cards */}
        <div className="grid-cols-12 text-white pt-10  ">
          <div className="col-span-12 flex justify-center">
            <div className="bg-[#364363] px-3 sm:px-10 py-3 rounded-2xl text-center items-center space-x-10">
              <span className="text-xl">Total Current Balance</span>
              <span className="text-lg">
                {(allCoinsData[0]?.miningPrice ?? 0) +
                  (allCoinsData[1]?.miningPrice ?? 0)}
              </span>
            </div>
          </div>
          <div className="col-span-12 flex justify-center mt-5">
            <div className="bg-[#364363] px-10 py-3 rounded-2xl text-center items-center space-x-10">
              <span className="text-xl">Total Earned Coin</span>
              <span className="text-lg">
                {(allCoinsData[0]?.coinmining ?? 0) +
                  (allCoinsData[1]?.coinmining ?? 0)}
              </span>
            </div>
          </div>
        </div>
        {/* Mining Section */}
        <div className="relative flex flex-col pt-40 pb-40 cursor-pointer justify-center items-center text-center">
          <img
            src={images.mining1}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt=""
          />

          <img
            src={images.mining2}
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isMining ? "animate-spin" : ""
            }`}
            alt=""
          />

          <img
            src={images.mining3}
            onClick={handleMining}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt=""
          />
        </div>

        {/* cards */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6 max-lg:col-span-12 max-md:flex max-md:justify-start mx-20 max-md:mx-5">
            <div class="block p-6 bg-[#071849] border border-gray-600 rounded-lg shadow-sm hover:bg-[#131a2d] dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                Free Coin Mining
              </h5>
              <div className="space-x-10 mt-5">
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  TotalCoins
                </span>
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  {allCoinsData[0]?.coinmining ?? 0}
                </span>
              </div>
              {/* price */}
              <div className="space-x-10 mt-5">
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  TotalPrice
                </span>
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  {allCoinsData[0]?.miningPrice ?? 0}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-6 max-lg:col-span-12  max-md:flex max-md:justify-start mx-20 max-md:mx-5">
            <div class="block  p-6 bg-[#071849] border border-gray-600 rounded-lg shadow-sm hover:bg-[#131a2d] dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                Premium Coin Mining
              </h5>
              <div className="space-x-10 mt-5">
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  TotalCoins
                </span>
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  {allCoinsData[1]?.coinmining ?? 0}
                </span>
              </div>
              {/* price */}
              <div className="space-x-10 mt-5">
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  TotalPrice
                </span>
                <span class="font-normal text-3xl text-gray-200 dark:text-gray-400">
                  {allCoinsData[1]?.miningPrice ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* end main div */}
      </div>
    </>
  );
};

export default Home;
