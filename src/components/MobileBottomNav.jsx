import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", icon: "home" },
  { label: "About", to: "/about", icon: "info" },
  { label: "Activities", to: "/activities", icon: "construction" },
  { label: "Contact", to: "/contact", icon: "mail" }
];

const MobileBottomNav = () => {
  const location = useLocation();

  const itemClass = (path) => {
    const isActive = location.pathname === path;
    return [
      "flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all active:scale-90",
      isActive
        ? "bg-[#C9A84C] text-[#1B0E3D]"
        : "text-[#1B0E3D]/60 dark:text-white/60 hover:bg-[#ECE7EB] dark:hover:bg-white/10"
    ].join(" ");
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-[#1B0E3D]/90 backdrop-blur-md shadow-[0_-4px_24px_0_rgba(27,14,61,0.06)] rounded-t-3xl border-t border-white/10">
      {navItems.map((item) => (
        <Link key={item.to} className={itemClass(item.to)} to={item.to} aria-current={location.pathname === item.to ? "page" : undefined}>
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-manrope text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileBottomNav;
