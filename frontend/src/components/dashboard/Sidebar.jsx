import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

const menuGroups = [
  {
    title: "",
    items: [{ icon: "dashboard", label: "Dashboard", to: "/admin/dashboard" }],
  },
  {
    title: "Charity Management",
    items: [
      { icon: "campaign", label: "Support Cases", to: "/admin/projects" },
      { icon: "volunteer_activism", label: "Donations", to: "/admin/donations" },
      { icon: "groups", label: "Volunteers", to: "/admin/volunteers" },
      { icon: "published_with_changes", label: "Impact Updates", to: "/admin/impact-updates" },
    ],
  },
  {
    title: "Communication",
    items: [
      { icon: "mail", label: "Contact Messages", to: "/admin/messages" },
      { icon: "mark_email_read", label: "Newsletter", to: "/admin/newsletter" },
    ],
  },
  {
    title: "Website Content",
    items: [
      { icon: "dashboard_customize", label: "CMS", to: "/admin/cms" },
    ],
  },
  {
    title: "Administration",
    items: [
      { icon: "analytics", label: "Reports", to: "/admin/reports" },
      { icon: "settings", label: "Site Settings", to: "/admin/settings" },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const session = authService.getSession();
  const userName = session?.user?.name || session?.name || "Admin User";
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <button
        type="button"
        aria-label="Close dashboard menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#07142D]/55 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-[#071B36] text-white shadow-2xl transition-transform duration-300 lg:z-40 lg:w-[248px] lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[88px] items-center gap-3 border-b border-white/10 px-5">
          <img src={logo} alt="I Am Group Rwanda" className="h-14 w-14 rounded-lg bg-white object-contain p-1" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-extrabold leading-tight">I Am Group</p>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#D0A733]">Rwanda</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-lg text-white/75 hover:bg-white/10 lg:hidden">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {menuGroups.map((group) => (
            <div key={group.title || "main"} className="mb-6">
              {group.title ? (
                <p className="mb-2 px-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/45">{group.title}</p>
              ) : null}
              <div className="space-y-1">
                {group.items.map((item) => item.comingSoon ? (
                  <div key={item.label} className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold text-white/45" title="This module will be added during backend development">
                    <span className="material-symbols-outlined text-[21px]">{item.icon}</span>
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white/55">Soon</span>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) => [
                      "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-extrabold transition",
                      isActive ? "bg-[#D0A733]/20 text-[#F5C74D]" : "text-white/82 hover:bg-white/8 hover:text-white",
                    ].join(" ")}
                  >
                    <span className="material-symbols-outlined text-[21px]">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-5">
          <Link to="/" onClick={onClose} className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/25 text-sm font-extrabold text-white transition hover:bg-white/10">
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            Visit Website
          </Link>
          <div className="mt-4 flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D0A733] text-sm font-extrabold text-[#071B36]">{initials || "AU"}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">{userName}</p>
              <p className="truncate text-xs capitalize text-white/60">{session?.user?.role || session?.role || "Administrator"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
