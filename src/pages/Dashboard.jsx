import { useSelector } from "react-redux";
import { kpiData } from "../data/mockData";
import KPICard from "../components/ui/KPICard";
import RevenueChart from "../components/charts/RevenueChart";
import TrafficChart from "../components/charts/TrafficChart";
import ActivityFeed from "../components/ui/ActivityFeed";

export default function Dashboard() {
  const user = useSelector((s) => s.auth.user);
  const role = user?.role || "employee";
  const kpis = kpiData[role] || kpiData.employee;

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{greet()}, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-sm text-slate-400 mt-0.5">Here's what's happening across your workspace today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => <KPICard key={k.label} {...k} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TrafficChart />
      </div>

      <ActivityFeed />
    </div>
  );
}
