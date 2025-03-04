import { Search, Filter, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/orderService";
import { useNavigate } from "react-router-dom";

// helper function for status style
const getStatusStyle = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "placed":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "delivered":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Order = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const getAllOrdersList = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAllOrdersList();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-sm text-gray-500">
            Track and manage your past purchases
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center w-full md:w-1/3 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="flex-1 outline-none ml-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">Filter</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-orange-50 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-orange-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-100 hover:bg-orange-50 transition-all"
                >
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">₹{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={()=>{navigate(`/user/dashboard/order/${order._id}`)}} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium">
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
