import { recentActivity } from "../../data/mockData";

const typeConfig = {
  edit: { bg: "bg-amber-100", text: "text-amber-600", icon: "✎" },
  add: { bg: "bg-emerald-100", text: "text-emerald-600", icon: "+" },
  export: { bg: "bg-blue-100", text: "text-blue-600", icon: "↓" },
  view: { bg: "bg-slate-100", text: "text-slate-500", icon: "◎" },
};

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Recent Activity</h3>
        <p className="text-xs text-slate-400 mt-0.5">Latest actions across your team</p>
      </div>
      <div className="space-y-3">
        {recentActivity.map((item) => {
          const t = typeConfig[item.type] || typeConfig.view;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${t.bg} ${t.text}`}>
                {t.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700">{item.user}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.action}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0 whitespace-nowrap">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
