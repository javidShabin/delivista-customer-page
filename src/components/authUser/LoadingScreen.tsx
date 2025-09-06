// ---------- Loading Screen Component ----------
export const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-6"></div>
    <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Order</h2>
    <p className="text-slate-500">Fetching your order details...</p>
  </div>
);
