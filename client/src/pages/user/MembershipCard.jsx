import { Crown, CheckCircle, ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MembershipCard = ({ membershipData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-7 bg-blue-500 rounded-full"></div>

        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
          Membership Grade
        </h2>
      </div>

      <div className="space-y-5">
        {membershipData.map((item, index) => (
          <div
            key={index}
            className="p-6 text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:scale-[1.01]"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              {/* LEFT SIDE */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Crown size={24} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{item.vip}</h3>

                    <p className="text-white/80 text-sm">Membership Grade</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm">
                  <p>
                    Required Investment:
                    <span className="font-semibold ml-2">
                      {item.investment}
                    </span>
                  </p>

                  <p>
                    Commission:
                    <span className="font-semibold ml-2">
                      {item.commission}%
                    </span>
                    <span className="mx-2">|</span>
                    <span>{item.orders} Orders</span>
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div>
                <button
                  disabled={item.active}
                  onClick={() => {
                    if (!item.active) {
                      navigate(`/membership/${item.vip.toLowerCase()}`);
                    }
                  }}
                  className={`px-6 py-3 font-semibold flex items-center gap-2 transition-all duration-300
    ${
      item.active
        ? "bg-[#2B3374] cursor-default"
        : "bg-white text-[#2B3374] hover:bg-gray-100 cursor-pointer"
    }`}
                >
                  {item.active ? (
                    <>
                      <CheckCircle size={18} />
                      Current Level
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle size={18} />
                      Upgrade Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipCard;
