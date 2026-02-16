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
import { mockStats } from "../data/mockData";
import "../style/dashboard.css"; // 👈 New CSS file

export default function AdminDashboard() {
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
          value={mockStats.totalUsers.toLocaleString()}
          icon={Users}
          trend="+12.5% from last month"
          trendUp={true}
        />

        <StatCard
          title="Active Users"
          value={mockStats.activeUsers.toLocaleString()}
          icon={TrendingUp}
          trend="+8.3% from last month"
          trendUp={true}
        />

        <StatCard
          title="Total Polls"
          value={mockStats.totalPolls.toLocaleString()}
          icon={FileText}
          trend="+15.2% from last month"
          trendUp={true}
        />

        <StatCard
          title="Reported Polls"
          value={mockStats.reportedPolls}
          icon={AlertCircle}
          trend="-5.1% from last month"
          trendUp={false}
        />
      </div>

      {/* Secondary Stats */}
      <div className="dashboard-secondary-stats">
        <StatCard
          title="Banned Users"
          value={mockStats.bannedUsers}
          icon={Ban}
        />

        <StatCard
          title="Premium Users"
          value={mockStats.premiumUsers.toLocaleString()}
          icon={Crown}
          trend="+24.6% from last month"
          trendUp={true}
        />

        <StatCard
          title="Monthly Revenue"
          value={`₹${(mockStats.monthlyRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend="+18.9% from last month"
          trendUp={true}
        />
      </div>
    </section>
  );
}
