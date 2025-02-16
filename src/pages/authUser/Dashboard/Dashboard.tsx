import { ShoppingBag, MapPin, Heart, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const activityData = [
  { name: "Mon", orders: 2 },
  { name: "Tue", orders: 4 },
  { name: "Wed", orders: 3 },
  { name: "Thu", orders: 5 },
  { name: "Fri", orders: 2 },
  { name: "Sat", orders: 6 },
  { name: "Sun", orders: 4 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 bg-white rounded-2xl shadow border border-orange-100"
      >
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Sarah 👋</h1>
        <p className="text-sm text-gray-500">Here’s your weekly activity and updates.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Orders", value: "12" },
          { label: "Addresses Saved", value: "3" },
          { label: "Wishlist Items", value: "8" },
          { label: "Pending Orders", value: "2" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="p-5 bg-white rounded-xl shadow border border-orange-50"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-2 p-6 bg-white rounded-2xl shadow border border-orange-50"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders This Week</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-white rounded-2xl shadow border border-orange-50"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <ul className="divide-y divide-orange-100 text-sm text-gray-700">
            <li className="py-3 flex justify-between">
              <span>#1023 - Delivered</span>
              <span className="text-gray-500">2 days ago</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>#1022 - In Transit</span>
              <span className="text-gray-500">5 days ago</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>#1021 - Cancelled</span>
              <span className="text-gray-500">1 week ago</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: <ShoppingBag size={20} />, label: "Orders" },
          { icon: <MapPin size={20} />, label: "Addresses" },
          { icon: <Heart size={20} />, label: "Wishlist" },
          { icon: <Settings size={20} />, label: "Settings" },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="flex flex-col items-center p-4 bg-white border border-orange-100 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="text-orange-500 mb-2">{action.icon}</div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
