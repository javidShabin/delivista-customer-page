"use client";

import { axiosInstance } from "@/config/axiosInstance";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/authentication/user-login",
        data
      );
      router.push("/");
      toast.success(response.data.message);
      // Handle token or redirect here
    } catch (error: any) {
      console.error("Login error", error);
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-2"
      style={{ backgroundImage: `url("/assets/images/form-bg.jpg")` }}
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
            Don’t have an account?{" "}
            <Link
              href="/signup-page"
              className="text-[#ffa100] font-semibold hover:underline transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
