import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects", activeOn: ["/projects", "/needs"] },
  { label: "Activities", to: "/activities" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Impact Stories", to: "/impact-stories" },
  { label: "Contact", to: "/contact" },
];

const TopNav = () => {
  const location = useLocation();

  const linkClass = (item) => {
    const activePaths = item.activeOn ?? [item.to];
    const isActive = activePaths.some((path) =>
      path === "/" ? location.pathname === "/" : location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
    return [
      "relative py-7 text-sm font-extrabold transition-colors",
      isActive ? "text-[#C9A84C]" : "text-[#17142F] hover:text-[#C9A84C]",
      "after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#C9A84C] after:transition-all",
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full",
    ].join(" ");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#EEE9DA] bg-white shadow-[0_4px_18px_rgba(17,14,47,0.04)]">
      <div className="container flex h-[78px] items-center justify-between gap-5">
        <Link className="flex min-w-0 items-center gap-3" to="/" aria-label="Hope and Homes Foundation home">
          <img className="h-14 w-14 shrink-0 object-contain" src={logo} alt="Hope and Homes Foundation logo" />
          <div className="hidden leading-tight sm:block">
            <p className="text-lg font-extrabold tracking-tight text-[#17142F]">IAM CHARITY</p>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#514E66]">Foundation</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={`${item.label}-${item.to}`} className={linkClass(item)} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-[#C9A84C]/20 transition hover:bg-[#b99737]"
          >
            <span className="hidden sm:inline">Donate Now</span>
            <span className="sm:hidden">Donate</span>
            <span className="material-symbols-outlined text-[18px]">favorite</span>
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-[#EEE9DA] text-[#17142F] lg:hidden"
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
