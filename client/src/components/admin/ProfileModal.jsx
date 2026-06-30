import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ProfileModal = ({ open, onClose, user }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  if (!open) return null;

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.length === 0 ? 0 : value.length;
    }

    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between bg-slate-800 border-b border-slate-700 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">User Profile</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition duration-300 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(form || {}).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="capitalize text-slate-400 text-xs mb-1">
                  {key}
                </label>

                <input
                  value={renderValue(value)}
                  readOnly
                  className="bg-slate-800 border border-slate-700 px-3 py-2 text-slate-300 text-sm outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-slate-800 border-t border-slate-700 px-5 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white transition duration-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
