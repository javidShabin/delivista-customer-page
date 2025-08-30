import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center flex flex-col items-center">
        <XCircle className="text-red-500 w-20 h-20 mb-6 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your payment was not completed. You can try again or return to the home page.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg"
        >
          Back to Home
        </Link>
        <div className="mt-6 text-gray-500 text-sm">
          No charges were made. You can attempt the payment again anytime.
        </div>
      </div>
    </div>
  );
};
