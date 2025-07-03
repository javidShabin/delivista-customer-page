import { Outlet } from "react-router-dom"
import UnAuthHeader from "../components/UnAuthHeader"

const UserLayout = () => {
  return (
    <>
      <UnAuthHeader />
      <Outlet />
    </>
  )
}

export default UserLayout
