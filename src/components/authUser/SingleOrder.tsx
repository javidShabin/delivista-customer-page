import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cancelOrder, getOrderById } from "../../services/orderService";
import {
  ArrowLeft,
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  Receipt,
  Download,
  Headset,
} from "lucide-react";
import { ReviewRating } from "./ReviewRating";

// ---------- Types ----------
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  _id: string;
  orderStatus: string;
  updatedAt: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee?: number;
  tax?: number;
  isReviewed: boolean;
  sellerId: string;
  paymentMethod?: string;
}

// ---------- Status Config ----------
const STATUS_STEPS = [
  { key: "placed", label: "Order Placed", icon: Clock, color: "text-amber-500" },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle, color: "text-emerald-500" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "text-orange-500" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, color: "text-blue-500" },
];

const STATUS_CONFIG: Record<
  string,
  { color: string; bgColor: string; borderColor: string; icon: any; label: string }
> = {
  confirmed: {
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: CheckCircle,
    label: "Confirmed",
  },
  placed: {
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: Clock,
    label: "Order Placed",
  },
  cancelled: {
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
    label: "Cancelled",
  },
  delivered: {
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: CheckCircle,
    label: "Delivered",
  },
};

const getStatusConfig = (status: string) =>
  STATUS_CONFIG[status] || {
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    icon: AlertCircle,
    label: status,
  };

// ---------- Reusable Components ----------
const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-6"></div>
    <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Order</h2>
    <p className="text-slate-500">Fetching your order details...</p>
  </div>
);

const ErrorScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
      <XCircle className="w-8 h-8 text-red-500" />
    </div>
    <h2 className="text-xl font-semibold text-slate-700 mb-2">Order Not Found</h2>
    <p className="text-slate-500 mb-6">
      We couldn't find the order you're looking for.
    </p>
    <button
      onClick={onBack}
      className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
    >
      Back to Orders
    </button>
  </div>
);

const OrderStatusCard = ({ order }: { order: Order }) => {
  const statusConfig = getStatusConfig(order.orderStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 ${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-xl`}>
            <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Order Status</h3>
            <p className={`text-sm font-medium ${statusConfig.color}`}>{statusConfig.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Updated</p>
          <p className="font-semibold text-slate-800">
            {new Date(order.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const OrderItems = ({ items }: { items: OrderItem[] }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Receipt className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">Order Items</h3>
    </div>
    <div className="space-y-4">
      {items?.length ? (
        items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image || "/placeholder-food.png"}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-800">₹{item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-slate-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>No items found</p>
        </div>
      )}
    </div>
  </div>
);

const OrderSummarySidebar = ({ order, onCancel }: { order: Order; onCancel: () => void }) => (
  <div className="space-y-6">
    {/* Price Summary */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-emerald-500" /> Price Summary
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="text-slate-800">₹{order.totalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Delivery Fee</span>
          <span className="text-slate-800">₹{order.deliveryFee || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Tax</span>
          <span className="text-slate-800">₹{order.tax || 0}</span>
        </div>
        <hr className="border-slate-200" />
        <div className="flex justify-between text-base font-bold">
          <span className="text-slate-800">Total</span>
          <span className="text-orange-600">₹{order.totalAmount}</span>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="space-y-3">
      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
        <Download className="w-4 h-4" /> Download Receipt
      </button>
      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
        <Headset className="w-4 h-4" /> Contact Support
      </button>
      <button
        onClick={onCancel}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <XCircle className="w-4 h-4" /> Cancel Order
      </button>
    </div>
  </div>
);

const OrderTimeline = ({ currentStatus }: { currentStatus: string }) => {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-500" /> Order Timeline
      </h3>
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
        <div className="space-y-6">
          {STATUS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const active = idx <= currentIndex;
            return (
              <div key={step.key} className="flex items-center gap-4 relative">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full z-10 ${
                    active ? "bg-orange-100" : "bg-slate-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? step.color : "text-slate-400"}`} />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      active ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    {active ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ---------- Main Component ----------
export const SingleOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
console.log(order)

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
