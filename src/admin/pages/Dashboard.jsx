import {
  Users,
  TrendingUp,
  FileText,
  AlertCircle,
  Ban,
  Crown,
  DollarSign,
} from "lucide-react";

import StatCard from "../components/StatCard";
import { useGetDashboardStats } from "../../hooks/dashboard.hook";
import "../style/dashboard.css"; // 👈 New CSS file

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetDashboardStats();

  if (isLoading) {
    return <div className="dashboard"><div className="text-white p-4">Loading dashboard...</div></div>;
  }

  if (isError) {
    return <div className="dashboard"><div className="text-red-500 p-4">Failed to load dashboard stats.</div></div>;
  }

  const stats = data?.data || data || {};

  const getTrendStr = (change = 0) => `${change > 0 ? "+" : ""}${change}% from last month`;

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">
          Key insights and performance metrics of your platform.
        </p>
      </header>

      {/* Primary Stats */}
      <div className="dashboard-primary-stats">
        <StatCard
          title="Total Users"
          value={(stats.totalUsers?.value || 0).toLocaleString()}
          icon={Users}
          trend={getTrendStr(stats.totalUsers?.change)}
          trendUp={(stats.totalUsers?.change || 0) >= 0}
        />

        <StatCard
          title="Active Users"
          value={(stats.activeUsers?.value || 0).toLocaleString()}
          icon={TrendingUp}
          trend={getTrendStr(stats.activeUsers?.change)}
          trendUp={(stats.activeUsers?.change || 0) >= 0}
        />

        <StatCard
          title="Total Polls"
          value={(stats.totalPolls?.value || 0).toLocaleString()}
          icon={FileText}
          trend={getTrendStr(stats.totalPolls?.change)}
          trendUp={(stats.totalPolls?.change || 0) >= 0}
        />

        <StatCard
          title="Reported Polls"
          value={(stats.reportedPolls?.value || 0).toLocaleString()}
          icon={AlertCircle}
          trend={getTrendStr(stats.reportedPolls?.change)}
          trendUp={(stats.reportedPolls?.change || 0) >= 0}
        />
      </div>

      {/* Secondary Stats */}
      <div className="dashboard-secondary-stats">
        <StatCard
          title="Banned Users"
          value={(stats.bannedUsers?.value || 0).toLocaleString()}
          icon={Ban}
        />

        <StatCard
          title="Premium Users"
          value={(stats.premiumUsers?.value || 0).toLocaleString()}
          icon={Crown}
          trend={getTrendStr(stats.premiumUsers?.change)}
          trendUp={(stats.premiumUsers?.change || 0) >= 0}
        />

        <StatCard
          title="Monthly Revenue"
          value={`₹${((stats.monthlyRevenue?.value || 0) / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend={getTrendStr(stats.monthlyRevenue?.change)}
          trendUp={(stats.monthlyRevenue?.change || 0) >= 0}
        />
      </div>
    </section>
  );
}
