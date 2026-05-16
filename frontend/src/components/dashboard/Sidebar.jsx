import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import adminAvatar from "../../assets/family_images/c_img4.png";

const menuGroups = [
  {
    title: "",
    items: [{ icon: "home", label: "Dashboard", to: "/admin/dashboard" }],
  },
  {
    title: "Management",
    items: [
      { icon: "inventory_2", label: "Projects", to: "/admin/projects" },
      { icon: "volunteer_activism", label: "Donations", to: "/admin/donations" },
      { icon: "groups", label: "Volunteers", to: "/admin/volunteers" },
    ],
  },
  {
    title: "Communication",
    items: [
      { icon: "mail", label: "Messages", to: "/admin/messages" },
      { icon: "drafts", label: "Newsletter", to: "/admin/newsletter" },
    ],
  },
  {
    title: "Reports",
    items: [
      { icon: "analytics", label: "Reports & Analytics", to: "/admin/reports" }
    ],
  },
  {
    title: "Settings",
    items: [
      { icon: "settings", label: "Settings", to: "/admin/settings" }
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] bg-[#071B36] text-white lg:flex lg:flex-col">
      <div className="flex h-[98px] items-center gap-3 px-6">
        <img src={logo} alt="Hope and Homes Foundation" className="h-14 w-14 object-contain" />
        <div>
          <p className="text-lg font-extrabold leading-tight">Hope & Homes</p>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D0A733]">Foundation</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2">
        {menuGroups.map((group) => (
          <div key={group.title || "main"} className="mb-7">
            {group.title ? (
              <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-wide text-white/58">{group.title}</p>
            ) : null}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "flex h-12 items-center gap-4 rounded-md px-4 text-sm font-extrabold transition",
                      isActive ? "bg-[#D0A733]/25 text-[#F5C74D]" : "text-white/84 hover:bg-white/8",
                    ].join(" ")
                  }
                >
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-5 px-5 pb-7">
        <Link to="/" className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/38 text-sm font-extrabold text-white">
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          Visit Website
        </Link>
        <div className="flex items-center gap-3">
          <img src={adminAvatar} alt="Admin user" className="h-11 w-11 rounded-full object-cover" />
          <div>
            <p className="text-sm font-extrabold">Admin User</p>
            <p className="text-xs text-white/65">admin@hopehomes.org</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
