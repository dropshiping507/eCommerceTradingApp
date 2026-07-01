import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../../config/config";

export const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [injections, setInjections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supports, setSupports] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`${baseUrl}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInjections(data.injections);
        setOrders(data.orders);
        setRecharges(data.recharges);
        setUser(data.user);
        setWithdrawals(data.withdrawals);
        setSupports(data.supports);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        orders,
        setOrders,
        payments,
        setPayments,
        withdrawals,
        setWithdrawals,
        recharges,
        setRecharges,
        injections,
        setInjections,
        loading,
        setLoading,
        supports,
        setSupports,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
