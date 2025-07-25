import { useEffect } from "react"
import { getFavorites } from "../../../services/wishlistService"

const Favoites = () => {

  useEffect(() => {
    const getFavList = async () => {
      try {
        const resposne = await getFavorites()
        console.log(resposne)
      } catch (error) {
        
      }
    }
    getFavList()
  },[])

  return (
    <div>Favoites</div>
  )
}

export default Favoites