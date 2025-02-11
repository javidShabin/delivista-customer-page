import { Outlet, useLocation } from "react-router-dom";
import UnAuthHeader from "../components/UnAuthHeader";
import { useEffect, useState } from "react";
import { checkUserAuth } from "../utils/api";
import { PropagateLoader } from "react-spinners";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/user/userSlice";
import AuthHeader from "../components/authUser/AuthHeader";
import Footer from "../components/Footer";

const UserLayout = () => {
  const [profileUrl, setProfileUrl] = useState("")
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isUserExist } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await checkUserAuth();
        localStorage.setItem("userProfile", JSON.stringify(response))
        console.log(response)
        setProfileUrl(response.profile)
        dispatch(saveUser(response));
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PropagateLoader color="#f97316" size={15} />
      </div>
    );
  }

  return (
    <>
      {isUserExist ? <AuthHeader profileUrl={profileUrl} /> : <UnAuthHeader />}
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
