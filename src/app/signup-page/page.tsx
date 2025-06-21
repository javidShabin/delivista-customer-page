"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("/assets/images/form-bg.jpg")` }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 w-[100%] h-screen flex justify-center items-center">

     
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-3xl px-8 py-10 space-y-4 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-md">
          Create Account
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
          />
          {errors.name && (
            <p className="text-sm text-red-300 mt-1">Name is required</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">
            Phone
          </label>
          <input
            type="text"
            {...register("phone", { required: true })}
            placeholder="Your phone number"
            className="w-full px-4 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
          />
          {errors.phone && (
            <p className="text-sm text-red-300 mt-1">Phone is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
          />
          {errors.email && (
            <p className="text-sm text-red-300 mt-1">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
          />
          {errors.password && (
            <p className="text-sm text-red-300 mt-1">Password is required</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Repeat your password"
            className="w-full px-4 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffa100]"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-300 mt-1">
              Please confirm your password
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#ffa100] hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg"
        >
          Sign Up
        </button>
      </form>
       </div>
    </section>
  );
}
