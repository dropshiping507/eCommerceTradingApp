import { useEffect, useState, useRef } from "react";
import LeaderCard from "./components/LeaderCard";
import StatsCard from "./components/StatsCard";
import AdminTable from "./components/AdminTable";
import Header from "./components/Header";
import AddAdminModal from "./components/AddAdminModal";
import axios from "axios";
import { baseUrl } from "../../../config/config";
function LeaderDashboard() {
  const [adminModal, setAdminModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const mountedRef = useRef(true);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/admins/get-all-admins`);
      if (mountedRef.current && data.success) {
        setAdmins(data.admins);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/users/all-users`);
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchAdmins();
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return (
    <div className="p-2 bg-slate-900  text-slate-300 min-h-screen">
      {/* Header */}
      <Header
        adminModal={adminModal}
        setAddAdminModal={setAdminModal}
        users={users}
        loading={loading}
      />

      {/* Leader Card */}
      <LeaderCard />

      {/* Stats */}
      <StatsCard admins={admins} users={users} />

      {/* Admin Table */}
      <AdminTable admins={admins} fetchAdmins={fetchAdmins} loading={loading} />

      {adminModal && (
        <AddAdminModal
          setAdminModal={setAdminModal}
          fetchAdmins={fetchAdmins}
          loading={loading}
        />
      )}
    </div>
  );
}
export default LeaderDashboard;
