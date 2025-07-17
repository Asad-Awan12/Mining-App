import { createBrowserRouter } from "react-router-dom";
import Register from "../Components/Forms/Signup";
import Login from "../Components/Forms/Login";
import CheckEmail from "../Components/Forms/ForgotPassword/CheckEmail";
import CheckOtp from "../Components/Forms/ForgotPassword/CheckOtp";
import ResetPassword from "../Components/Forms/ForgotPassword/ResetPassword";
import App from "../App";
import Home from "../Components/Pages/Home";
import AdminDashboard from "../Components/Pages/AdminDashboard";
import Subscription from "../Components/Pages/Subscription";
import Reward from "../Components/Pages/Reward";
import NoFound from "../Components/Pages/NoFound";


const router = createBrowserRouter([
  
  {
    path: "/",
    Component: App,
    children:[
        {
    path: "*",
    Component: NoFound,
  },
      {
    path: "/",
    Component: Home,
  },
{
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/checkEmail",
    Component: CheckEmail,
  },
  {
    path: "/CheckOtp",
    Component: CheckOtp,
  },
  {
    path: "/resetpassword",
    Component: ResetPassword,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/subscription",
    Component: Subscription,
  },
  {
    path: "/reward",
    Component: Reward,
  },
    ]
  },
  
]);
export default router;
