import { useParams, Link } from "react-router";
import {
  Home,
  MapPin,
  Calendar,
  ArrowLeft,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { mockProjects } from "../../data/mockData";

export function ProjectDetail() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-red-600 hover:text-red-700">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const progress = (project.currentAmount / project.targetAmount) * 100;
  const remaining = project.targetAmount - project.currentAmount;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Project Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-6">
                  <Home className="w-32 h-32 text-gray-400" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {project.beneficiaryName}
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Story
                </h2>
                <p className="text-gray-600 leading-relaxed">{project.story}</p>
              </div>

              {/* Needed Materials */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  What We Need
                </h2>
                <ul className="space-y-2">
                  {project.neededMaterials.map((material, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Updates */}
              {project.updates.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Project Updates
                  </h2>
                  <div className="space-y-4">
                    {project.updates.map((update, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-600"
                      >
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(update.date).toLocaleDateString()}
                        </div>
                        <p className="text-gray-700">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ${project.currentAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      raised of ${project.targetAmount.toLocaleString()} goal
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div
                        className="bg-red-600 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      ${remaining.toLocaleString()} remaining
                    </div>
                  </div>

                  <Link
                    to="/donate"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors mb-3"
                  >
                    <Heart className="w-5 h-5" />
                    Support This Project
                  </Link>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Project Status
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {project.status.replace("-", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Family Size:</span>
                        <span className="font-medium text-gray-900">
                          {mockProjects.find((p) => p.id === project.id)
                            ?.beneficiaryName || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-900">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How It Works
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your donation goes directly to this project. Our team
                    manages all purchases, construction, and delivery to ensure
                    transparency and accountability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
