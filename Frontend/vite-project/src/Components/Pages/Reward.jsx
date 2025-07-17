import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReward } from "../../Redux/actions/UserActions";
import { stateLogin } from "../../Redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets/Images/image";
import { toast } from "react-toastify";

const Reward = () => {
  const { success, error } = useSelector((state) => state.user);
  const loginId = useSelector(stateLogin);
  const userId = loginId?.loginUser?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleReward = () => {
    // try {
      dispatch(getReward({ userId }));
      // toast.success("Data fetched successfully");
      
      // if (success) {
      //   toast.success("SuccessFully Get Reward");
        // navigate("/");
      // } else {
      //   toast.error(error);
      //   // return
      // }
   
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "RESET_REWARD_STATE" });
    }
    if (success) {
      // toast.success("Data fetched successfully");
      dispatch({ type: "RESET_REWARD_STATE" });
    }
  }, [error, success, dispatch]);


  
  return (
    <>
      <div className="grid grid-cols-12 pt-10 pb-10 bg-[#141b43]">
        <div className="col-span-12 flex justify-center ">
          <div className="bg-blue-600  rounded-md h-140 max-md:h-auto text-center px-5 pt-10">
            <h1 className="text-3xl text-white">Get Reawrd</h1>
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
              onClick={handleReward}
              className="bg-white cursor-pointer text-xl mt-10 mb-10 px-20 max-md:px-10 py-3 rounded-2xl hover:bg-blue-700 hover:border-2 hover:text-white hover:border-white"
            >
              Get Reawrd
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reward;
