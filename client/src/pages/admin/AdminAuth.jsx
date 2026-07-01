import axios from "axios";
import {
  ShieldCheck,
  Phone,
  Lock,
  BadgeCheck,
  KeyRound,
  EyeOff,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/config";

function AdminAuth() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    referralCode: "",
    profileCode: "",
    password: "",
  });

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/admin-auth/login`,
        formData,
      );

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("adminToken", data.token);
        setFormData({
          phoneNumber: "",
          referralCode: "",
          profileCode: "",
          password: "",
        });
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-800 p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full mb-3">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-white">Admin Verification</h1>

          <p className="text-slate-400 text-sm mt-1 text-center">
            Verify your admin account before accessing the dashboard.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="text-slate-300 text-sm flex items-center gap-2">
              Phone Number
            </label>

            <div className="mt-2 flex items-center bg-slate-800 px-3 border border-slate-700 focus-within:border-slate-400 ">
              <Phone className="text-slate-400 w-5 h-5" />
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="03XXXXXXXXX"
                className="w-full bg-transparent outline-none px-3 py-2 text-white"
              />
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Registered admin phone number.
            </p>
          </div>

          {/* Invitation Code */}
          <div>
            <label className="text-slate-300 text-sm flex items-center gap-2">
              Invitation Code
            </label>

            <div className="mt-2 flex items-center bg-slate-800 px-3 border border-slate-700 focus-within:border-slate-400">
              <KeyRound className="text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="referralCode"
                required
                value={formData.referralCode}
                onChange={(e) =>
                  setFormData({ ...formData, referralCode: e.target.value })
                }
                placeholder="e.g. 309475"
                className="w-full bg-transparent outline-none px-3 py-2 text-white"
              />
            </div>

            <p className="text-xs text-slate-500 mt-1">
              6-digit invitation code assigned by the leader.
            </p>
          </div>

          {/* Profile Code */}
          <div>
            <label className="text-slate-300 text-sm flex items-center gap-2">
              Profile Code
            </label>

            <div className="mt-2 flex items-center bg-slate-800 px-3 border border-slate-700 focus-within:border-slate-400">
              <BadgeCheck className="text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="profileCode"
                required
                value={formData.profileCode}
                onChange={(e) =>
                  setFormData({ ...formData, profileCode: e.target.value })
                }
                placeholder="e.g. V0Q3O7"
                className="w-full bg-transparent outline-none px-3 py-2 text-white uppercase"
              />
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Unique admin identification code.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-300 text-sm flex items-center gap-2">
              Password
            </label>

            <div className="mt-2 flex items-center bg-slate-800 px-3 border border-slate-700 focus-within:border-slate-400">
              <Lock className="text-slate-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
                className="w-full bg-transparent outline-none px-3 py-2 text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Enter your admin account password.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 font-semibold duration-300 cursor-pointer"
          >
            Verify Admin
          </button>
        </form>

        <div className="mt-2 bg-slate-700 p-4">
          <p className="text-xs text-slate-400 text-center">
            Enter the phone number, invitation code, and profile code assigned
            by the Leader to authenticate your admin account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;
