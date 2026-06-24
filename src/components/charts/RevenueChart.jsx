import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { revenueData } from "../../data/mockData";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-500 capitalize">{p.name}:</span>
          <span className="font-semibold text-slate-700">
            {p.name === "users" ? p.value : `₹${p.value.toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Revenue vs Target</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly performance — 2024</p>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-1 rounded-full">↑ 14.2% YoY</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={1.5} fill="url(#colorTarget)" strokeDasharray="4 4" name="target" />
          <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRevenue)" name="revenue" dot={false} activeDot={{ r: 4, fill: "#6366f1" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
