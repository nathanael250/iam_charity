import { Link } from "react-router";
import { Home, Filter } from "lucide-react";
import { mockProjects } from "../../data/mockData";
import { useState } from "react";

export function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all"
      ? mockProjects
      : mockProjects.filter((p) => p.status === filter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Support Projects
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Browse our active projects and help families in need build better
            futures
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="flex gap-2">
              {[
                { value: "all", label: "All Projects" },
                { value: "active", label: "Active" },
                { value: "funded", label: "Funded" },
                { value: "in-progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                    filter === option.value
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const progress =
                  (project.currentAmount / project.targetAmount) * 100;
                const statusColors = {
                  pending: "bg-yellow-100 text-yellow-800",
                  active: "bg-blue-100 text-blue-800",
                  funded: "bg-green-100 text-green-800",
                  "in-progress": "bg-purple-100 text-purple-800",
                  completed: "bg-gray-100 text-gray-800",
                };

                return (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Home className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 flex-1">
                          {project.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            statusColors[project.status]
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {project.story}
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-gray-900">
                            ${project.currentAmount.toLocaleString()} / $
                            {project.targetAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{project.location}</span>
                        <span className="text-red-600 font-medium">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
