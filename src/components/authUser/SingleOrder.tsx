import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cancelOrder, getOrderById } from "../../services/orderService";
import { ReviewRating } from "./ReviewRating";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";
import { OrderStatusCard } from "./OrderStatusCard";
import { OrderItems } from "./OrderItems";
import { OrderSummarySidebar } from "./OrderSummarySidebar";
import { OrderTimeline } from "./OrderTimeline";
import type { Order } from "../../types/Order";

// ---------- Main Component ----------
export const SingleOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleCancelOrder = async (orderId: any) => {
    try {
      await cancelOrder(orderId)
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        setLoading(true);
        const response = await getOrderById(orderId);
      
        setOrder(response.data.data);
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order?.orderStatus === "delivered") {
      setIsReviewOpen(true);
    }if (order?.isReviewed === true) {
      setIsReviewOpen(false);
    }
  }, [order]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/user/dashboard/order")}
            className="p-2 bg-white border border-slate-200 rounded-xl shadow hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Order Details
            </h1>
            <p className="text-slate-600">
              Order #{order?._id?.slice(-8)}
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingScreen />
        ) : error || !order ? (
          <ErrorScreen onBack={() => navigate("/user/dashboard/order")} />
        ) : (
          <>
            <OrderStatusCard order={order} />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left side */}
              <div className="lg:col-span-2 space-y-6">
                <OrderItems items={order.items} />
                <OrderTimeline currentStatus={order.orderStatus} />
              </div>
              {/* Right side */}
              <OrderSummarySidebar order={order} onCancel={() => {handleCancelOrder(order._id)}} />
            </div>

            <ReviewRating
              isOpen={isReviewOpen}
              onClose={() => setIsReviewOpen(false)}
              orderItems={order.items}
              sellerId={order.sellerId}
              orderId={order._id}
            />
          </>
        )}
      </div>
    </div>
  );
};
