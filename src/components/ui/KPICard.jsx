export default function KPICard({ label, value, change, up, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:shadow-slate-100 transition-all">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">{label}</p>
      <p className="text-2xl font-bold text-slate-800 mb-2">{value}</p>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
          {up ? "↑" : "↓"} {change}
        </span>
        <span className="text-xs text-slate-400">{sub}</span>
      </div>
    </div>
  );
}
