import {
  createBrowserRouter,
} from "react-router-dom";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "about-page",
        element: <AboutPage />
      },
      {
        path: "restaurant-page",
        element: <RestaurantsPage />
      },
      {
        path: "signup-page",
        element: <SignupForm />
      },
      {
        path: "login-page",
        element: <LoginForm />
      },

      // Loggin-in user
      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "restaurant/:id",
            element: <SingleRestaurant />
          },
          {
            path: "cart",
            element: <CartPage />
          },
          {
            path:"dashboard",
            element: <DashboardLayout />
          }
        ]
      }

    ]
  },
]);