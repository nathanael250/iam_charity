import {
  Users,
  Home,
  DollarSign,
  UserCheck,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  mockBeneficiaries,
  mockProjects,
  mockDonations,
  mockVolunteers,
} from "../../data/mockData";
import { Link } from "react-router";

export function AdminDashboard() {
  const stats = [
    {
      label: "Total Beneficiaries",
      value: mockBeneficiaries.length,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      link: "/admin/beneficiaries",
    },
    {
      label: "Active Projects",
      value: mockProjects.filter((p) => p.status === "active").length,
      icon: Home,
      color: "bg-green-100 text-green-600",
      link: "/admin/projects",
    },
    {
      label: "Total Donations",
      value: `$${mockDonations
        .reduce((sum, d) => sum + (d.amount || d.value || 0), 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
      link: "/admin/donations",
    },
    {
      label: "Pending Volunteers",
      value: mockVolunteers.filter((v) => v.status === "pending").length,
      icon: UserCheck,
      color: "bg-purple-100 text-purple-600",
      link: "/admin/volunteers",
    },
  ];

  const recentActivity = [
    {
      type: "donation",
      message: "New $1,000 donation received",
      time: "2 hours ago",
    },
    {
      type: "volunteer",
      message: "New volunteer application from John Smith",
      time: "5 hours ago",
    },
    {
      type: "project",
      message: "Project 'Ahmed Family Home' reached 50% funding",
      time: "1 day ago",
    },
    {
      type: "beneficiary",
      message: "New beneficiary verified: Hassan Family",
      time: "2 days ago",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to Hope Charity Admin Panel. Here's an overview of your
          charity operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/beneficiaries"
              className="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">
                Add New Beneficiary
              </div>
              <div className="text-sm text-gray-600">
                Register a new family in need
              </div>
            </Link>
            <Link
              to="/admin/projects"
              className="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">
                Create New Project
              </div>
              <div className="text-sm text-gray-600">
                Start a new support project
              </div>
            </Link>
            <Link
              to="/admin/volunteers"
              className="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">
                Review Volunteer Applications
              </div>
              <div className="text-sm text-gray-600">
                {mockVolunteers.filter((v) => v.status === "pending").length}{" "}
                pending applications
              </div>
            </Link>
            <Link
              to="/admin/reports"
              className="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">
                Generate Reports
              </div>
              <div className="text-sm text-gray-600">
                View analytics and insights
              </div>
            </Link>
          </div>
        </div>

        {/* Active Projects Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Active Projects
            </h2>
            <Link
              to="/admin/projects"
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {mockProjects
              .filter((p) => p.status === "active")
              .slice(0, 3)
              .map((project) => {
                const progress =
                  (project.currentAmount / project.targetAmount) * 100;
                return (
                  <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="font-medium text-gray-900 mb-2">
                      {project.title}
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Alerts & Notifications
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-900">
                  Pending Volunteer Reviews
                </div>
                <div className="text-xs text-yellow-700 mt-1">
                  You have{" "}
                  {mockVolunteers.filter((v) => v.status === "pending").length}{" "}
                  volunteer applications awaiting review
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-blue-900">
                  Project Updates Needed
                </div>
                <div className="text-xs text-blue-700 mt-1">
                  2 active projects haven't been updated in 7 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
