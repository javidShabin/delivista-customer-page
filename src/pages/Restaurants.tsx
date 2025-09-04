import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Star } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom"; // React Router v6+
import { axiosInstance } from "../config/axiosInstance"; // update this path if needed

interface Restaurant {
  _id: string;
  name: string;
  sellerId: string;
  phone: string;
  address: string;
  cuisine: string[];
  pinCode: string;
  image: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  isVerified: boolean;
  totalReviews: number;
  ratings: number;
}

const RestaurantsPage: React.FC = () => {
  const [resDetails, setRestDetails] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/restaurant/verified-restaurants?page=${page}&limit=8`
      );
      console.log(response.data.verifiedRestaurants.ratings)
      
      setRestDetails(response.data.verifiedRestaurants || []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f9fb] py-9 md:py-3 px-4">
      <div className="max-w-7xl mx-auto md:mt-28">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-5">
          Discover Top <span className="text-orange-400"> Restaurants</span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <ClipLoader size={50} color="#f97316" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {resDetails.map((restaurant) => (
                <Link
                  key={restaurant._id}
                  to={`/user/restaurant/${restaurant._id}`}
                >
                  <div className="bg-white/90 border border-gray-200 rounded-xl p-3 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all duration-200 hover:scale-[1.01] backdrop-blur-sm">
                    <div className="w-full h-28 rounded-lg overflow-hidden mb-2">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-sm font-semibold text-gray-800 truncate">
                          {restaurant.name}
                        </h2>
                        <div className="text-right text-xs text-gray-500 space-y-0.5 leading-tight">
                          <p>📞 {restaurant.phone}</p>
                          <p>📍 {restaurant.pinCode}</p>
                          <p className="text-xs text-gray-500">
                            🍽️{" "}
                            <span className="text-gray-700 font-medium">
                              {restaurant.cuisine.join(", ")}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {restaurant.address}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        {restaurant.openTime} - {restaurant.closeTime}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            restaurant.isVerified
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {restaurant.isVerified ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Verified
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              Not Verified
                            </>
                          )}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {restaurant.ratings}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:mt-10 mb-5 md:mb-0 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 text-sm border rounded ${
                    currentPage === index + 1
                      ? "bg-orange-400 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RestaurantsPage;
