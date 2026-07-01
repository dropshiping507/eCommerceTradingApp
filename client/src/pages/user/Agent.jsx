import { useNavigate } from "react-router-dom";

const Agent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          Sincerely recruiting partners, please contact our customer
          representative for details!
        </h1>

        <button
          onClick={() => navigate("/contactSupport")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 cursor-pointer"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Agent;
