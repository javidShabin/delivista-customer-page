import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import SignupForm from "../pages/SignupForm";
import LoginForm from "../pages/LoginForm";
import AuthUser from "./protectedRoutes/AuthUser";
import SingleRestaurant from "../pages/SingleRestaurant";
import AboutPage from "../pages/About";
import RestaurantsPage from "../pages/Restaurants";
import CartPage from "../pages/authUser/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/authUser/Dashboard/Profile";
import Order from "../pages/authUser/Dashboard/Order";
import Address from "../pages/authUser/Dashboard/Address";
import ChangePassword from "../pages/authUser/Dashboard/ChangePassword";
import PrivecyPolicy from "../pages/authUser/Dashboard/PrivecyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about-page",
        element: <AboutPage />,
      },
      {
        path: "restaurant-page",
        element: <RestaurantsPage />,
      },
      {
        path: "signup-page",
        element: <SignupForm />,
      },
      {
        path: "login-page",
        element: <LoginForm />,
      },

      // Loggin-in user
      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "restaurant/:id",
            element: <SingleRestaurant />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "dashboard",
            element: <DashboardLayout />,

            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "order",
                element: <Order />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "settings/update-password",
                element: <ChangePassword />
              },
              {
                path: "settings/privacy-policy",
                element: <PrivecyPolicy />
              }
            ],
          },
        ],
      },
    ],
  },
]);
