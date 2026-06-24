import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { usePermission } from "../../context/PermissionContext";

export default function ProtectedRoute({ children, perm }) {
  const token = useSelector((s) => s.auth.token);
  const { can } = usePermission();

  if (!token) return <Navigate to="/login" replace />;
  if (perm && !can(perm)) return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-8">
      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <p className="text-slate-700 font-semibold">Access restricted</p>
      <p className="text-sm text-slate-400">You don't have permission to view this page.</p>
    </div>
  );

  return children;
}
