import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/config";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${baseUrl}/users/change-password`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-xl w-full mx-auto bg-white shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-blue-600" />
          <h2 className="text-2xl font-bold">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.confirmNewPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmNewPassword: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 duration-300 cursor-pointer transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
