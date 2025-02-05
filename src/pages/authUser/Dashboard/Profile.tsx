import { Camera, Mail, Phone, MapPin, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

const Profile = () => {

  interface UserDetails {
    name: string,
    avatar: string,
    email: string,
    role: string,
    phone: string,
    address: string,
    createdAt: string,
    updatedAt: string
  }

  const [profile, setUserProfile] = useState<UserDetails| null>(null)

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosInstance.get("/user/customer-profile");
        console.log(response.data)
        setUserProfile(response.data.customer);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500">
          Update your personal details and preferences
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="bg-white rounded-2xl shadow p-6 border border-orange-50 flex flex-col items-center">
          <div className="relative w-28 h-28">
            <img
              src={profile?.avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full border border-orange-100 object-cover"
            />
            <button className="absolute bottom-1 right-1 p-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition-all">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="mt-4 text-lg font-bold text-gray-800">{profile?.name}</h2>

          {/* Quick Stats */}
          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={16} /> {profile?.email}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={16} /> {profile?.phone}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={16} /> {profile?.address}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Shield size={16} /> Verified Account
            </div>
          </div>
        </div>

        {/* Editable Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 border border-orange-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Edit Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={profile?.name}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                defaultValue={profile?.email}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                defaultValue={profile?.phone}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                type="text"
                defaultValue={profile?.address}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-sm transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
