import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../../Redux/actions/UserActions.js";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { images } from "../../assets/Images/image.js";
import { Link, useNavigate } from "react-router-dom";

// yup Validation
//  Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^[0-9]{10,15}$/;

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required("Please Enter UserName")
    .required("username required"),
  email: yup
    .string()
    .matches(emailRegex, "Please Enter a Valid Email")
    .required("email required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Please Enter a Valid PhoneNumber")
    .required("phoneNumber required"),
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

const Register = () => {
  const { error, success, userLoader } = useSelector((state) => state.user);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 300); // simulate entry delay
  }, []);

  // console.log("error of redux ", error);

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
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(Signup(values));
        navigate("/login");

      if (success) {
        toast.success("SignUp Successfully");
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
      {userLoader && (
        <div className="bg-[#141943] grid grid-cols-12 min-h-screen">
          <div className="col-span-12 pt-20 pb-10">
            <form
              action=""
              onSubmit={handleSubmit}
              className="mx-100 max-xl:mx-10 max-lg:mx-10 max-md:mx-3 space-y-5"
            >
              <h1 className="text-3xl text-center font-semibold text-white pb-10">
                Create Your Account
              </h1>

              <div
                className={`flex ${
                  errors.username && touched.username ? "error-input" : ""
                }  items-center max-md:w-full bg-gradient-to-r from-[#1E1F34] to-[#262A4F] text-gray-300 rounded-md px-4 py-2  border border-gray-500/40 shadow-md backdrop-blur-md`}
              >
                <img src={images.user} className="mr-3" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username"
                  className={`bg-transparent outline-none    py-2 text-md placeholder-gray-400 w-full`}
                />
              </div>
              {errors.username && touched.username && (
                <p className="text-red-600 text-xl max-md:text-center">
                  {errors.username}
                </p>
              )}
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

              <div
                className={`flex ${
                  errors.phoneNumber && touched.phoneNumber ? "error-input" : ""
                }  items-center max-md:w-full bg-gradient-to-r from-[#1E1F34] to-[#262A4F] text-gray-300 rounded-md px-4 py-2  border border-gray-500/40 shadow-md backdrop-blur-md`}
              >
                {/* <img src={email} className="mr-3" /> */}
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="phoneNumber"
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  className="bg-transparent outline-none py-2 text-md placeholder-gray-400 w-full"
                />
              </div>
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-red-600 text-xl max-md:text-center">
                  {errors.phoneNumber}
                </p>
              )}

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
                className="bg-blue-500 text-xl text-white w-full cursor-pointer  px-8 py-3 rounded-md"
              >
                Submit
              </button>
              <p class="text-xl font-light text-gray-200 max-md:text-center dark:text-gray-400">
                If you have an account?{" "}
                <Link
                  className="font-medium text-primary-600 underline dark:text-primary-500"
                  onClick={() => navigate("/login")}
                >
                  LogIn
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
