import { Outlet } from "react-router-dom"
import AuthHeader from "../components/AuthHeader"

const UserLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  )
}

export default UserLayout
