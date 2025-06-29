"use client";

import { axiosInstance } from "@/config/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";

const RestaurantById = () => {
  const { id } = useParams() as { id: string };
  const [restaurant, setRestaurant] = useState<any>(null);

  const getRestaurantById = async () => {
    try {
      const response = await axiosInstance.get(
        `/restaurant/restaurant-byId/${id}`
      );
      setRestaurant(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) getRestaurantById();
  }, [id]);

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-gray-500">
        <ClipLoader size={45} color="#f97316" />
        <p className="text-sm tracking-wide animate-pulse">
          Fetching restaurant details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-12">
      <div className="max-w-6xl mx-auto pt-10">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          {/* Restaurant Banner */}
          <div className="relative h-[220px] sm:h-[300px] group">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow">
              {restaurant.isOpen ? "🟢 Open Now" : "🔴 Closed"}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {restaurant.name}
              </h1>
              {restaurant.isVerified && (
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <CheckCircle size={18} />
                  Verified
                </div>
              )}
            </div>

            {/* Address + Phone (Inline) */}
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <MapPin className="text-orange-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Address & Contact
                </p>
                <p className="text-gray-700">
                  {restaurant.address}
                  <span className="mx-2 text-gray-400">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-4 h-4 text-orange-500" />
                    {restaurant.phone}
                  </span>
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 pt-3 text-sm">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                🍽 Cuisine: {restaurant.cuisine?.join(", ") || "N/A"}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                ⏰ {restaurant.openTime} - {restaurant.closeTime}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                📍 {restaurant.pinCode}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                ⭐ {restaurant.totalReviews} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Menu Placeholder */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            🍴 Menu Items
          </h2>
          <p className="text-gray-500 text-sm">
            This section will show menu items soon. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantById;
