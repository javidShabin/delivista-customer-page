import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import formBg from "../assets/images/form-bg.jpg";
import { axiosInstance } from "../config/axiosInstance";
import OtpVerificationForm from "../components/OtpVerify";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false); // define showOtpForm
  const [userEmail, setUserEmail] = useState(""); // define userEmail

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      const payLoad = { ...data, role: "customer" };
      const response = await axiosInstance.post(
        "/authentication/user-signup",
        payLoad
      );
      toast.success(response.data.message);
      setUserEmail(data.email); // Save email
      setShowOtpForm(true);     // Show OTP form
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-2"
        style={{ backgroundImage: `url(${formBg})` }}
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 w-full h-screen flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-3xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 space-y-4"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white">
              Create Account
            </h2>

            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your name"
                className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
              />
              {errors.name && (
                <p className="text-xs text-red-300 mt-1">Name is required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Phone
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Your phone number"
                className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
              />
              {errors.phone && (
                <p className="text-xs text-red-300 mt-1">Phone is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
              />
              {errors.email && (
                <p className="text-xs text-red-300 mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Create a password"
                className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
              />
              {errors.password && (
                <p className="text-xs text-red-300 mt-1">
                  Password is required
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Repeat your password"
                className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-300 mt-1">
                  Please confirm your password
                </p>
              )}
            </div>
            {/* Address */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Address
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Enter address"
                className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
              />
              {errors.password && (
                <p className="text-xs text-red-300 mt-1">
                  address is required
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffa100] hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 rounded-full transition duration-300 shadow-md text-sm sm:text-base disabled:opacity-60 flex justify-center items-center gap-2"
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className="text-center text-white text-xs sm:text-sm mt-2">
              Already have an account?{" "}
              <Link
                to="/login-page"
                className="text-[#ffa100] font-semibold hover:underline transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* OTP Verification Modal */}
      {showOtpForm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <OtpVerificationForm email={userEmail} />
        </div>
      )}
    </>
  );
}
