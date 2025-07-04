import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router-dom";

const AuthUser = () => {
  const { isUserExist } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // Check the user is loggined or not
  // If not loggined redirect to login page
  if (!isUserExist) {
    navigate("/login-page");
  }
  return isUserExist ? <Outlet /> : null;
};

export default AuthUser;
