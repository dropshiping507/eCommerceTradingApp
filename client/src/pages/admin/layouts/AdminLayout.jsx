import { Outlet } from "react-router-dom";
import TopNavbar from "../../../components/admin/TopNavbar";
import SubNavbar from "../../../components/admin/SubNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../config/config";

const AdminLayout = () => {
  const [admin, setAdmin] = useState(null);
  const [recharges, setRecharges] = useState(null);
  const [withdrawals, setWithdrawals] = useState(null);

  // fetch logged in  admin
  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const { data } = await axios.get(`${baseUrl}/admin-auth/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin(data.admin);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch recharges
  const fetchRecharges = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;
      const { data } = await axios.get(`${baseUrl}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setRecharges(data.payments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch withdrawals
  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const { data } = await axios.get(
        `${baseUrl}/withdrawals/admin-withdrawals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setWithdrawals(data.withdrawals);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdmin();
    fetchRecharges();
    fetchWithdrawals();
  }, []);
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <TopNavbar
        admin={admin}
        recharges={recharges}
        withdrawals={withdrawals}
      />
      <SubNavbar admin={admin} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
