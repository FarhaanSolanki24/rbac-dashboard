import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../store/authSlice";

const sections = ["General", "Security", "Notifications", "Billing", "API Keys"];

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const [active, setActive] = useState("General");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage workspace configuration and preferences</p>
      </div>

      <div className="flex gap-6">
        <div className="w-44 shrink-0 space-y-0.5">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all font-medium ${active === s ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4">
          {active === "General" && (
            <>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3">Workspace</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[["Workspace name", "Acme Inc."], ["Industry", "SaaS / Technology"], ["Timezone", "Asia/Kolkata (IST)"], ["Currency", "INR (₹)"]].map(([label, val]) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input defaultValue={val} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3">Your Profile</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-lg font-bold text-white">{user?.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                    <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full capitalize mt-1 inline-block">{user?.role}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[["Display name", user?.name], ["Email", user?.email]].map(([label, val]) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input defaultValue={val} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3 mb-4">Switch Role (Demo)</h3>
                <p className="text-xs text-slate-400 mb-3">Switch your role to explore permission-based views across the dashboard.</p>
                <div className="flex gap-2">
                  {["admin", "manager", "employee"].map((r) => (
                    <button
                      key={r}
                      onClick={() => dispatch(updateRole(r))}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${user?.role === r ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {active !== "General" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]">
              <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-600">{active} settings</p>
              <p className="text-xs text-slate-400">This section is a UI placeholder for the portfolio demo.</p>
            </div>
          )}

          {active === "General" && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${saved ? "bg-emerald-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}
              >
                {saved ? "✓ Saved" : "Save changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
