import { useState, useRef, useEffect } from "react";
import {
  Users,
  Wallet,
  ArrowDownCircle,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { toast } from "react-toastify";

function TopNavbar({ admin, recharges, withdrawals }) {
  const pendingRecharges = recharges?.filter((r) => r.status === "pending");
  const pendingWithdrawals = withdrawals?.filter((w) => w.status === "pending");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // admins logout
  const handleAdminLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.put(
        `${baseUrl}/admins/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      if (data.success) {
        localStorage.removeItem("adminToken");
        toast.success(data.message);
        navigate("/admin-auth", { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const isOnlineMembers = admin?.teamMembers.filter(
    (members) => members.isOnline === true,
  );

  return (
    <header className="bg-slate-900 text-slate-300 sticky top-0 z-50">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-700 rounded-xl flex items-center justify-center font-bold shadow cursor-pointer transition duration-300 hover:scale-105">
            M
          </div>

          <div className="leading-tight">
            <h2 className="font-bold text-lg">MercadoLibre</h2>
            <p className="text-xs text-cyan-100">Admin Dashboard</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Time */}
          <div className="hidden xl:flex items-center text-xs bg-slate-900/60 border border-slate-700 px-3 py-1 backdrop-blur text-slate-300 rounded-md">
            {currentTime.toLocaleString()}
          </div>

          {/* Online Users */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 transition px-3 py-1 rounded-md cursor-pointer">
            <Users size={16} className="text-sky-400" />
            <span className="font-semibold text-slate-100">
              {isOnlineMembers?.length || 0}
            </span>
            <span className="hidden md:block text-sm text-slate-400">
              Online
            </span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Topups */}
          <button
            onClick={() => navigate("/admin/topups")}
            className="relative flex items-center gap-2 px-3 py-2 rounded-md transition duration-300 cursor-pointer bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Wallet size={17} className="text-amber-400" />
            <span className="hidden md:block">Top Ups</span>

            <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-semibold">
              {pendingRecharges?.length || 0}
            </span>
          </button>

          {/* Withdrawals */}
          <button
            onClick={() => navigate("/admin/withdrawals")}
            className="relative flex items-center gap-2 px-3 py-2 rounded-md transition duration-300 cursor-pointer bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <ArrowDownCircle size={17} className="text-rose-400" />
            <span className="hidden md:block">Withdrawals</span>

            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-semibold">
              {pendingWithdrawals?.length || 0}
            </span>
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 px-3 py-2 duration-300 cursor-pointer"
            >
              <User size={17} />

              <span className="hidden md:block font-medium">
                {admin?.profileCode || "Admin"}
              </span>

              {profileOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-50 animate-fade-in">
                {/* Header */}
                <div className="p-4 border-b border-slate-700">
                  <h4 className="font-semibold text-slate-200 text-sm">
                    Invitation: {admin?.referralCode}
                  </h4>

                  <p className="text-xs text-slate-400 mt-2">
                    {admin?.username}
                  </p>

                  <p className="text-xs text-slate-500">Role: {admin?.role}</p>
                </div>

                {/* Profile Button */}
                <button
                  onClick={() => {
                    navigate("/admin/admin-profile");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 transition duration-300 cursor-pointer"
                >
                  <User size={16} />
                  My Profile
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleAdminLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition duration-300 cursor-pointer border-t border-slate-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
