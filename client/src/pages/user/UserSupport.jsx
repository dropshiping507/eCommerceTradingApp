import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/config";
import { useApp } from "../../context/AppContext";

const UserSupport = () => {
  const { user, supports, setSupports } = useApp();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${baseUrl}/support/create`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success("Message sent");
        setSupports([data.support]);
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[80vh] flex flex-col items-center px-4">
      {/* HEADER */}
      <div className="w-full max-w-2xl mb-4">
        <h1 className="text-2xl font-bold">Customer Support</h1>
        <p className="text-sm text-slate-500">Chat with our support team</p>
      </div>

      {/* CHAT WRAPPER */}
      <div className="w-full max-w-2xl flex flex-col flex-1 bg-white shadow overflow-hidden">
        {/* MESSAGES (ONLY THIS SCROLLS) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {supports?.[0]?.messages?.length ? (
            supports[0].messages.map((msg) => {
              const isLeader = msg.sender === "leader";
              return (
                <div
                  key={msg._id}
                  className={`flex items-end gap-2 ${
                    isLeader ? "justify-start" : "justify-end"
                  }`}
                >
                  {isLeader && (
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs text-white">
                      L
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                      isLeader
                        ? "bg-green-600 text-white rounded-bl-none"
                        : "bg-slate-200 text-slate-800 rounded-br-none"
                    }`}
                  >
                    <p className="wrap-break-words">{msg.message}</p>

                    <p className="text-[10px] mt-1 opacity-70">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {/* User Avatar */}
                  {!isLeader && (
                    <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-slate-400">No messages yet</p>
          )}
        </div>
      </div>

      {/* INPUT */}
      <div className="w-full max-w-2xl mt-4 flex gap-2">
        <textarea
          className="flex-1 border border-slate-300 p-2 resize-none outline-none"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-800 text-white px-6 hover:bg-slate-700 duration-300 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserSupport;
