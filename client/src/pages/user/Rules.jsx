import { ShieldCheck } from "lucide-react";

const Rules = () => {
  const sections = [
    {
      title: "Start Orders",
      points: [
        "Minimum balance for first 40 orders is 200 USDT",
        "Withdraw before resetting account",
      ],
    },
    {
      title: "Fund Withdrawal",
      points: [
        "Withdraw only after task completion",
        "Tasks cannot be exited midway",
      ],
    },
    {
      title: "Fund Security",
      points: ["Funds are securely stored", "Withdrawals are system automated"],
    },
    {
      title: "Account Security",
      points: ["Do not share passwords", "Use strong secure passwords"],
    },
    {
      title: "Work Tasks",
      points: ["Tasks are randomly assigned", "Tasks cannot be skipped"],
    },
    {
      title: "Advanced Tasks",
      points: [
        "Advanced tasks give higher profits",
        "Commissions may reach 10x",
      ],
    },
    {
      title: "Security Deposit",
      points: [
        "Verify deposit details carefully",
        "Wrong recharge is user's responsibility",
      ],
    },
    {
      title: "Merchants",
      points: [
        "Incomplete orders affect merchants",
        "Fund records may be reviewed",
      ],
    },
    {
      title: "Invitation",
      points: [
        "Invite users using referral codes",
        "Earn 8-15% referral commission",
      ],
    },
    {
      title: "Business Hours",
      points: ["Platform works 24/7", "Customer support: 08:00 - 16:00"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
            <ShieldCheck className="text-blue-600" size={28} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Terms & Conditions
            </h1>

            <p className="text-gray-500 mt-1">
              Platform rules and security information
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-blue-600" />
                </div>

                <h2 className="font-semibold text-gray-800">{section.title}</h2>
              </div>

              <ul className="space-y-2">
                {section.points.map((point, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;
