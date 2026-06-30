import { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import StatCard from "../../components/user/StatCard";
import axios from "axios";
import { baseUrl } from "../../../config/config";

function Statistics() {
  const [admin, setAdmin] = useState(null);
  const [recharges, setRecharges] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  // fetch admin
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

  // total orders count
  const totalOrders = admin?.teamMembers.reduce(
    (curr, acc) => curr + acc.totalOrders,
    0,
  );
  // total orders count
  const completedOrders = admin?.teamMembers.reduce(
    (curr, acc) => curr + acc.completedOrders,
    0,
  );

  // total recharges
  const totalRecharges = recharges.reduce((curr, acc) => curr + acc.amount, 0);

  // approved recharge count
  const approvedRechargeCount = recharges?.filter(
    (r) => r.status === "approved",
  ).length;

  // total withdrawals
  const totalWithdrawals = withdrawals.reduce(
    (curr, acc) => curr + acc.amount,
    0,
  );
  // approved withdrawal count
  const approvedWithdrawalCount = withdrawals?.filter(
    (w) => w.status === "approved",
  ).length;
  // total commission
  const totalCommission = admin?.teamMembers.reduce(
    (curr, acc) => curr + acc.commission,
    0,
  );
  // total user balance
  const totalUserBalance = admin?.teamMembers.reduce(
    (curr, acc) => curr + acc.balance,
    0,
  );
  const cards = [
    { title: "First-time Top-up Users", value: totalWithdrawals },
    { title: "Total Users", value: admin?.teamMembers.length },
    { title: "Total Orders", value: totalOrders },
    { title: "Completed Orders", value: completedOrders },
    { title: "User Recharge", value: "$" + totalRecharges },
    { title: "Users Recharged", value: approvedRechargeCount },
    { title: "User Withdrawals", value: "$" + totalWithdrawals },
    { title: "Withdrawal Requests", value: approvedWithdrawalCount },
    { title: "Order Commission", value: "$" + totalCommission?.toFixed(2) },
    { title: "Interest Treasure Transfer", value: "0 USDT" },
    { title: "Subordinate Commission", value: "0 USDT" },
    { title: "Total User Balance", value: "$" + totalUserBalance?.toFixed(2) },
  ];

  return (
    <div className="bg-slate-900 text-slate-300 space-y-4">
      {/* Header */}
      <div className="bg-slate-900 text-slate-300 shadow-lg border border-slate-700 overflow-hidden p-2">
        <PageHeader
          heading="Mall Statistics"
          subheading="  Overview of platform activity and financial performance."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, index) => (
          <StatCard key={index} title={card.title} value={card.value} />
        ))}
      </div>
    </div>
  );
}

export default Statistics;
