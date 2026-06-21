import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const groups = [
  {
    title: "Quick Links",
    links: [
      ["Home", "/"],
      ["About Us", "/about"],
      ["People to Support", "/projects"],
      ["Volunteer", "/volunteer"],
      ["Our Impact", "/impact-stories"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Donate Now", "/donate"],
      ["Become a Volunteer", "/volunteer"],
      ["People to Support", "/projects"],
      ["Ways to Give", "/donate"],
      ["Corporate Partnerships", "/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Impact Gallery", "/impact-stories"],
      ["Our Results", "/impact-stories"],
      ["FAQs", "/contact"],
      ["Stories of Change", "/impact-stories"],
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
    <footer className="bg-[#14112D] pt-8 text-white sm:pt-14">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 border-b border-white/10 pb-8 sm:gap-10 sm:pb-12 lg:grid-cols-[1.15fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img className="h-11 w-11 object-contain sm:h-14 sm:w-14" src={logo} alt="I AM Charity logo" />
              <div className="leading-tight">
                <p className="text-base font-extrabold">I AM Charity</p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#C9A84C]">Here am I. Send me.</p>
              </div>
            </Link>
            <p className="mt-3 max-w-[420px] text-xs font-semibold leading-5 text-white/68 sm:mt-6 sm:max-w-[260px] sm:text-sm sm:leading-7">
              Join us in sharing God’s love through compassionate care, practical support, and service to vulnerable people in Rwanda.
            </p>
            <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">
              {["public", "photo_camera", "alternate_email", "smart_display"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={icon}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-white/80 transition hover:border-[#C9A84C] hover:text-[#C9A84C] sm:h-10 sm:w-10"
                >
                  <span className="material-symbols-outlined text-[19px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-extrabold text-white">{group.title}</h3>
              <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
                {group.links.map(([label, to]) => (
                  <Link key={`${group.title}-${label}`} to={to} className="block text-xs font-semibold leading-5 text-white/64 transition hover:text-[#C9A84C] sm:text-sm">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="py-5 text-center text-[10px] font-semibold text-white/38 sm:py-7 sm:text-xs">
          © {new Date().getFullYear()} I AM Charity. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
