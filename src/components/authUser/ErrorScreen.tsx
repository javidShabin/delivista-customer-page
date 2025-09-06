import { XCircle } from "lucide-react";

// ---------- Error Screen Component ----------
interface ErrorScreenProps {
  onBack: () => void;
}

export const ErrorScreen = ({ onBack }: ErrorScreenProps) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
      <XCircle className="w-8 h-8 text-red-500" />
    </div>
    <h2 className="text-xl font-semibold text-slate-700 mb-2">Order Not Found</h2>
    <p className="text-slate-500 mb-6">
      We couldn't find the order you're looking for.
    </p>
    <button
      onClick={onBack}
      className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
    >
      Back to Orders
    </button>
  </div>
);
