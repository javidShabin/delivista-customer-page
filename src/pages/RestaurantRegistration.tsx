import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cuisineType: string;
  description: string;
  openingHours: string;
  deliveryRadius: string;
  website?: string;
  licenseNumber: string;
  taxId: string;
  bankAccount: string;
  agreeToTerms: boolean;
}

const RestaurantRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    alert('Registration successful! We will contact you soon.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">1</span>
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    {...register('businessName', { required: 'Business name is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.businessName ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your restaurant name"
                  />
                  {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    {...register('contactName', { required: 'Contact name is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.contactName ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter contact person name"
                  />
                  {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email is invalid'
                      }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Restaurant Description *
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 resize-none ${
                      errors.description ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Describe your restaurant, specialties, and what makes you unique"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
              </div>
            </div>

            {/* Location Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">2</span>
                Location Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.address ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your restaurant address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.city ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.state ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter state"
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    {...register('zipCode', { required: 'ZIP code is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter ZIP code"
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Radius *
                  </label>
                  <select
                    {...register('deliveryRadius', { required: 'Delivery radius is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.deliveryRadius ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                  >
                    <option value="">Select delivery radius</option>
                    <option value="5">5 miles</option>
                    <option value="10">10 miles</option>
                    <option value="15">15 miles</option>
                    <option value="20">20 miles</option>
                    <option value="25">25 miles</option>
                  </select>
                  {errors.deliveryRadius && <p className="text-red-500 text-sm mt-1">{errors.deliveryRadius.message}</p>}
                </div>
              </div>
            </div>

            {/* Restaurant Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">3</span>
                Restaurant Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuisine Type *
                  </label>
                  <select
                    {...register('cuisineType', { required: 'Cuisine type is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.cuisineType ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                  >
                    <option value="">Select cuisine type</option>
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                    <option value="indian">Indian</option>
                    <option value="mexican">Mexican</option>
                    <option value="american">American</option>
                    <option value="thai">Thai</option>
                    <option value="japanese">Japanese</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="fast-food">Fast Food</option>
                    <option value="pizza">Pizza</option>
                    <option value="seafood">Seafood</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.cuisineType && <p className="text-red-500 text-sm mt-1">{errors.cuisineType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Opening Hours *
                  </label>
                  <input
                    type="text"
                    {...register('openingHours', { required: 'Opening hours are required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.openingHours ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="e.g., Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
                  />
                  {errors.openingHours && <p className="text-red-500 text-sm mt-1">{errors.openingHours.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    {...register('website')}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    placeholder="https://your-restaurant.com"
                  />
                </div>
              </div>
            </div>

            {/* Business Documents Section */}
            <div className="pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">4</span>
                Business Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business License Number *
                  </label>
                  <input
                    type="text"
                    {...register('licenseNumber', { required: 'Business license number is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.licenseNumber ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter business license number"
                  />
                  {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tax ID (EIN) *
                  </label>
                  <input
                    type="text"
                    {...register('taxId', { required: 'Tax ID is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.taxId ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter tax ID number"
                  />
                  {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Account Information *
                  </label>
                  <input
                    type="text"
                    {...register('bankAccount', { required: 'Bank account information is required' })}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                      errors.bankAccount ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter bank account details (for payments)"
                  />
                  {errors.bankAccount && <p className="text-red-500 text-sm mt-1">{errors.bankAccount.message}</p>}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  {...register('agreeToTerms', { required: 'You must agree to the terms and conditions' })}
                  className="w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
              </div>
              <div className="text-sm">
                <label className="font-medium text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-500 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-500 underline">
                    Privacy Policy
                  </a>{' '}
                  *
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Registration
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 sm:flex-none bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@delivista.com" className="text-orange-600 hover:text-orange-500">
              support@delivista.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegistration;