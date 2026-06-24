export const users = [
  { id: 1, name: "Farhaan Solanki", email: "farhaan@acme.io", role: "admin", status: "active", joined: "2024-01-12", lastSeen: "Today", avatar: "FS" },
  { id: 2, name: "Priya Mehta", email: "priya@acme.io", role: "manager", status: "active", joined: "2024-02-20", lastSeen: "Yesterday", avatar: "PM" },
  { id: 3, name: "Arjun Desai", email: "arjun@acme.io", role: "employee", status: "active", joined: "2024-03-05", lastSeen: "2 days ago", avatar: "AD" },
  { id: 4, name: "Sara Khan", email: "sara@acme.io", role: "employee", status: "inactive", joined: "2024-03-18", lastSeen: "1 week ago", avatar: "SK" },
  { id: 5, name: "Rohan Joshi", email: "rohan@acme.io", role: "manager", status: "active", joined: "2024-04-02", lastSeen: "Today", avatar: "RJ" },
  { id: 6, name: "Aisha Patel", email: "aisha@acme.io", role: "employee", status: "active", joined: "2024-04-15", lastSeen: "3 days ago", avatar: "AP" },
  { id: 7, name: "Dev Nair", email: "dev@acme.io", role: "employee", status: "inactive", joined: "2024-05-01", lastSeen: "2 weeks ago", avatar: "DN" },
  { id: 8, name: "Neha Sharma", email: "neha@acme.io", role: "manager", status: "active", joined: "2024-05-20", lastSeen: "Today", avatar: "NS" },
];

export const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000, users: 310 },
  { month: "Feb", revenue: 47500, target: 44000, users: 340 },
  { month: "Mar", revenue: 51000, target: 48000, users: 380 },
  { month: "Apr", revenue: 46800, target: 50000, users: 360 },
  { month: "May", revenue: 58200, target: 54000, users: 420 },
  { month: "Jun", revenue: 63400, target: 58000, users: 460 },
  { month: "Jul", revenue: 71000, target: 64000, users: 510 },
  { month: "Aug", revenue: 68500, target: 68000, users: 495 },
  { month: "Sep", revenue: 79200, target: 72000, users: 560 },
  { month: "Oct", revenue: 84100, target: 78000, users: 590 },
  { month: "Nov", revenue: 91600, target: 84000, users: 640 },
  { month: "Dec", revenue: 98400, target: 90000, users: 710 },
];

export const trafficSources = [
  { name: "Organic", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 19, color: "#06b6d4" },
  { name: "Social", value: 12, color: "#10b981" },
  { name: "Paid", value: 7, color: "#f59e0b" },
];

export const recentActivity = [
  { id: 1, user: "Priya Mehta", action: "Updated Q4 revenue report", time: "2 min ago", type: "edit" },
  { id: 2, user: "Rohan Joshi", action: "Added 3 new team members", time: "14 min ago", type: "add" },
  { id: 3, user: "Aisha Patel", action: "Exported user analytics CSV", time: "1 hr ago", type: "export" },
  { id: 4, user: "Farhaan Solanki", action: "Changed Sara Khan to inactive", time: "3 hr ago", type: "edit" },
  { id: 5, user: "Neha Sharma", action: "Reviewed monthly KPI targets", time: "5 hr ago", type: "view" },
];

export const kpiData = {
  admin: [
    { label: "Total Revenue", value: "₹8,01,200", change: "+14.2%", up: true, sub: "vs last year" },
    { label: "Active Users", value: "2,847", change: "+8.6%", up: true, sub: "this month" },
    { label: "Churn Rate", value: "3.2%", change: "-0.8%", up: false, sub: "improvement" },
    { label: "API Uptime", value: "99.94%", change: "+0.02%", up: true, sub: "last 30 days" },
  ],
  manager: [
    { label: "Team Revenue", value: "₹2,14,500", change: "+11.4%", up: true, sub: "vs last month" },
    { label: "Active Users", value: "2,847", change: "+8.6%", up: true, sub: "this month" },
    { label: "Tasks Done", value: "184", change: "+22%", up: true, sub: "this sprint" },
    { label: "Support Tickets", value: "12", change: "-5", up: false, sub: "open tickets" },
  ],
  employee: [
    { label: "My Tasks", value: "8", change: "3 due today", up: false, sub: "assigned" },
    { label: "Completed", value: "47", change: "+6", up: true, sub: "this month" },
    { label: "Hours Logged", value: "162h", change: "+4h", up: true, sub: "vs last month" },
    { label: "Performance", value: "94%", change: "+2%", up: true, sub: "this quarter" },
  ],
};
