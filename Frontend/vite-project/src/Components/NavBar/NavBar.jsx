import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../assets/Images/image";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/actions/UserActions";
import { stateLogin } from "../../Redux/selector";
import { toast } from "react-toastify";

export const NavBar = () => {
  const [show, setHide] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(stateLogin);
  console.log("state ", state?.isLoggin);
  const { succes, error } = useSelector((state) => state.user);
  const nav = [
    { name: "PersonalInfo", link: "/", icon: { images } },
    { name: "User Prefrences", link: "blog" },
    { name: "Change Password", link: "CheckEmail" },
    { name: "Contact", link: "contact" },
  ];
  const handleBar = () => {
    setHide((pre) => !pre);
  };
  const location = useLocation();
  const hiddenPaths = [
    "/login",
    "*",
    "/admin",
    "/register",
    "/CheckEmail",
    "/CheckOtp",
    "/resetpassword",
  ];

  const shouldHideNavbar = hiddenPaths.includes(location.pathname);

  if (shouldHideNavbar && state?.isLoggin == false) return null;

  // Logout
  const handleLogOut = () => {
    dispatch(logOut());

    if (error) {
      toast.error(error);
    } else {
      toast.success("LogOut SuccessFully");
      navigate("/login");
      // return
    }
  };

  const handleSubscription = () => {
    navigate("/subscription");
  };
  return (
    <>
      <div
        className={`flex bg-black justify-between  px-10 pb-5 xlg:mx-5 max-lg:px-5 max-lg:pb-2 pt-4 max-lg:justify-between text-white items-center`}
      >
        <div className="">
          <Link to="/" className="">
            <img
              src={images.mainlogo}
              alt=""
              className="w-50 max-lg:w-30 xlg:w-50"
            />
          </Link>
        </div>
        <div className="">
          {!show ? (
            <img
              src={images.openicon}
              // height={50}
              onClick={handleBar}
              className="lg:hidden max-lg:w-8"
            />
          ) : (
            <img
              src={images.closeicon}
              width={30}
              // height={50}
              onClick={handleBar}
              className="lg:hidden max-lg:w-8"
            />
          )}
        </div>
        <div className="max-lg:hidden">
          {/* Desktop */}
          <ul className="flex justify-start pr-5 gap-8">
            {nav?.map((item, index) => (
              <li key={item?.name} className="hoverlist flex relative group">
                <Link to={`/${item?.link}`} className="text-lg font-medium">
                  {item?.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="text-xl px-3 py-3 hover:border-2 hover:border-blue-500 hover:bg-blue-700 hover:text-white hover:px-3 hover:py-3 rounded-2xl "
                to="/subscription"
              >
                Subscription
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-end max-lg:hidden">
          <button
            type="button"
            className="bg-blue-800  cursor-pointer px-10 py-3 rounded-2xl text-2xl"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>

      {/* mobile navBar */}

      <div className="lg:hidden bg-white z-10 absolute w-full">
        {show && (
          <>
            <div className="">
              <ul className="">
                {nav?.map((item, index) => (
                  <li
                    key={index}
                    className="text-[16px] font-normal font-[sans-serif,Poppins] text-black px-10 py-3 flex justify-between"
                  >
                    <Link to={`${item.link}`} className="text-lg">
                      {item?.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    className="text-xl mx-10  border-2 border-blue-700 px-5 py-2  rounded-2xl "
                    onClick={handleSubscription}
                  >
                    Subscription
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="bg-blue-800  cursor-pointer mx-10 my-4 text-white px-10 py-3 rounded-2xl hover:bg-blue-700 hover:text-white text-2xl"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};
