import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { PermissionProvider } from "./context/PermissionContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Provider store={store}>
      <PermissionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              element={
                <ProtectedRoute perm="view_dashboard">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={
                <ProtectedRoute perm="view_analytics"><Analytics /></ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute perm="view_users"><Users /></ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute perm="view_settings"><Settings /></ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </PermissionProvider>
    </Provider>
  );
}
