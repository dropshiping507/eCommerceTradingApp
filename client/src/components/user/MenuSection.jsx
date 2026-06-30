import { Building2, ClipboardList, Clock3, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuSection = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Company", icon: Building2, path: "/company" },
    { label: "Rule", icon: Clock3, path: "/rules" },
    { label: "Agent", icon: UserRound, path: "/agent" },
    { label: "Qualification", icon: ClipboardList, path: "/qualification" },
  ];

  return (
    <div className="mt-6 bg-gray-200 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center p-4 shadow-lg cursor-pointer hover:bg-gray-50 transition duration-300"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-lg">
                <Icon size={26} />
              </div>

              <p className="mt-2 text-sm font-medium text-gray-700">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuSection;
