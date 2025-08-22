import { MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import type { Address as AddressType } from "../../../types/Address";
import toast from "react-hot-toast";

const Address = () => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null); // store selected address _id

  useEffect(() => {
    const getAllAddresses = async () => {
      try {
        const response = await axiosInstance.get<{ data: AddressType[] }>("/address/all-address");
        setAddresses(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllAddresses();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedAddress(id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit address:", id);
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await axiosInstance.delete(`/address/delete-address/${addressId}`);
      toast.success("Address deleted");
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

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
        {addresses.map((address) => (
          <div
            key={address._id}
            className={`relative p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${
              selectedAddress === address._id ? "border-orange-500" : "border-orange-200"
            }`}
            onClick={() => handleSelect(address._id)}
          >
            {/* Edit & Delete Top Right */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(address._id);
                }}
                className="text-orange-500 hover:text-orange-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(address._id);
                }}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <MapPin size={18} />
              </div>
              <h2 className="font-semibold text-gray-800">{address.addressType}</h2>
            </div>
            <p className="text-gray-700 font-medium">{address.fullName}</p>
            <p className="text-gray-600 text-sm">{address.address}</p>
            <p className="text-gray-600 text-sm">
              {address.city}, {address.state}, {address.pincode}
            </p>
            <p className="text-gray-600 text-sm">{address.phoneNumber}</p>

            {/* Select Tick Bottom Right */}
            {selectedAddress === address._id && (
              <span className="absolute bottom-3 right-3 text-green-600 font-bold">✔</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
