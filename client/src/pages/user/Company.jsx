import { Building2 } from "lucide-react";

const Company = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Building2 size={30} className="text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">About Company</h1>

          <p className="text-gray-500 mt-2">
            Learn more about our platform and services.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-4 text-gray-700 leading-7">
          <p>
            Our platform provides users with access to online task and order
            processing services through a simple and efficient system.
          </p>

          <p>
            Users can participate in daily activities, complete assigned tasks,
            and track their progress directly from their accounts.
          </p>

          <p>
            We focus on providing a smooth experience, reliable support, and an
            easy-to-use interface for all members.
          </p>
        </div>

        {/* Footer Box */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-700 text-sm text-center">
            Thank you for being part of our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Company;
