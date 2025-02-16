import { MapPin, Plus } from "lucide-react";

const Address = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-orange-100">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-orange-600">My Addresses</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg shadow hover:bg-orange-600 transition-all">
          <Plus size={16} /> Add New
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        Manage your saved addresses for faster checkout and accurate deliveries.
      </p>

      {/* Address List */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white border border-orange-200 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <MapPin size={18} />
            </div>
            <h2 className="font-semibold text-gray-800">Home</h2>
          </div>
          <p className="text-gray-600 text-sm">123 Main Street, Cityville, USA</p>
          <p className="text-gray-600 text-sm">+1 234 567 890</p>
        </div>

        <div className="p-5 bg-white border border-orange-200 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <MapPin size={18} />
            </div>
            <h2 className="font-semibold text-gray-800">Work</h2>
          </div>
          <p className="text-gray-600 text-sm">456 Office Park, Business City, USA</p>
          <p className="text-gray-600 text-sm">+1 987 654 321</p>
        </div>
      </div>
    </div>
  );
};

export default Address;
