import { DollarSign, Download, Headset, XCircle } from "lucide-react";
import type { Order } from "../../types/Order";

// ---------- Order Summary Sidebar Component ----------
interface OrderSummarySidebarProps {
  order: Order;
  onCancel: () => void;
}

export const OrderSummarySidebar = ({ order, onCancel }: OrderSummarySidebarProps) => (
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
