import { useEffect, useMemo, useState } from "react";
import { submitRestaurantReview as submitReviewAPI } from "../../services/reviewService";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

interface ReviewRatingProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  restaurantId?: string;
  sellerId?: string;
  orderId?: string;
}

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#f59e0b" : "none"}
    stroke={filled ? "#f59e0b" : "#d1d5db"}
    className="w-7 h-7 cursor-pointer transition-transform hover:scale-110"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.26 2.26a.75.75 0 0 0 .424.213l3.19.463a.75.75 0 0 1 .416 1.279l-2.307 2.25a.75.75 0 0 0-.216.664l.544 3.17a.75.75 0 0 1-1.088.791l-2.847-1.496a.75.75 0 0 0-.698 0l-2.847 1.496a.75.75 0 0 1-1.088-.79l.544-3.171a.75.75 0 0 0-.216-.664L5.19 7.714a.75.75 0 0 1 .416-1.279l3.19-.463a.75.75 0 0 0 .424-.213l2.26-2.26Z"
    />
  </svg>
);

export const ReviewRating = ({ isOpen, onClose, orderItems, restaurantId, sellerId, orderId }: ReviewRatingProps) => {
  const [restaurantRating, setRestaurantRating] = useState<number>(0);
  const [restaurantHover, setRestaurantHover] = useState<number>(0);
  const [restaurantReview, setRestaurantReview] = useState<string>("");


  const [itemRatings, setItemRatings] = useState<Record<number, number>>({});
  const [itemHover, setItemHover] = useState<Record<number, number>>({});

  useEffect(() => {
    if (isOpen) {
      setRestaurantRating(0);
      setRestaurantHover(0);
      setRestaurantReview("");
      setItemRatings({});
      setItemHover({});
    }
  }, [isOpen]);

  const allItemsRated = useMemo(() => {
    if (!orderItems?.length) return true;
    return orderItems.every((_, idx) => (itemRatings[idx] ?? 0) > 0);
  }, [orderItems, itemRatings]);

  const submitRestaurantReview = async (
    rating: any,
    review: any
  ): Promise<void> => {
    try {
      if (!sellerId || !orderId) {
        console.error("Missing required data: sellerId or orderId");
        return;
      }

      // For now, we'll use the first menu item's ID as menuItemId
      // In a real implementation, you might want to handle multiple menu items differently
      const menuItemId = orderItems[0]?.name || "default"; // Using name as a placeholder for menuItemId
      
      const response = await submitReviewAPI({
        sellerId,
        menuItemId,
        orderId,
        rating,
        review
      });
      
      console.log("Review submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const submitItemRatings = async (
    ratings: Array<{ index: number; rating: number }>
  ): Promise<void> => {
    return; ratings
  };

  const handleSubmit = async () => {
    await submitRestaurantReview(restaurantRating, restaurantReview);
    const ratingsArray = Object.entries(itemRatings).map(([index, rating]) => ({ index: Number(index), rating }));
    await submitItemRatings(ratingsArray);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 sm:p-7 animate-in slide-in-from-bottom duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 bg-slate-100 hover:bg-slate-200 text-slate-600"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{restaurantId || "Restaurant Review"}</h3>
          <p className="text-slate-500 text-sm">Share your experience to help others</p>
        </div>

        <div className="space-y-8">
          <section className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">Overall Restaurant Rating</h4>
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  onMouseEnter={() => setRestaurantHover(value)}
                  onMouseLeave={() => setRestaurantHover(0)}
                  onClick={() => setRestaurantRating(value)}
                >
                  <Star filled={value <= (restaurantHover || restaurantRating)} />
                </div>
              ))}
              <span className="ml-2 text-sm text-slate-600">{restaurantRating > 0 ? `${restaurantRating}/5` : "Tap to rate"}</span>
            </div>
            <textarea
              value={restaurantReview}
              onChange={(e) => setRestaurantReview(e.target.value)}
              placeholder="Write a short review (optional)"
              className="w-full min-h-[90px] rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent p-3 text-sm text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </section>

          <section className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">Rate Food Items</h4>
            <div className="space-y-4 max-h-60 overflow-auto pr-1">
              {orderItems?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 bg-white rounded-lg p-3 border border-slate-200">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image || "/placeholder-food.png"} className="w-10 h-10 rounded-md object-cover" />
                    <div className="truncate">
                      <p className="text-slate-800 font-medium truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div
                        key={value}
                        onMouseEnter={() => setItemHover((prev) => ({ ...prev, [idx]: value }))}
                        onMouseLeave={() => setItemHover((prev) => ({ ...prev, [idx]: 0 }))}
                        onClick={() => setItemRatings((prev) => ({ ...prev, [idx]: value }))}
                      >
                        <Star filled={value <= ((itemHover[idx] ?? 0) || (itemRatings[idx] ?? 0))} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={restaurantRating === 0 || !allItemsRated}
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;


