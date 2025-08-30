import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center flex flex-col items-center">
        <CheckCircle className="text-green-500 w-20 h-20 mb-6 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg"
        >
          Back to Home
        </Link>
        <div className="mt-6 text-gray-500 text-sm">
          We’ve sent a confirmation email with your order details.
        </div>
      </div>
    </div>
  );
};
