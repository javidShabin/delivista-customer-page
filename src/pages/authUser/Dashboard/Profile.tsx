import { Camera, Mail, Phone, MapPin, Shield } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

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
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosInstance.get("/user/user-profile");
        console.log(response)
        setUserProfile(response.data.customer);
        // Initialize form data with profile data
        if (response.data.customer) {
          setFormData({
            name: response.data.customer.name || '',
            email: response.data.customer.email || '',
            phone: response.data.customer.phone || '',
            address: response.data.customer.address || ''
          })
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveChanges = async () => {
    if (!profile) return

    setIsLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)

      if (selectedImage) {
        formDataToSend.append('avatar', selectedImage)
      }

      console.log(formDataToSend)

      const response = await axiosInstance.put("/user/update-user-profile", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        // Update local profile state
        setUserProfile(prev => prev ? {
          ...prev,
          ...formData,
          avatar: response.data.data.avatar || prev.avatar
        } : null)
        
        // Reset form state
        setSelectedImage(null)
        setPreviewImage('')
        setIsEditing(false)
        
        // Show success message (you can add a toast notification here)
        toast.success('Profile updated successfully!')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || ''
      })
    }
    setSelectedImage(null)
    setPreviewImage('')
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

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
              src={previewImage || profile?.avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full border border-orange-100 object-cover"
            />
            <button 
              onClick={handleImageClick}
              className="absolute bottom-1 right-1 p-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition-all"
            >
              <Camera size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Profile
            </h3>
            {!isEditing && (
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
