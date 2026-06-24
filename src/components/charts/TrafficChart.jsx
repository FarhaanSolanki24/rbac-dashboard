import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { trafficSources } from "../../data/mockData";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700">{payload[0].name}</p>
      <p className="text-slate-500 mt-0.5">{payload[0].value}% of traffic</p>
    </div>
  );
}

export default function TrafficChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Traffic Sources</h3>
        <p className="text-xs text-slate-400 mt-0.5">Where users are coming from</p>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value" strokeWidth={0}>
              {trafficSources.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {trafficSources.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-slate-600">{s.name}</span>
              </div>
              <span className="text-xs font-semibold text-slate-700">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
