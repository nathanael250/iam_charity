import {
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Home,
  Calendar,
} from "lucide-react";
import {
  mockBeneficiaries,
  mockProjects,
  mockDonations,
  mockVolunteers,
} from "../../data/mockData";

export function Reports() {
  const totalDonations = mockDonations.reduce(
    (sum, d) => sum + (d.amount || d.value || 0),
    0
  );
  const totalPeopleHelped = mockBeneficiaries.reduce(
    (sum, b) => sum + b.familySize,
    0
  );
  const completedProjects = mockProjects.filter(
    (p) => p.status === "completed"
  ).length;

  const monthlyData = [
    { month: "Jan", donations: 12500, projects: 2, volunteers: 5 },
    { month: "Feb", donations: 18000, projects: 3, volunteers: 8 },
    { month: "Mar", donations: 15500, projects: 2, volunteers: 6 },
    { month: "Apr", donations: 22000, projects: 4, volunteers: 10 },
    { month: "May", donations: 27500, projects: 3, volunteers: 7 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Track your charity's impact and performance
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Download className="w-5 h-5" />
          Download Full Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ${totalDonations.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Donations Received</div>
          <div className="text-xs text-green-600 mt-2">
            +15% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {totalPeopleHelped}
          </div>
          <div className="text-sm text-gray-600">People Helped</div>
          <div className="text-xs text-green-600 mt-2">
            +8 from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {completedProjects}
          </div>
          <div className="text-sm text-gray-600">Completed Projects</div>
          <div className="text-xs text-green-600 mt-2">100% success rate</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {mockVolunteers.filter((v) => v.status === "approved").length}
          </div>
          <div className="text-sm text-gray-600">Active Volunteers</div>
          <div className="text-xs text-green-600 mt-2">
            +3 from last month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Monthly Donations Trend
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const maxDonation = Math.max(...monthlyData.map((d) => d.donations));
              const width = (data.donations / maxDonation) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-medium text-gray-700">
                      {data.month}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${data.donations.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full transition-all"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects by Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Projects by Status
          </h2>
          <div className="space-y-4">
            {[
              {
                status: "Active",
                count: mockProjects.filter((p) => p.status === "active").length,
                color: "bg-blue-600",
              },
              {
                status: "Funded",
                count: mockProjects.filter((p) => p.status === "funded").length,
                color: "bg-green-600",
              },
              {
                status: "In Progress",
                count: mockProjects.filter((p) => p.status === "in-progress")
                  .length,
                color: "bg-purple-600",
              },
              {
                status: "Completed",
                count: mockProjects.filter((p) => p.status === "completed")
                  .length,
                color: "bg-gray-600",
              },
              {
                status: "Pending",
                count: mockProjects.filter((p) => p.status === "pending").length,
                color: "bg-yellow-600",
              },
            ].map((item, index) => {
              const percentage = (item.count / mockProjects.length) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-medium text-gray-700">
                      {item.status}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {item.count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Impact Summary (All Time)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {mockBeneficiaries.length}
            </div>
            <div className="text-sm text-gray-600">Families Registered</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {mockProjects.length}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {mockDonations.length}
            </div>
            <div className="text-sm text-gray-600">Total Donations</div>
          </div>
        </div>
      </div>

      {/* Donation Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Donation Types Breakdown
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {["money", "materials", "food", "clothes", "construction"].map(
            (type) => {
              const count = mockDonations.filter((d) => d.type === type).length;
              const total = mockDonations.filter((d) => d.type === type).reduce(
                (sum, d) => sum + (d.amount || d.value || 0),
                0
              );
              return (
                <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {count}
                  </div>
                  <div className="text-xs text-gray-600 capitalize mb-2">
                    {type}
                  </div>
                  <div className="text-sm font-semibold text-red-600">
                    ${total.toLocaleString()}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
