import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const permissions = {
  admin: ["view_dashboard", "view_users", "edit_users", "delete_users", "view_analytics", "view_settings", "manage_roles"],
  manager: ["view_dashboard", "view_users", "edit_users", "view_analytics"],
  employee: ["view_dashboard", "view_analytics"],
};

const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const user = useSelector((s) => s.auth.user);
  const role = user?.role || "employee";
  const can = (perm) => permissions[role]?.includes(perm) ?? false;

  return (
    <PermissionContext.Provider value={{ can, role, permissions: permissions[role] || [] }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  return useContext(PermissionContext);
}
