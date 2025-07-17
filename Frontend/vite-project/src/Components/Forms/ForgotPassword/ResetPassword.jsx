import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { reset_Password } from "../../../Redux/actions/UserActions";
import { images } from "../../../assets/Images/image";
import { stateLogin } from "../../../Redux/selector";
import NoFound from "../../Pages/NoFound";

// yup Validation
//  Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required("password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("confirmPassword required"),
});



const ResetPassword = () => {
  const { error, success, email, userLoader } = useSelector(
    (state) => state.user
  );
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setPageLoading(false), 1000); // simulate entry delay
  }, []);
  console.log("error of redux ", email);
  const state = useSelector(stateLogin);
  console.log("state ", state?.isLoggin);

  const handledRef = useRef(false);
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
      password: "",
      email: email,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(reset_Password(values));
      if (success) {
        navigate("/login");
        toast.success("SignUp Successfully");
        resetForm();
      } else {
        toast.error(error);
      }
    },
  });
  useEffect(() => {
    if (handledRef.current) return;
  }, []);

   if (pageLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {userLoader && (
        <div className="bg-[#141943] grid grid-cols-12 min-h-screen">
          <div className="col-span-12 pt-20 pb-10">
            <form
              action=""
              onSubmit={handleSubmit}
              className="mx-100 max-xl:mx-10 max-lg:mx-10 max-md:mx-3 space-y-5"
            >
              <h1 className="text-3xl text-center max-md:text-start font-semibold text-white pb-2">
                Set a password
              </h1>
              <p className="text-xl text-white text-center max-md:text-start">
                Create a new password. Ensure it differs from previous ones for
                security
              </p>

              <div
                className={`flex ${
                  errors.password && touched.password ? "error-input" : ""
                }  items-center max-md:w-full bg-gradient-to-r from-[#1E1F34] to-[#262A4F] text-gray-300 rounded-md px-4 py-2  border border-gray-500/40 shadow-md backdrop-blur-md`}
              >
                <img src={images.passwordkey} className="mr-3" />
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-transparent outline-none py-2 text-md placeholder-gray-400 w-full"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-600 text-xl max-md:text-center">
                  {errors.password}
                </p>
              )}

              <div
                className={`flex ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "error-input"
                    : ""
                }  items-center max-md:w-full bg-gradient-to-r from-[#1E1F34] to-[#262A4F] text-gray-300 rounded-md px-4 py-2  border border-gray-500/40 shadow-md backdrop-blur-md`}
              >
                <img src={images.passwordkey} className="mr-3" />
                <input
                  type="text"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  placeholder="confirmPassword"
                  onChange={handleChange}
                  className="bg-transparent outline-none py-2 text-md placeholder-gray-400 w-full"
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-600 text-xl max-md:text-center">
                  {errors.confirmPassword}
                </p>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white font-bold  text-xl w-full cursor-pointer  px-8 py-3 rounded-md"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
