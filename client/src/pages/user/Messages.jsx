import {
  Bell,
  Wallet,
  Crown,
  Gift,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

function Messages() {
  const messages = [
    {
      id: 1,
      icon: <Wallet className="text-green-600" size={22} />,
      title: "Deposit Successful",
      desc: "Your deposit of 100 USDT has been credited successfully.",
      time: "2 mins ago",
      unread: true,
    },
    {
      id: 2,
      icon: <CheckCircle2 className="text-blue-600" size={22} />,
      title: "Withdrawal Approved",
      desc: "Your withdrawal request has been processed successfully.",
      time: "10 mins ago",
      unread: true,
    },
    {
      id: 3,
      icon: <Crown className="text-yellow-500" size={22} />,
      title: "VIP1 Activated",
      desc: "Congratulations! Your account has been upgraded to VIP1.",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      icon: <Gift className="text-pink-500" size={22} />,
      title: "Referral Reward",
      desc: "You received a referral commission from a new invited user.",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 5,
      icon: <ShieldAlert className="text-red-500" size={22} />,
      title: "Security Reminder",
      desc: "Please do not share your withdrawal password with anyone.",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg p-5 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Bell className="text-blue-600" />
                Messages
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Stay updated with your latest notifications
              </p>
            </div>

            <div className="bg-blue-100 text-blue-700 px-4 py-2 shadow-lg font-semibold">
              {messages.filter((msg) => msg.unread).length} New
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white shadow-lg p-4 hover:shadow-md transition"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  {msg.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-gray-800">
                        {msg.title}
                      </h2>

                      {msg.unread && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>

                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">{msg.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          No more messages
        </p>
      </div>
    </div>
  );
}

export default Messages;
