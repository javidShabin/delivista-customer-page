import { MapPin, Plus, Edit, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import type { Address as AddressType } from "../../../types/Address";
import toast from "react-hot-toast";

const Address = () => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home',
    isDefault: false
  });

  useEffect(() => {
    const getAllAddresses = async () => {
      try {
        const response = await axiosInstance.get<{ data: AddressType[] }>("/address/all-address");
        const data = response.data.data
        setAddresses(data);
        // Set the default address as selected
        const defaultAddress = data.find((address) => address.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllAddresses();
  }, []);

  const onSelect = (addressId: string) => {
    const getDe = async () => {
      try {
        const response = await axiosInstance.put(`/address/default-updating/${addressId}`);
        const addressStatus = response.data.data.isDefault;
        if (addressStatus) {
          setSelectedAddressId(addressId); // set the selected address id
        }
        toast.success("Address selected");
      } catch (error) {
        console.log(error);
      }
    };
    getDe();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/address/create-address", formData);
      
      if (response.data.success) {
        // Add new address to the list
        setAddresses(prev => [...prev, response.data.data]);
        
        // Reset form and close modal
        setFormData({
          fullName: '',
          phoneNumber: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          addressType: 'home',
          isDefault: false
        });
        setShowAddForm(false);
        
        toast.success("Address created successfully!");
      }
    } catch (error: any) {
      console.error("Create address error:", error);
      toast.error(error.response?.data?.message || "Failed to create address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'home',
      isDefault: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-orange-600">My Addresses</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg shadow hover:bg-orange-600 transition-all"
        >
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
            className={`relative p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer `}
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

            <button
              onClick={() => onSelect(address._id)}
              className={`absolute bottom-3 right-3 px-3 py-1 ${selectedAddressId === address._id ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
                } text-white text-sm rounded shadow transition`}
            >
             {selectedAddressId === address._id ? "selected" : "select"}
            </button>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-orange-500">Add New Address</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type *
                </label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  id="isDefault"
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating...' : 'Create Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
