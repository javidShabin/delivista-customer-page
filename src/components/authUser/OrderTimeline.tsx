import { Clock } from "lucide-react";
import { STATUS_STEPS } from "../../constants/orderConstants";

// ---------- Order Timeline Component ----------
interface OrderTimelineProps {
  currentStatus: string;
}

export const OrderTimeline = ({ currentStatus }: OrderTimelineProps) => {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-500" /> Order Timeline
      </h3>
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
        <div className="space-y-6">
          {STATUS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const active = idx <= currentIndex;
            return (
              <div key={step.key} className="flex items-center gap-4 relative">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full z-10 ${
                    active ? "bg-orange-100" : "bg-slate-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? step.color : "text-slate-400"}`} />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      active ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    {active ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
