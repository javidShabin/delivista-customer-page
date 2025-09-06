import { Package, Receipt } from "lucide-react";
import type { OrderItem } from "../../types/Order";

// ---------- Order Items Component ----------
interface OrderItemsProps {
  items: OrderItem[];
}

export const OrderItems = ({ items }: OrderItemsProps) => (
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
