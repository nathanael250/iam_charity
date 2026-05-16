import { Outlet, Link, useLocation } from "react-router";
import { Heart, Home, Menu, X } from "lucide-react";
import { useState } from "react";

const navy = "#09082f";
const gold = "#d4a928";

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/projects", label: "Projects" },
    { path: "/volunteer", label: "Activities" },
    { path: "/volunteer", label: "Volunteer" },
    { path: "/impact-stories", label: "Impact Stories" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <div className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link, index) => (
                <Link
                  key={`${link.label}-${index}`}
                  to={link.path}
                  className={`relative text-sm font-bold transition-colors ${
                    isActive(link.path)
                      ? "text-[#d4a928]"
                      : "text-[#09082f] hover:text-[#d4a928]"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-6 left-0 h-0.5 w-full rounded-full bg-[#d4a928]" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/donate"
                className="inline-flex items-center gap-3 rounded-md bg-[#d4a928] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#bc941f]"
              >
                Donate Now
                <Heart className="h-4 w-4" />
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-[#09082f] hover:bg-slate-100 lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-slate-100 py-4 lg:hidden">
              {navLinks.map((link, index) => (
                <Link
                  key={`${link.label}-${index}`}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-4 py-3 text-sm font-bold ${
                    isActive(link.path)
                      ? "bg-[#f8f2df] text-[#b88f1e]"
                      : "text-[#09082f] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#d4a928] px-5 py-3 text-sm font-bold text-white"
              >
                Donate Now
                <Heart className="h-4 w-4" />
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#09082f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
            <div>
              <Logo light />
              <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
                We build homes, restore hope, and empower communities. Together,
                we create a better future.
              </p>
              <div className="mt-6 flex gap-3">
                {["f", "ig", "x", "yt"].map((item) => (
                  <span
                    key={item}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs font-black text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <FooterColumn
              title="Quick Links"
              links={[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Projects", "/projects"],
                ["Activities", "/volunteer"],
                ["Volunteer", "/volunteer"],
                ["Impact Stories", "/impact-stories"],
                ["Contact", "/contact"],
              ]}
            />
            <FooterColumn
              title="Support"
              links={[
                ["Donate Now", "/donate"],
                ["Become a Volunteer", "/volunteer"],
                ["Active Projects", "/projects"],
                ["Ways to Give", "/donate"],
                ["Corporate Partnerships", "/contact"],
              ]}
            />
            <FooterColumn
              title="Resources"
              links={[
                ["Gallery", "/impact-stories"],
                ["Reports", "/impact-stories"],
                ["FAQs", "/contact"],
                ["News & Updates", "/impact-stories"],
              ]}
            />
            <FooterColumn
              title="Legal"
              links={[
                ["Privacy Policy", "/contact"],
                ["Terms of Use", "/contact"],
                ["Transparency Policy", "/impact-stories"],
              ]}
            />
          </div>
          <div className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-white/55">
            © 2026 Hope & Homes Foundation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full border"
        style={{
          borderColor: light ? "rgba(255,255,255,0.18)" : "#e9dfbd",
          background: light ? "rgba(255,255,255,0.06)" : "#fff",
        }}
      >
        <Home className="absolute h-7 w-7 text-[#09082f]" />
        <Heart
          className="absolute right-1 top-1 h-5 w-5 fill-[#d4a928] text-[#d4a928]"
          style={{ color: gold }}
        />
      </div>
      <div className="leading-tight">
        <p
          className={`text-lg font-black ${
            light ? "text-white" : "text-[#09082f]"
          }`}
        >
          Hope & Homes
        </p>
        <p
          className="text-[10px] font-black uppercase tracking-[0.18em]"
          style={{ color: light ? "rgba(255,255,255,0.72)" : navy }}
        >
          Foundation
        </p>
      </div>
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-white/65 transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
