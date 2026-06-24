import RevenueChart from "../components/charts/RevenueChart";
import TrafficChart from "../components/charts/TrafficChart";
import UserGrowthChart from "../components/charts/UserGrowthChart";
import { revenueData } from "../data/mockData";

const summary = [
  { label: "Total Revenue", value: "₹8,01,200", change: "+14.2%", up: true },
  { label: "Peak Month", value: "December", change: "₹98,400", up: true },
  { label: "Avg Monthly", value: "₹66,767", change: "+₹7,200 vs last yr", up: true },
  { label: "Target Hit Rate", value: "91.7%", change: "11/12 months", up: true },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Analytics</h1>
        <p className="text-sm text-slate-400 mt-0.5">Full-year performance breakdown — 2024</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{s.label}</p>
            <p className="text-xl font-bold text-slate-800 mb-1">{s.value}</p>
            <span className={`text-xs font-medium ${s.up ? "text-emerald-600" : "text-red-500"}`}>{s.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TrafficChart />
      </div>

      <UserGrowthChart />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Monthly Breakdown</h3>
          <p className="text-xs text-slate-400 mt-0.5">Revenue, target, and user data per month</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100">
                {["Month", "Revenue", "Target", "vs Target", "Users", "MoM Growth"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {revenueData.map((row, i) => {
                const diff = row.revenue - row.target;
                const prev = revenueData[i - 1];
                const mom = prev ? (((row.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : null;
                return (
                  <tr key={row.month} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-slate-700">{row.month}</td>
                    <td className="px-5 py-3 text-sm text-slate-700">₹{row.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-slate-500">₹{row.target.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${diff >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                        {diff >= 0 ? "+" : ""}₹{Math.abs(diff).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">{row.users}</td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-500">
                      {mom !== null ? <span className={mom >= 0 ? "text-emerald-600" : "text-red-500"}>{mom >= 0 ? "+" : ""}{mom}%</span> : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
