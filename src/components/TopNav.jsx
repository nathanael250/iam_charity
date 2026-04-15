import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Activities", to: "/activities" },
  { label: "Contact", to: "/contact" }
];

const TopNav = () => {
  const location = useLocation();
  const [hideTopBar, setHideTopBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHideTopBar(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    return [
      "font-manrope font-bold tracking-tighter transition-transform duration-200",
      isActive ? "text-[#C9A84C]" : "text-[#1B0E3D] hover:scale-105"
    ].join(" ");
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        {!hideTopBar && (
          <div className="hidden md:block bg-[#1F1542] border-b border-surface-container">
            <div className="container py-4 h-10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <a
                  className="w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </a>
                <a
                  className="w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </a>
                <a
                  className="w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </a>
              </div>
              <div className="flex items-center gap-6 text-xs font-semibold text-white">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>hello@iamcharity.org</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>+1 (555) 000-1234</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <nav className="bg-white border-b border-surface-container">
          <div className="container h-16 flex justify-between items-center">
            <div className="flex items-center gap-4">
              
              <Link className="flex items-center gap-3" to="/">
                <img className="w-9 h-9 md:w-16 md:h-16 object-contain shrink-0" src={logo} alt="iam charity logo" />
                {/* <span className="text-xl font-black text-[#1B0E3D] uppercase tracking-widest">iam charity</span> */}
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  className={linkClass(item.to)}
                  to={item.to}
                  aria-current={location.pathname === item.to ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              to="/donate"
              className="bg-tertiary-container text-on-tertiary-container px-6 py-2 rounded-md font-bold tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#1B0E3D]/10"
            >
              Donate
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopNav;
