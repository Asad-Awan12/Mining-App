import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { checkEmail } from "../../../Redux/actions/UserActions";
import { images } from "../../../assets/Images/image";
import NoFound from "../../Pages/NoFound";
import { stateLogin } from "../../../Redux/selector";

// yup Validation
//  Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Please Enter a Valid Email")
    .required("email required"),
});

const CheckEmail = () => {
  const { error, success, email, userLoader } = useSelector(
    (state) => state.user
  );
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setPageLoading(false), 1000); // simulate entry delay
  }, []);
  console.log("state ", email);
  const state = useSelector(stateLogin);
  console.log("state ", state?.isLoggin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(checkEmail(values));
      if (success) {
        navigate("/CheckOtp");
        toast.success("CheckEmail Successfully");
        resetForm();
      } else {
        toast.error(error);
      }
    },
  });

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
      <div className="bg-[#141943] grid grid-cols-12 min-h-screen">
        <div className="col-span-12 pt-20 pb-10">
          <form
            action=""
            onSubmit={handleSubmit}
            className="mx-100 max-xl:mx-10 max-lg:mx-10 max-md:mx-3 space-y-5"
          >
            <h1 className="text-3xl text-center max-md:text-start font-semibold text-white pb-2">
              Forgot Password
            </h1>
            <p className="text-xl text-white text-center max-md:text-start">
              Please enter your email to reset the password
            </p>
            <div
              className={`flex ${
                errors.email && touched.email ? "error-input" : ""
              }  items-center max-md:w-full bg-gradient-to-r from-[#1E1F34] to-[#262A4F] text-gray-300 rounded-md px-4 py-2  border border-gray-500/40 shadow-md backdrop-blur-md`}
            >
              <img src={images.emailicon} className="mr-3" />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`bg-transparent  outline-none py-2 text-md placeholder-gray-400 w-full`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-600 text-xl max-md:text-center">
                {errors.email}
              </p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white text-xl w-full cursor-pointer  px-8 py-3 rounded-md"
            >
              Reset Password
            </button>
            <Link to='/' className="text-white underline text-xl flex justify-end">Back To Home</Link>
          </form>
        </div>
      </div>
        )
      }

    </>
  );
};

export default CheckEmail;
