import type { Order } from "../../types/Order";
import { getStatusConfig } from "../../constants/orderConstants";

// ---------- Order Status Card Component ----------
interface OrderStatusCardProps {
  order: Order;
}

export const OrderStatusCard = ({ order }: OrderStatusCardProps) => {
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
