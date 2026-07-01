import { useState } from "react";
import { Shield, Lock, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/config";
function LeaderAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double clicks
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`${baseUrl}/leader/login`, formData);
      if (data.success) {
        toast.success("Login successful 🎉");
        localStorage.setItem("leaderToken", data.token);
        setFormData({
          username: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/leader-dashboard");
        }, 500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.log("ERROR FULL:", err);
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-xl bg-slate-800 shadow-xl border border-slate-800  p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-500 p-3 rounded-full">
              <Shield className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white">Leader Access</h2>
          <p className="text-sm text-gray-300">
            Secure login for leadership panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-300">Username</label>
            <div className="flex items-center bg-white/10 rounded-lg px-3 mt-1">
              <User size={18} className="text-gray-300" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Enter username"
                className="w-full bg-transparent p-2 text-white outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="flex items-center bg-white/10 rounded-lg px-3 mt-1">
              <Lock size={18} className="text-gray-300" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
                className="w-full bg-transparent p-2 text-white outline-none"
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold duration-300 cursor-pointer transition"
          >
            {loading ? "Authenticating..." : "Login as Leader"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeaderAuth;
