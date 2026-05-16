import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const groups = [
  {
    title: "Quick Links",
    links: [
      ["Home", "/"],
      ["About Us", "/about"],
      ["Projects", "/projects"],
      ["Activities", "/activities"],
      ["Volunteer", "/volunteer"],
      ["Impact Stories", "/impact-stories"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Donate Now", "/donate"],
      ["Become a Volunteer", "/volunteer"],
      ["Active Projects", "/projects"],
      ["Ways to Give", "/donate"],
      ["Corporate Partnerships", "/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Gallery", "/activities"],
      ["Reports", "/activities"],
      ["FAQs", "/contact"],
      ["News & Updates", "/impact-stories"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/contact"],
      ["Terms of Use", "/contact"],
      ["Transparency Policy", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#14112D] pt-14 text-white">
      <div className="container">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.15fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img className="h-14 w-14 object-contain" src={logo} alt="Hope and Homes Foundation logo" />
              <div className="leading-tight">
                <p className="text-base font-extrabold">Hope & Homes</p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">Foundation</p>
              </div>
            </Link>
            <p className="mt-6 max-w-[260px] text-sm font-semibold leading-7 text-white/68">
              We build homes, restore hope, and empower communities. Together, we create a better future.
            </p>
            <div className="mt-6 flex gap-3">
              {["public", "photo_camera", "alternate_email", "smart_display"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={icon}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 text-white/80 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
                >
                  <span className="material-symbols-outlined text-[19px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-extrabold text-white">{group.title}</h3>
              <div className="mt-5 space-y-3">
                {group.links.map(([label, to]) => (
                  <Link key={`${group.title}-${label}`} to={to} className="block text-sm font-semibold text-white/64 transition hover:text-[#C9A84C]">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="py-7 text-center text-xs font-semibold text-white/38">
          © 2025 Hope & Homes Foundation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
