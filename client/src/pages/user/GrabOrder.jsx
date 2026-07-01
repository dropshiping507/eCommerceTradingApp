import BalanceCard from "../../components/user/BalanceCard";
import Banner from "../../components/user/Banner";
import MembershipCard from "../../components/user/MembershipCard";
import StartOrderButton from "../../components/user/StartOrderButton";
import StatsSection from "../../components/user/StatsSection";
import WorkbenchRules from "../../components/user/WorkbenchRules";

export default function GrabOrder() {
  return (
    <div className="max-w-7xl w-full mx-auto p-2">
      <Banner />
      <div className="pt-4">
        <div className="grid md:grid-cols-2 gap-6">
          <MembershipCard />
          <BalanceCard />
        </div>
        <StatsSection />
        <StartOrderButton />
        <WorkbenchRules />
      </div>
    </div>
  );
}
