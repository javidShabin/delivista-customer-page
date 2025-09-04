import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";

export default function RestaurantReview({handleRating}:any) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setRating(0);
    setReview("");
    handleRating(-1); // Call the parent function to close the component without submitting rating
  };

  const handleCancel = () => {
    setRating(0);
    setReview("");
    handleRating(-1); // Close the component without submitting rating
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="w-full max-w-md">
        {/* Card with dark theme and orange accents */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Header with orange gradient accent */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Rate Your Experience
            </h1>
            <p className="text-white/80 text-sm">
              Help others discover great food
            </p>
          </div>

          {/* Content area */}
          <div className="p-6 space-y-6">
            {/* Star Rating - Minimalist style */}
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-4 font-medium">How was your meal?</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-700"
                  >
                    <Star
                      size={32}
                      className={`transition-all duration-200 ${
                        star <= (hover || rating)
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-500 hover:text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
            </div>

            {/* Review Textarea - Clean and minimal */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Tell us more (optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share details about the food, service, or atmosphere..."
                className="w-full min-h-[100px] resize-none rounded-lg bg-gray-700 border border-gray-600 p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Action Buttons - Modern flat design */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 font-medium hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {handleRating(rating)}}
                className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}