import axios from "axios";
import { useEffect, useState } from "react";
import LowBalanceModal from "./LowBalanceModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PenguinLoader from "./PenguinLoader";
import { baseUrl } from "../../../config/config";
import { useApp } from "../../context/AppContext";
export default function StartOrderButton() {
  const { user, setUser, injections } = useApp();
  const userBalance = user?.balance;
  const [commissionArray, setCommissionArray] = useState([]);
  const [productCommission, setProductCommission] = useState(null);
  const [cycleLocked, setCycleLocked] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [injectionModal, setInjectionModal] = useState(false);
  const [selectedInjection, setSelectedInjection] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lowBalanceModal, setLowBalanceModal] = useState(false);
  const [lockedProduct, setLockedProduct] = useState({});
  const [lastOrder, setLastOrder] = useState({});
  const [orderId, setOrderId] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (cycleLocked || user?.currentCycleOrders || !userBalance) return;

    const pool = userBalance * 0.125;
    const parts = Number(user.currentCycleOrders);

    const weights = Array.from({ length: parts }, () => Math.random());
    const sum = weights.reduce((a, b) => a + b, 0);

    const split = weights.map((w) => (w / sum) * pool);

    setCommissionArray(split);
    setCycleLocked(true);
  }, [userBalance, cycleLocked]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // handle start
  const handleStartOrder = async () => {
    if (user?.balance === 0) {
      toast.error("you account balance is insufficient");
      return;
    }
    setLoader(true);
    try {
      await delay(3000);

      const activeInjection = injections?.find(
        (i) => i.status?.toLowerCase().trim() === "pending",
      );

      const currentCycleOrders = Number(user?.currentCycleOrders || 0);

      // Lifetime limit reached
      if (currentCycleOrders === 0) {
        toast.error("You have reached the maximum order limit");
        return;
      }

      // Injection required
      if (activeInjection) {
        const limit = Number(activeInjection?.injectionOrder || 0);
        if (currentCycleOrders === limit) {
          setInjectionModal(true);

          try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${baseUrl}/orders/last`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setLastOrder(data.lastOrder);
          } catch (error) {
            console.log(error);
          }

          setSelectedInjection(activeInjection);
          toast.error(
            `Your account balance is not enough, there is a gap of $${activeInjection?.injectionCost}`,
          );
          return;
        }
      }

      // Create order
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      const newOrderId = `ORD-${randomProduct?.id}-${Date.now()}`;
      const randomCommission = commissionArray[currentOrderIndex] || 0;
      setProductCommission(randomCommission);

      const order = {
        id: newOrderId,
        productId: randomProduct?.id,
        title: randomProduct?.title,
        image: randomProduct?.thumbnail,
        price: randomProduct?.price,
        quantity: 1,
        totalAmount: randomProduct?.price,
        commission: randomCommission,
        createdAt: new Date().toISOString(),
      };

      setCurrentOrder(order);
      setSelectedProduct({ ...randomProduct, quantity: 1 });
      setOrderId(newOrderId);
      setModal(true);
      setCurrentOrderIndex((prev) => {
        const next = prev + 1;
        if (next >= commissionArray.length) {
          return 0; // reset cycle
        }

        return next;
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  // handle confirm order
  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/orders`, {
        userId: user?._id,
        title: currentOrder.title,
        productId: currentOrder?.productId,
        image: currentOrder.image,
        quantity: currentOrder.quantity,
        totalAmount: currentOrder.totalAmount,
        commission: currentOrder.commission,
        action: "confirm",
      });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setUser((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            completedOrders: data.user.completedOrders,
            currentCycleOrders: data.user.currentCycleOrders,
            commission: data.user.commission,
            balance: data.user.balance,
          },
        }));
      } else {
        toast.error(data.message);

        if (data.block) {
          setInjectionModal(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }

    setModal(false);
  };

  // handel cancel order
  const handleCancel = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/orders`, {
        userId: user?._id,
        title: currentOrder.title,
        productId: currentOrder?.productId,
        image: currentOrder.image,
        quantity: currentOrder.quantity,
        totalAmount: currentOrder.totalAmount,
        commission: currentOrder.commission,
        action: "cancel",
      });

      if (data.success) {
        toast.success(data.message);
        setUser((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            completedOrders: data.user.completedOrders,
            currentCycleOrders: data.user.currentCycleOrders,
            undone: data.user.undone,
          },
        }));
      } else {
        toast.error(data.message);

        if (data.block) {
          setInjectionModal(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }

    setModal(false);
  };

  useEffect(() => {
    if (!lastOrder?.productId) return;
    let cancelled = false;
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${lastOrder?.productId}`,
        );

        if (!cancelled) {
          setLockedProduct(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [lastOrder?.productId]);

  return (
    <>
      <LowBalanceModal
        open={lowBalanceModal}
        onClose={() => setLowBalanceModal(false)}
        onTopUp={() => {
          setLowBalanceModal(false);
          navigate("/topup"); // or your route
        }}
      />

      <div className="flex justify-center mt-12">
        <button
          onClick={handleStartOrder}
          className="bg-[#2B3374] hover:bg-[#111e97] text-white md:text-2xl font-medium px-24 py-5 rounded-full transition duration-300 cursor-pointer"
        >
          Start to Snap Up
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirm}
            className="bg-white shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-5">
              <h2 className="text-xl font-bold">Submit Order</h2>
              <p className="text-sm opacity-90">
                {new Date().toLocaleString()}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <img
                  src={selectedProduct?.thumbnail}
                  alt={selectedProduct?.title}
                  className="w-full h-20 md:w-56 md:h-56 rounded-xl object-center md:object-cover border border-gray-200"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800 uppercase leading-relaxed">
                    {selectedProduct?.title}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {selectedProduct?.brand}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedProduct?.description}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedProduct?.rating} rating
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedProduct?.shippingInformation}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedProduct?.stock} items in stock
                  </p>

                  <p className="text-sm text-gray-500">
                    Product ID: #{orderId}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProduct?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p>Quantity</p>
                  <span className="font-semibold">
                    {selectedProduct.quantity}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p>Total Order</p>
                  <span className="font-semibold text-blue-600">
                    USDT{" "}
                    {(
                      selectedProduct?.price * selectedProduct?.quantity
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p>Commission</p>
                  <span className="font-semibold text-green-600">
                    USDT {productCommission?.toFixed(2) || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p>Difference Amount</p>
                  <span className="font-semibold">$0.00</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 border border-gray-300 hover:bg-gray-100 duration-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer duration-300"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}

      {injectionModal && selectedInjection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white shadow-2xl w-full max-w-2xl overflow-hidden rounded-xl">
            {/* Header */}
            <div className="bg-blue-600 text-white p-5">
              <h2 className="text-xl font-bold">Submit Order</h2>
              <p className="text-sm opacity-90">
                {new Date().toLocaleString()}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="flex gap-4 items-start">
                <img
                  src={lockedProduct?.thumbnail}
                  alt={lockedProduct?.title}
                  className="w-full md:w-56 h-56 rounded-xl object-cover border border-gray-200"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800 uppercase leading-relaxed">
                    {lockedProduct?.title}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {lockedProduct?.brand}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {lockedProduct?.description}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {lockedProduct?.rating} rating
                  </p>
                  <p className="text-gray-600 text-sm">
                    {lockedProduct?.shippingInformation}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {lockedProduct?.stock} items in stock
                  </p>

                  <p className="text-sm text-gray-500">
                    category: {lockedProduct?.category}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {lockedProduct?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p>Quantity</p>
                  <span className="font-semibold">
                    {lockedProduct?.quantity || 1}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p>Total Order</p>
                  <span className="font-semibold text-blue-600">
                    $ {(lockedProduct?.price || 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p>Commission</p>
                  <span className="font-semibold text-green-600">
                    ${selectedInjection.fixedCommission.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p>Difference Amount</p>
                  <span className="font-semibold">
                    ${selectedInjection?.injectionCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* /* Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setInjectionModal(false)}
                className="flex-1 py-3 border border-gray-300 hover:bg-gray-100 duration-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  toast.error(
                    `your account balance is not enough, there is a gap ${selectedInjection?.injectionCost}`,
                  );
                  setInjectionModal(false);
                }}
                className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {loader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white/60 backdrop-blur-md px-8 py-6 shadow-lg w-96">
            <PenguinLoader />
          </div>
        </div>
      )}
    </>
  );
}
