import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";


type Props = {
  email: string;
};

type Inputs = {
  otp: string;
};

export default function OtpVerificationForm({ email }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/authentication/verify-user-otp",
        {
          email,
          otp: data.otp,
        }
      );
      toast.success(response.data.message)
      navigate("/"); // redirect on success
    } catch (error:any) {
      console.error("OTP verification failed:", error);
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-2"
      style={{ backgroundImage: `url("/assets/images/form-bg.jpg")` }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 w-full h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-3xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white">
            Verify OTP
          </h2>

          {/* Display Email */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border border-white/30 bg-white/30 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none"
            />
          </div>

          {/* OTP Field */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
              OTP
            </label>
            <input
              type="text"
              {...register("otp", { required: true })}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
            />
            {errors.otp && (
              <p className="text-xs text-red-300 mt-1">OTP is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffa100] hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 rounded-full transition duration-300 shadow-md text-sm sm:text-base disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Verify OTP"}
          </button>
        </form>
      </div>
    </section>
  );
}
