import { useApp } from "../../context/AppContext";

export default function Banner() {
  const { user } = useApp();
  return (
    <div className="bg-[#2B3374] h-44 flex items-center justify-between px-8 md:px-12 shadow-lg border border-blue-400/20">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* AVATAR */}
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white flex items-center justify-center text-blue-600 rounded-full md:text-3xl font-bold shadow-md">
          {user?.username.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* USER INFO */}
        <div className="space-y-1">
          <p className="text-white md:text-lg font-semibold">
            {user?.username || "User"}
          </p>

          <p className="text-blue-100 text-sm">
            {user?.phoneNumber || "No phone"}
          </p>

          <div className="flex items-center gap-3 text-sm text-blue-100">
            <span className="px-2 py-0.5 bg-white/10 rounded-full">
              {user?.myInvitationCode || "No Code"}
            </span>

            <span className="px-2 py-0.5 bg-yellow-400/20 text-yellow-200 rounded-full font-medium">
              {user?.vipLevel || "VIP0"}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT QUOTE */}
      <div className="hidden md:block max-w-xs text-right">
        <h2 className="text-white font-semibold leading-snug text-sm md:text-base opacity-90">
          “The poor and the middle class work for money.
          <br />
          The rich make money work for them.”
        </h2>
      </div>
    </div>
  );
}
