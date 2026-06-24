import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

const accounts = [
  { email: "admin@acme.io", password: "admin123", role: "admin", name: "Farhaan Solanki", avatar: "FS" },
  { email: "manager@acme.io", password: "manager123", role: "manager", name: "Priya Mehta", avatar: "PM" },
  { email: "employee@acme.io", password: "employee123", role: "employee", name: "Arjun Desai", avatar: "AD" },
];

const roleColors = {
  admin: { avatar: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700", border: "hover:border-indigo-200 hover:bg-indigo-50/50" },
  manager: { avatar: "bg-purple-500", badge: "bg-purple-100 text-purple-700", border: "hover:border-purple-200 hover:bg-purple-50/50" },
  employee: { avatar: "bg-cyan-500", badge: "bg-cyan-100 text-cyan-700", border: "hover:border-cyan-200 hover:bg-cyan-50/50" },
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const match = accounts.find((a) => a.email === email && a.password === password);
    if (!match) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    dispatch(login({ user: { id: match.email, name: match.name, role: match.role, avatar: match.avatar, email: match.email }, token: "jwt_mock_" + match.role }));
    navigate("/dashboard");
  }

  function quickLogin(account) {
    setEmail(account.email);
    setPassword(account.password);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Acme Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@acme.io"
                required
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-60 shadow-sm shadow-indigo-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-center mb-3">Demo Credentials</p>

            <div className="space-y-2 mb-5">
              {accounts.map((a) => {
                const c = roleColors[a.role];
                return (
                  <div key={a.role} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${c.avatar}`}>
                      {a.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${c.badge}`}>{a.role}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono truncate">{a.email} · {a.password}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 text-center mb-3">or click to autofill →</p>
            <div className="grid grid-cols-3 gap-2">
              {accounts.map((a) => {
                const c = roleColors[a.role];
                return (
                  <button
                    key={a.role}
                    onClick={() => quickLogin(a)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-100 transition-all ${c.border}`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${c.avatar}`}>
                      {a.avatar}
                    </span>
                    <span className="text-xs font-medium text-slate-600 capitalize">{a.role}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}