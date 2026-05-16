import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  UserCheck,
  BarChart3,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/beneficiaries",
      label: "Beneficiaries",
      icon: Users,
      exact: false,
    },
    {
      path: "/admin/projects",
      label: "Projects",
      icon: FolderKanban,
      exact: false,
    },
    {
      path: "/admin/donations",
      label: "Donations",
      icon: DollarSign,
      exact: false,
    },
    {
      path: "/admin/volunteers",
      label: "Volunteers",
      icon: UserCheck,
      exact: false,
    },
    {
      path: "/admin/reports",
      label: "Reports",
      icon: BarChart3,
      exact: false,
    },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const Sidebar = () => (
    <div className="h-full bg-gray-900 text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400 mt-1">Hope Charity</p>
      </div>

      <nav className="px-3 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path, link.exact);
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden">
            <Sidebar />
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
