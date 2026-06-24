import UsersTable from "../components/tables/UsersTable";
import { usePermission } from "../context/PermissionContext";

export default function Users() {
  const { can } = usePermission();

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Users</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage your team members and their roles</p>
        </div>
        {can("edit_users") && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-sm shadow-indigo-200 cursor-pointer hover:bg-indigo-700 transition-all">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Invite user
          </div>
        )}
      </div>

      {!can("manage_roles") && (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-xs text-amber-700">You have read-only access to user roles. Contact an admin to make changes.</p>
        </div>
      )}

      <UsersTable />
    </div>
  );
}
