import { Globe, Headphones, MessageCircle, Send } from "lucide-react";

function ContactSupport() {
  const contacts = [
    {
      title: "WhatsApp",
      icon: <MessageCircle size={24} className="text-green-600" />,
      link: "https://wa.me/923001234567",
      desc: "Fast chat support",
    },
    {
      title: "Telegram",
      icon: <Send size={24} className="text-blue-600" />,
      link: "https://t.me/yourtelegramusername",
      desc: "Instant messaging",
    },
    {
      title: "Facebook",
      icon: <Globe size={24} className="text-sky-600" />,
      link: "https://facebook.com/yourpage",
      desc: "Official page support",
    },
    {
      title: "Email",
      icon: <Headphones size={24} className="text-purple-600" />,
      link: "mailto:support@example.com",
      desc: "Formal support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Headphones size={40} className="mx-auto text-blue-600 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Contact Support</h1>
          <p className="text-gray-500 mt-2">Get help from our support team</p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {contacts.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="border rounded-lg p-5 text-center hover:shadow-md hover:border-blue-500 transition"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>

              <h2 className="font-semibold text-gray-800">{item.title}</h2>

              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Support available 24/7
        </div>
      </div>
    </div>
  );
}

export default ContactSupport;
