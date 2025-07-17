import React, { useEffect, useState } from "react";
import { images } from "../../assets/Images/image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coins, stateLogin } from "../../Redux/selector";
import { userSubscription } from "../../Redux/actions/UserActions";
import { getSubscriptions } from "../../ApiRoute/Api";
import axios from "axios";
import { toast } from "react-toastify";

const Subscription = () => {
  const { success, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coin = useSelector(coins);
  console.log("coin ", coin.getcoins[0]?._id);
  const [subId, setSubId] = useState();
  const loginId = useSelector(stateLogin);
  const userId = loginId?.loginUser?._id;

  useEffect(() => {
    //   if (!userId) return;
    const fetchAllSubcriptios = async () => {
      try {
        const res = await axios.get(`${getSubscriptions}`);
        setSubId(res.data.subscriptions?.[1]?._id); // ✅ use res.data
      } catch (err) {
        console.error("Error fetch All Subcriptios:", err);
      }
    };

    fetchAllSubcriptios();
  }, []);
  console.log("subId ", subId);

  const handleSubscription = async () => {
    try {
      await dispatch(userSubscription({ subId, userId }));

      if (success) {
        toast.success("Successfully Subscribed to Premium");
        navigate("/");
      } else {
        toast.error(error);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    // if (success) {
    //   navigate("/");
    //   toast.success("SuccessFully Subscribed Premium Subscription");
    // }else{
    //   toast.error(error);
    // }
  };
  return (
    <>
      <div className="grid grid-cols-12 pt-10 pb-10 bg-[#141b43]">
        <div className="col-span-12 flex justify-center ">
          <div className="bg-blue-600  rounded-md h-140 max-md:h-auto text-center px-5 pt-10">
            <h1 className="text-3xl text-white">Go Premium</h1>
            <p className="text-sm text-white pt-4">
              Unlock all the power of this mobile tool and enjoy digital
              experience like never before!
            </p>
            <img src={images?.subicon} className="mx-auto pt-10" />
            <div className="border-1 border-white rounded-xl mx-10 max-md:mx-2 mt-10 text-start px-3 py-2">
              <p className="text-xl text-white">Premium Subscription</p>
              <p className="text-sm text-white">
                Buy Premium Subscription to unclock Premium coin
              </p>
            </div>
            <button
              onClick={handleSubscription}
              className="bg-white cursor-pointer text-xl mt-10 mb-10 px-20 max-md:px-10 py-3 rounded-2xl hover:bg-blue-700 hover:border-2 hover:text-white hover:border-white"
            >
              Subscribe Premium
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
