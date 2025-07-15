import { useEffect, useState } from "react";
import {
  fetchAllMenus,
  fetchMenusByCategory,
  fetchMenusBySearch,
  fetchMenusByTag,
  fetchAvailableMenus,
} from "../../services/menuService";

import { addToCartAPI } from "../../services/cartService";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

interface MenuProps {
  restaurantId: string | undefined;
}

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

const Menu: React.FC<MenuProps> = ({ restaurantId }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [allCategories, setAllCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchMenu = async () => {
      try {
        let response;

        if (search.trim()) {
          response = await fetchMenusBySearch(search, restaurantId, page);
        } else if (tagFilter) {
          response = await fetchMenusByTag(tagFilter, restaurantId, page);
        } else if (showAvailableOnly) {
          response = await fetchAvailableMenus(restaurantId, page);
        } else if (categoryFilter === "All") {
          response = await fetchAllMenus(restaurantId, page);
        } else {
          response = await fetchMenusByCategory(categoryFilter, restaurantId, page);
        }

        const menus: MenuItem[] = response.data.data || response.data.menus;
        setMenuItems(menus);
        setTotalPages(response.data.totalPages || 1);

        const categories = Array.from(new Set(menus.map((item) => item.category)));
        setAllCategories(["All", ...categories]);
      } catch (error) {
        console.error("Fetch menu error:", error);
      }
    };

    fetchMenu();
  }, [restaurantId, categoryFilter, search, page, tagFilter, showAvailableOnly]);

  const handleAddToCart = async (item: MenuItem) => {
    try {
      const payload = {
        sellerId: item.sellerId,
        customerId: item.customerId,
        restaurantId: item.restaurantId,
        items: [
          {
            menuId: item._id,
            quantity: item.quantity || 1,
            price: item.price,
            image: item.image,
            productName: item.productName,
            category: item.category,
            isVeg: item.isVeg,
          },
        ],
      };

      const response = await addToCartAPI(payload);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setTagFilter("");
    setShowAvailableOnly(false);
    setPage(1);
  };

  return (
    <section className="py-10 px-4 md:px-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🍴 Menu Items</h2>
        <p className="text-gray-500 text-md">Explore our delicious and freshly made menu!</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => {
            resetFilters();
            setSearch(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => {
            resetFilters();
            setCategoryFilter(e.target.value);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => {
            resetFilters();
            setTagFilter(e.target.value);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Tags</option>
          {["Spicy", "Popular", "New Arrival", "Vegan", "Healthy", "Sweet", "Chef's Special"].map(
            (tag, i) => (
              <option key={i} value={tag}>
                {tag}
              </option>
            )
          )}
        </select>

        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => {
              resetFilters();
              setShowAvailableOnly(e.target.checked);
            }}
            className="accent-orange-500 w-4 h-4"
          />
          <span>Available Only</span>
        </label>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden relative"
          >
            <img src={item.image} alt={item.productName} className="w-full h-36 object-cover" />

            <button
              onClick={() => toggleFavorite(item._id)}
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
              onClick={() => handleAddToCart(item)}
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
                  <span
                    key={idx}
                    className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[10px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    item.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isVeg ? "🌱 Veg" : "🍖 Non-Veg"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500">
                  ⭐ {item.ratings} / {item.totalReviews} reviews
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    item.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No items */}
      {menuItems.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No menu items found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                page === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Menu;
