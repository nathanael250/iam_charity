import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "People to Support", to: "/projects", activeOn: ["/projects", "/needs"] },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Our Impact", to: "/impact-stories", activeOn: ["/impact-stories", "/activities"] },
  { label: "Contact", to: "/contact" },
];

const TopNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const isItemActive = (item) => {
    const activePaths = item.activeOn ?? [item.to];
    return activePaths.some((path) =>
      path === "/" ? location.pathname === "/" : location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const linkClass = (item) => {
    const isActive = isItemActive(item);
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
        <Link className="flex min-w-0 items-center gap-3" to="/" aria-label="I AM Charity home">
          <img className="h-14 w-14 shrink-0 object-contain" src={logo} alt="I AM Charity logo" />
          <div className="hidden leading-tight sm:block">
            <p className="text-lg font-extrabold tracking-tight text-[#17142F]">I AM CHARITY</p>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#514E66]">Rwanda</p>
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
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-[#EEE9DA] text-[#17142F] transition hover:border-[#C9A84C] hover:text-[#C9A84C] lg:hidden"
          >
            <span className="material-symbols-outlined text-[26px]">{isMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      <div
        className={[
          "fixed inset-x-0 bottom-0 top-[78px] z-40 bg-[#17142F]/35 transition-opacity lg:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={[
          "absolute left-0 right-0 top-full z-50 origin-top border-t border-[#EEE9DA] bg-white px-4 pb-5 pt-3 shadow-[0_18px_38px_rgba(17,14,47,0.14)] transition duration-200 lg:hidden",
          isMenuOpen ? "visible translate-y-0 scale-y-100 opacity-100" : "invisible -translate-y-2 scale-y-95 opacity-0",
        ].join(" ")}
      >
        <div className="container grid grid-cols-2 gap-2 px-0">
          {navItems.map((item) => {
            const active = isItemActive(item);

            return (
              <Link
                key={`mobile-${item.label}-${item.to}`}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={[
                  "flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-extrabold transition",
                  active ? "bg-[#F7F0DE] text-[#B58B1D]" : "text-[#17142F] hover:bg-[#F8F6F1] hover:text-[#C9A84C]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
