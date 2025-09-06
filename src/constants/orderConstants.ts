import {
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  XCircle,
} from "lucide-react";

// ---------- Status Config ----------
export const STATUS_STEPS = [
  { key: "placed", label: "Order Placed", icon: Clock, color: "text-amber-500" },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle, color: "text-emerald-500" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "text-orange-500" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, color: "text-blue-500" },
];

export const STATUS_CONFIG: Record<
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

export const getStatusConfig = (status: string) =>
  STATUS_CONFIG[status] || {
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    icon: AlertCircle,
    label: status,
  };
