import { useEffect, useState } from "react";
import { CheckCircle, Truck, Utensils, Package, ArrowRight } from "lucide-react";

export default function OrderStatusPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [isVisible, setIsVisible] = useState(false);

  console.log(isVisible)
  

  const steps = [
    { label: "Order Confirmed", icon: <CheckCircle />, time: "2:30 PM" },
    { label: "Preparing", icon: <Utensils />, time: "2:35 PM" },
    { label: "Ready for Pickup", icon: <Package />, time: "2:45 PM" },
    { label: "On the Way", icon: <Truck />, time: "3:00 PM" },
    { label: "Delivered", icon: <CheckCircle />, time: "3:15 PM" },
  ];

  useEffect(() => {
    setIsVisible(true);
    setCurrentStep(3)
  }, []);

  const getStepColor = (idx: number) => {
    if (idx < currentStep) return "bg-green-500";
    if (idx === currentStep) return "bg-orange-500";
    return "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Order Status</h1>
          <p className="text-gray-500 text-lg">Track your order from kitchen to doorstep</p>
        </div>

        {/* Timeline */}
        <div className="relative ml-6 border-l-2 border-gray-200">
          {steps.map((step, idx) => {
            const color = getStepColor(idx);
            return (
              <div key={idx} className="mb-10 ml-4 relative opacity-0 animate-fadeIn" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: "forwards" }}>
                <div className={`absolute -left-6 w-5 h-5 rounded-full ${color} flex items-center justify-center text-white`}>
                  {idx <= currentStep && <CheckCircle size={12} />}
                </div>
                <div className="pl-2">
                  <h3 className={`font-semibold text-lg ${idx === currentStep ? "text-orange-600" : "text-gray-700"}`}>{step.label}</h3>
                  <p className="text-gray-400 text-sm">{step.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Details */}
        <div className="grid gap-6 mt-12 md:grid-cols-2">

          {/* Summary Card */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-semibold text-gray-800">30 mins</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total Amount</span>
              <span>₹499</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-xl mb-4">Delivery Address</h2>
            <p className="font-semibold">Shabin K</p>
            <p className="text-gray-600">123, MG Road</p>
            <p className="text-gray-600">Kochi, Kerala - 682001</p>
            <p className="mt-2 font-semibold text-gray-800">+91 98765 43210</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold flex items-center justify-center mx-auto hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 shadow-md">
            Contact Support <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
