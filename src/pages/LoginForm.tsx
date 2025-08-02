import { axiosInstance } from "../config/axiosInstance";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import formBg from "../assets/images/form-bg.jpg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function LoginForm() {
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
        "/authentication/user-login",
        data
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error: unknown) {
      console.error("Login error", error);
      let errorMessage = "Login failed. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: unknown } } })
          .response?.data?.message === "string"
      ) {
        errorMessage = (error as { response: { data: { message: string } } })
          .response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Login to Your Account
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
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
            />
            {errors.password && (
              <p className="text-xs text-red-300 mt-1">Password is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffa100] hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 rounded-full transition duration-300 shadow-md text-sm sm:text-base disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-white text-xs sm:text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup-page"
              className="text-[#ffa100] font-semibold hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
