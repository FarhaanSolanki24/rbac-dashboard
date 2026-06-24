import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRole, updateUserStatus, deleteUser } from "../../store/usersSlice";
import { usePermission } from "../../context/PermissionContext";

const roleColors = {
  admin: "bg-indigo-100 text-indigo-700",
  manager: "bg-purple-100 text-purple-700",
  employee: "bg-cyan-100 text-cyan-700",
};

const avatarColors = {
  admin: "bg-indigo-500",
  manager: "bg-purple-500",
  employee: "bg-cyan-500",
};

export default function UsersTable() {
  const dispatch = useDispatch();
  const { list: users, status } = useSelector((s) => s.users);
  const { can } = usePermission();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [dispatch, status]);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  if (status === "loading") {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-8 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-sm">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Team Members</h3>
          <p className="text-xs text-slate-400 mt-0.5">{users.length} total users</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 w-44 transition-all"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 outline-none focus:border-indigo-300 bg-white cursor-pointer"
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">User</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Role</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Last Seen</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Joined</th>
              {can("edit_users") && (
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${avatarColors[user.role]}`}>
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {can("manage_roles") ? (
                    <select
                      value={user.role}
                      onChange={(e) => dispatch(updateUserRole({ userId: user.id, role: e.target.value }))}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer capitalize ${roleColors[user.role]}`}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  ) : (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleColors[user.role]}`}>{user.role}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${user.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{user.lastSeen}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{user.joined}</td>
                {can("edit_users") && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => dispatch(updateUserStatus({ userId: user.id, status: user.status === "active" ? "inactive" : "active" }))}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      {can("delete_users") && (
                        <button
                          onClick={() => dispatch(deleteUser(user.id))}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-400">No users match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
