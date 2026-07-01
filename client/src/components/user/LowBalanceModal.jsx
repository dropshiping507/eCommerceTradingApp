import { XCircle, AlertTriangle } from "lucide-react";

const LowBalanceModal = ({ open, onClose, onTopUp }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg">
      <div className="w-full max-w-md bg-blue-500/20 border border-blue-400/30 rounded-2xl shadow-2xl p-6 text-white relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-blue-100 hover:scale-105 cursor-pointer transition"
        >
          <XCircle size={24} />
        </button>

        {/* ICON */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-red-500/20 p-3 rounded-full border border-red-400/30">
            <AlertTriangle className="text-red-400" size={40} />
          </div>

          <h2 className="text-xl font-bold text-white">Low Balance Alert</h2>

          <p className="text-sm text-blue-100 leading-relaxed">
            Your account balance is too low to continue this operation. Please
            top up your balance to proceed.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition duration-300 cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={onTopUp}
            className="w-1/2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold duration-300 cursor-pointer text-white"
          >
            Top Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowBalanceModal;
