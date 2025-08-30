import { useEffect, useState } from "react"
import { clearAllList, getFavorites, removeFavitem } from "../../../services/wishlistService"
import { Star, Leaf, Ban, Trash2, Trash } from "lucide-react"
import toast from "react-hot-toast"

const Favorites = () => {
  const [favItems, setFavItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)

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

  // Clear All (empty for now)
  const handleClearAll = async () => {
    try {
      const response = await clearAllList()
      toast.success(response.data.message, { icon: "🗑️" })
      setShowConfirm(false)
      setFavItems(response.data.data)
    } catch (error) {
      console.log(error)
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
    <div className="p-4 bg-white min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-orange-600">My Wishlist</h1>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-1 text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition shadow-sm"
        >
          <Trash size={16} /> Clear All
        </button>
      </div>

      {/* Wishlist Grid */}
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
                onClick={() => {
                  handleRemove(item.menuId)
                }}
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Clear all favorites?
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites
