import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthUser = () => {
  const { isUserExist } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check the user is loggined or not
    // If not loggined redirect to login page
    if (!isUserExist) {
      navigate("/login-page");
    }
  }, [isUserExist, navigate]);

  return isUserExist ? <Outlet /> : null;
};

export default AuthUser;
