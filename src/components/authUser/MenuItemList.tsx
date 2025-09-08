import { Heart } from "lucide-react";

interface Variant {
  name: string;
  price: number;
  _id: string;
}

interface MenuItem {
  _id: string;
  productName: string;
  description: string;
  sellerId: string;
  customerId: string;
  restaurantId: string;
  quantity: number;
  image: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  isRecommended: boolean;
  tags: string[];
  category: string;
  variants: Variant[];
  ratings: number;
  totalReviews: number;
}

interface MenuItemListProps {
  menuItems: MenuItem[];
  favorites: string[];
  onToggleFavorite: (menuId: any) => void;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemList: React.FC<MenuItemListProps> = ({
  menuItems,
  favorites,
  onToggleFavorite,
  onAddToCart,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden relative"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-full h-36 object-cover"
            />

            <button
              onClick={() => onToggleFavorite(item._id)}
              className="absolute top-3 left-3 p-1 bg-white/80 rounded-full backdrop-blur shadow"
            >
              <Heart
                size={18}
                className={`transition-all ${
                  favorites.includes(item._id)
                    ? "fill-orange-500 text-orange-500"
                    : "text-gray-400 hover:text-orange-400"
                }`}
              />
            </button>

            <button
              onClick={() => onAddToCart(item)}
              className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md transition"
            >
              Add to cart
            </button>

            <div className="p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800">{item.productName}</h3>
                <span className="text-orange-600 font-bold text-sm">₹{item.price}</span>
              </div>

              <p className="text-[11px] italic text-gray-500 mb-1">Category: {item.category}</p>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[10px] font-medium">#{tag}</span>
                ))}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.isVeg ? "🌱 Veg" : "🍖 Non-Veg"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-semibold ${item.isAvailable ? "text-green-600" : "text-red-600"}`}>
                  {item.isAvailable ? "Available" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No menu items found.</p>
      )}
    </>
  );
};

export default MenuItemList;


