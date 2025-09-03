import { useState } from "react";
import { Star } from "lucide-react";

export default function RestaurantReview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  // Empty function placeholders
  const handleRatingSubmit = () => {
    // TODO: add submit logic here (send to backend)
    console.log("Restaurant Rating:", rating, "Review:", review);
  };

  const handleCancel = () => {
    // TODO: add cancel/reset logic here
    setRating(0);
    setReview("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-orange-50 p-6">
      <div className="w-full max-w-lg shadow-xl rounded-2xl border border-orange-200 bg-white p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Rate This Restaurant
        </h1>
        <p className="text-center text-gray-500">
          Your feedback helps us serve you better 🍴
        </p>

        {/* Star Rating */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={36}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition-colors duration-200 ${
                star <= (hover || rating)
                  ? "fill-orange-500 text-orange-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Review Textarea */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review about the restaurant..."
          className="w-full min-h-[120px] resize-none rounded-xl border border-orange-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 rounded-xl border border-orange-300 text-orange-600 py-2 hover:bg-orange-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleRatingSubmit}
            className="flex-1 rounded-xl bg-orange-500 py-2 text-white hover:bg-orange-600 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}