import { Search, Filter, Check, X, Eye } from "lucide-react";
import { mockVolunteers } from "../../data/mockData";
import { useState } from "react";

export function Volunteers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredVolunteers = mockVolunteers.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Volunteer Management
        </h1>
        <p className="text-gray-600">
          Review and manage volunteer applications
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search volunteers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {mockVolunteers.filter((v) => v.status === "approved").length}
          </div>
          <div className="text-sm text-gray-600">Approved Volunteers</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {mockVolunteers.filter((v) => v.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {mockVolunteers.length}
          </div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
      </div>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVolunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {volunteer.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                      <span>{volunteer.email}</span>
                      <span>•</span>
                      <span>{volunteer.phone}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      statusColors[volunteer.status]
                    }`}
                  >
                    {volunteer.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Address:</span>{" "}
                    <span className="text-gray-600">{volunteer.address}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Skills:</span>{" "}
                    <span className="text-gray-600">
                      {volunteer.skills.join(", ")}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      Availability:
                    </span>{" "}
                    <span className="text-gray-600">
                      {volunteer.availability}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      Support Type:
                    </span>{" "}
                    <span className="text-gray-600">
                      {volunteer.supportType}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      Submitted:
                    </span>{" "}
                    <span className="text-gray-600">
                      {new Date(volunteer.submittedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {volunteer.status === "pending" && (
                  <>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
