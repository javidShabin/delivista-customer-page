import { useEffect, useState } from "react"
import { getFavorites, removeFavitem } from "../../../services/wishlistService"
import { Star, Leaf, Ban, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

const Favorites = () => {
  const [favItems, setFavItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFavList = async () => {
      try {
        const response = await getFavorites()
        setFavItems(response.data.data)
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setLoading(false)
      }
    }
    getFavList()
  }, [setFavItems])

  const handleRemove = async (menuId: any) => {
    try {
      const response = await removeFavitem(menuId)
      toast.success(response.data.message)
  
      // remove the item locally
      setFavItems((prev) => prev.filter((item) => item.menuId !== menuId))
    } catch (error) {
      console.log(error)
      toast.error("Failed to remove item")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!favItems.length) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-semibold text-orange-600">No favorites yet!</h2>
        <p className="text-gray-500 text-sm">Start adding items to your wishlist ❤️</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-xl font-bold text-orange-600 mb-6">My Wishlist</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favItems.map((item) => (
          <div
            key={item._id}
            className="relative bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 flex flex-col"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.productName}
                className="w-full h-28 object-cover rounded-lg"
              />
              <button
                className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-600 p-1.5 rounded-full shadow-md transition"
                onClick={() => {handleRemove(item.menuId)}}
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Info */}
            <div className="mt-2 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {item.productName}
              </h2>
              <p className="text-xs text-gray-500">{item.category}</p>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-bold text-orange-600">₹{item.price}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  item.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.isAvailable ? "Available" : "Out of Stock"}
              </span>
            </div>

            {/* Extra row */}
            <div className="flex justify-between items-center mt-1 text-xs">
              <span className="flex items-center text-yellow-500">
                <Star className="h-3 w-3 mr-1 fill-yellow-500" /> {item.ratings ?? "N/A"}
              </span>
              {item.isVeg ? (
                <span className="flex items-center text-green-600">
                  <Leaf className="h-3 w-3 mr-1" /> Veg
                </span>
              ) : (
                <span className="flex items-center text-red-600">
                  <Ban className="h-3 w-3 mr-1" /> Non-Veg
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
