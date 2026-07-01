import {
  ShieldCheck,
  AlertTriangle,
  Headphones,
  MessageCircle,
  Send,
} from "lucide-react";

const MembershipDetails = () => {
  const instructions = [
    "The recharge amount must exactly match the required investment amount.",
    "Payments with incorrect amounts may not be credited automatically.",
    "Please wait a few minutes after completing the payment.",
    "Contact customer support if your deposit or withdrawal is delayed.",
    "Only use the official payment methods provided by the platform.",
    "Please review all information carefully before submitting your payment.",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="text-blue-600" size={28} />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Payment Instructions
              </h1>

              <p className="text-gray-500 mt-1">
                Please read carefully before upgrading your membership.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left Side */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow border p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top-Up Guidelines
            </h2>

            <div className="space-y-3">
              {instructions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border rounded-lg p-3"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>

                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-xl shadow border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Headphones className="text-green-600" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">
                Customer Support
              </h2>
            </div>

            <p className="text-sm text-gray-500 mb-5">
              Need assistance with deposits, withdrawals, or membership
              upgrades?
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition"
              >
                <MessageCircle size={18} />
                WhatsApp Support
              </a>

              <a
                href="https://t.me/yourtelegramusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition"
              >
                <Send size={18} />
                Telegram Support
              </a>
            </div>

            <div className="mt-5 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Support is available for payment verification, withdrawals,
                account upgrades, and technical issues.
              </p>
            </div>

            <div className="mt-4 bg-gray-50 border rounded-lg p-4">
              <div className="text-sm text-gray-500">Response Time</div>

              <div className="font-semibold text-gray-800 mt-1">
                24/7 Online Support
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
          <AlertTriangle
            size={18}
            className="text-yellow-600 flex-shrink-0 mt-0.5"
          />

          <div>
            <h3 className="font-semibold text-yellow-700">Important Notice</h3>

            <p className="text-sm text-gray-600 mt-1">
              Payments that do not match the required amount may require manual
              verification and could delay account activation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;
