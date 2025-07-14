import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Heart } from "lucide-react";

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
  const [tagFilter, setTagFilter] = useState(""); // New tag filter
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchMenuItems = async () => {
      try {
        let response;

        if (search.trim() !== "") {
          response = await axiosInstance.get(
            `/menu/search-menu?restaurantId=${restaurantId}&keyword=${search}&page=${page}&limit=8`
          );
        } else if (tagFilter !== "") {
          response = await axiosInstance.get(
            `/menu/menu-by-tag?restaurantId=${restaurantId}&tag=${tagFilter}&page=${page}&limit=8`
          );
        } else if (categoryFilter === "All") {
          response = await axiosInstance.get(
            `/menu/get-all-menus/${restaurantId}?page=${page}&limit=8`
          );
        } else {
          response = await axiosInstance.get(
            `/menu/get-menu-by-catagory/${categoryFilter}?restaurantId=${restaurantId}&page=${page}&limit=8`
          );
        }

        const menus: MenuItem[] = response.data.data || response.data.menus;
        setMenuItems(menus);
        setTotalPages(response.data.totalPages || 1);

        const uniqueCategories: string[] = Array.from(
          new Set(menus.map((item) => item.category))
        );
        setAllCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenuItems();
  }, [restaurantId, categoryFilter, search, page, tagFilter]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-10 px-4 md:px-10 lg:px-1">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🍴 Menu Items</h2>
        <p className="text-gray-500 text-md">Explore our delicious and freshly made menu!</p>
      </div>

      <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
            setCategoryFilter("All");
            setTagFilter("");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
            setSearch("");
            setTagFilter("");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-24 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            setTagFilter(e.target.value);
            setPage(1);
            setSearch("");
            setCategoryFilter("All");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-24 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Tags</option>
          <option value="Spicy">Spicy</option>
          <option value="Popular">Popular</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Vegan">Vegan</option>
          <option value="Healthy">Healthy</option>
          <option value="Sweet">Sweet</option>
          <option value="Chef's Special">Chef's Special</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-full h-36 object-cover"
            />

            <button
              onClick={() => toggleFavorite(item._id)}
              className="absolute top-3 left-3 p-1 rounded-full backdrop-blur-md bg-white/70 hover:ring-2 hover:ring-orange-400 transition-all shadow-md"
            >
              <Heart
                size={18}
                className={`transition-all duration-300 ${
                  favorites.includes(item._id)
                    ? "fill-orange-500 text-orange-500 scale-110"
                    : "text-gray-400 hover:text-orange-400"
                }`}
              />
            </button>

            <button className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md transition">
              Add to cart
            </button>

            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-800">{item.productName}</h3>
                <span className="text-orange-600 font-bold text-sm">₹{item.price}</span>
              </div>

              <p className="text-[11px] text-gray-500 mb-1 italic">Category: {item.category}</p>
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
                {item.isVeg ? (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                    🌱 Veg
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                    🍖 Non-Veg
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  ⭐ {item.ratings} / {item.totalReviews} reviews
                </span>
                {item.isAvailable ? (
                  <span className="text-green-600 text-[10px] font-semibold">Available</span>
                ) : (
                  <span className="text-red-600 text-[10px] font-semibold">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No menu items found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                page === i + 1 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Menu;
