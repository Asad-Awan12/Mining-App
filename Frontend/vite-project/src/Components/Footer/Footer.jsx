import React from "react";
import { images } from "../../assets/Images/image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateLogin } from "../../Redux/selector";

export const Footer = () => {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear();
   const state = useSelector(stateLogin);
  console.log("state ", state?.isLoggin);

  const location = useLocation()
    const hiddenPaths = ["/login","/admin","/register", "/CheckEmail", "/CheckOtp","/resetpassword"];

  const shouldHideFooter = hiddenPaths.includes(location.pathname);

  if (shouldHideFooter && state?.isLoggin == false) return null;
  return (
    <>
    <div className="bg-[#2c2f34] ">
      <div className="urbanist grid grid-cols-12 max-md:gap-4 px-20 py-20 max-lg:px-4">
        <div className="col-span-3 max-md:col-span-12 px-4 flex flex-col justify-center max-md:justify-start">
          <img src={images?.footermainlogo} className="w-60" />
          <p className="text-xl text-white mt-5 max-md:text-[16px] ">
            We craft high-performance digital experiences that drive real
            business results.
          </p>
          <div className="flex gap-4 mt-10">
            <div className="w-10 h-10 mt-2 rounded-full flex items-center justify-center bg-black p-2">
              <img src={images.footer1} className="w-6 h-6 object-contain" />
            </div>
            <div className="w-10 h-10 mt-2 rounded-full flex items-center justify-center bg-black p-2">
              <img src={images?.footer2} className="w-6 h-6 object-contain" />
            </div>
            <div className="w-10 h-10 mt-2 rounded-full flex items-center justify-center bg-black p-2">
              <img src={images?.footer3} className="w-6 h-6 object-contain" />
            </div>
            <div className="w-10 h-10 mt-2 rounded-full flex items-center justify-center bg-black p-2">
              <img src={images?.footer4} className="w-6 h-6 object-contain" />
            </div>
          </div>
        </div>
        {/* 2nd */}
        <div className="col-span-3 max-md:col-span-12 flex flex-col  justify-center  px-10 max-md:px-5">
          <span className="text-2xl text-white font-semibold">Quick Links</span>
          <div className="flex mt-0">
            <ul className="space-y-3 mt-4 text-white text-xl">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/subscription">Subscription</Link>
              </li>
              <li>
                <Link to="/">PersonalInfo</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 3rd */}
        <div className="col-span-3 max-md:col-span-12">
          <span className="text-2xl font-medium text-white max-lg:text-xl">Services</span>
          <div className="flex gap-4 mt-2 ">
            <ul className="space-y-3 mt-4 text-white text-xl">
              <li>
                <a>Premium Coins</a>
              </li>
              <li>
                <a>Free Coins</a>
              </li>
              <li>
                <a>Premium Subscription</a>
              </li>
              <li>
                <a>Mining</a>
              </li>
            </ul>
          </div>
        </div>
        {/* 4th */}
        <div className="col-span-3 max-md:col-span-12">
          <span className="text-2xl font-semibold text-white max-lg:text-xl">Get the Latest Inspiration</span>
          <input
            type="text"
            id="first_name"
            className="bg-[#f3f3f3] mt-5 w-full  py-3 border border-gray-400 hover:border-black  text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email *"
            required
          />
          <button onClick={()=>navigate('/subscription')}  className="bg-black max-md:w-full  text-white w-full cursor-pointer  mt-10 py-3 rounded-lg hover:bg-[#292a32]">Subscribe Now</button>
        </div>
      </div>

      <div className="mt-5 mx-10 max-md:mt-3">
        <hr/>
        <p className="flex justify-center text-white text-center py-8">Copyright © {currentYear} Agency All rights reserved</p>
      </div>
      </div>
    </>
  );
};
