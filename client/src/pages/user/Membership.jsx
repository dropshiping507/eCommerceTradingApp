import { useNavigate, useParams } from "react-router-dom";
import {
  Crown,
  Wallet,
  ShoppingBag,
  Percent,
  ArrowUpCircle,
  Info,
} from "lucide-react";
import { membershipData } from "../../../config/membershipData";

function Membership() {
  const { vipLevel } = useParams();
  const navigate = useNavigate();
  const filteredMembership = membershipData.find(
    (data) => data.vip.toLocaleLowerCase() === vipLevel,
  );

  if (!membershipData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Membership Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <Crown className="text-yellow-600" size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {filteredMembership?.vip}
              </h1>

              <p className="text-gray-500 mt-1">
                Unlock higher commissions and more daily tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow p-5 border">
            <Wallet className="text-green-600 mb-3" size={28} />
            <p className="text-gray-500 text-sm">Required Investment</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {filteredMembership?.investment}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border">
            <ShoppingBag className="text-blue-600 mb-3" size={28} />

            <p className="text-gray-500 text-sm">Daily Orders</p>

            <div className="flex items-baseline flex-wrap gap-2">
              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {filteredMembership?.orders}
              </h2>

              <p className="text-gray-400 text-xs mt-1">
                (order count may vary based on user tasks)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border">
            <Percent className="text-yellow-600 mb-3" size={28} />
            <p className="text-gray-500 text-sm">Commission</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {filteredMembership?.commission}%
            </h2>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow border p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Membership Benefits
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>✓ Higher daily earnings</li>
            <li>✓ More available orders</li>
            <li>✓ Faster withdrawal processing</li>
            <li>✓ Priority customer support</li>
            <li>✓ Exclusive VIP rewards</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => navigate("/topup")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 duration-300 cursor-pointer"
          >
            <ArrowUpCircle size={20} />
            Upgrade Membership
          </button>

          <button
            onClick={() => navigate("/membershipDetails")}
            className="border bg-white hover:bg-gray-50 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 duration-300 cursor-pointer hover:scale-101 transition-all"
          >
            <Info size={20} />
            View Full Details
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-8">
          Upgrade your membership to receive higher commission rewards.
        </p>
      </div>
    </div>
  );
}

export default Membership;
