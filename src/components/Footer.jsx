export default function Footer() {
  return (
    <footer className="bg-[#1a1830] text-white pt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          <div>
            <p className="text-sm font-medium tracking-widest">IAM CHARITY</p>
            <span className="inline-block mt-2 text-[11px] tracking-widest uppercase text-purple-300 bg-purple-400/10 px-3 py-1 rounded-full">
              501(c)(3) Nonprofit
            </span>
            <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-xs">
              A global collective of architects and humanitarians building the future, one home at a time.
            </p>
            <div className="mt-5">
              <p className="text-[11px] tracking-widest uppercase text-white/30 mb-2">Stay updated</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 text-sm px-3 py-2 rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/25 outline-none"
                />
                <button className="text-sm px-4 py-2 bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-container/90 rounded-md font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-widest uppercase text-white/35 mb-4">Connect</p>
            {["Instagram", "LinkedIn", "Twitter"].map((label) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-2 text-sm text-white/65 hover:text-purple-300 mb-3 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div>
            <p className="text-[11px] tracking-widest uppercase text-white/35 mb-4">Impact</p>
            {["Active Projects", "Annual Report", "Case Studies", "Partners"].map((link) => (
              <a key={link} href="#" className="block text-sm text-white/65 hover:text-purple-300 mb-3 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div>
            <p className="text-[11px] tracking-widest uppercase text-white/35 mb-4">Contact</p>
            <p className="text-sm text-purple-300 mb-2">hello@iamcharity.org</p>
            <p className="text-sm text-white/65 leading-relaxed mb-4">
              124 Foundation Way,
              <br />
              Global Hub, NY 10012
            </p>
            <p className="text-xs text-white/30 mb-3">Mon – Fri, 9am – 6pm EST</p>
            <a
              href="#"
              className="inline-block text-sm text-white/70 border border-white/15 bg-white/5 px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-3">
          <p className="text-xs text-white/25">
            © 2024 IAM Charity. All rights reserved. Registered 501(c)(3) nonprofit.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Transparency", "Cookie Policy"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
