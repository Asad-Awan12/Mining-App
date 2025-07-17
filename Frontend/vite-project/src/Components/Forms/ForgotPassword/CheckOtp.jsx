import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkEmail, verifyOTP } from "../../../Redux/actions/UserActions";
import { Link, useNavigate } from "react-router-dom";
import NoFound from "../../Pages/NoFound";
import { stateLogin } from "../../../Redux/selector";

const CheckOtp = () => {
  const { error, isVerified, email,userLoader } = useSelector((state) => state.user);
    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => setPageLoading(false), 1000); // simulate entry delay
    }, []);
  const state = useSelector(stateLogin);
  console.log("state ", state?.isLoggin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const [d4, setD4] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(verifyOTP({ otp, email }));
    const otp = d1 + d2 + d3 + d4;
    if (otp.length < 4) {
      toast.error("Enter all 4 digits");
      return;
    }
    if (isVerified) {
      navigate("/resetpassword");
      toast.success("Otp Matched Successfully");
      resetForm();
    }
    else{
      toast.error(error);
    }
  };
  
   if (pageLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
    {
      userLoader && (
<div className="bg-[#141943] max-md:bg-gray-200">
        <div class="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
          <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div class="flex flex-col items-center justify-center text-center space-y-2">
                <div class="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div class="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email ba**@dipainhouse.com</p>
                </div>
              </div>

              <div>
                <form action="" method="post" onSubmit={handleSubmit}>
                  <div class="flex flex-col space-y-16">
                    <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          value={d1}
                          id=""
                          onChange={(e) => setD1(e.target.value)}
                        />
                      </div>
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          value={d2}
                          id=""
                          onChange={(e) => setD2(e.target.value)}
                        />
                      </div>
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          value={d3}
                          onChange={(e) => setD3(e.target.value)}
                        />
                      </div>
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          value={d4}
                          onChange={(e) => setD4(e.target.value)}
                        />
                      </div>
                    </div>

                    <div class="flex flex-col space-y-5">
                      <div>
                        <button class="flex cursor-pointer flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-xl shadow-sm">
                          Verify Account
                        </button>
                      </div>

                      <div class="flex flex-row items-center justify-center text-center text-xl font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p>{" "}
                        <Link
                          class="flex flex-row items-center text-blue-600"
                          // href="http://"
                          // target="_blank"
                          // rel="noopener noreferrer"
                          onClick={() => dispatch(checkEmail({ email }))}
                        >
                          Resend
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
      
    </>
  );
};

export default CheckOtp;
