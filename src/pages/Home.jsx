import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import helpNeeds from "../data/helpNeeds";
import worldMapDots from "../assets/world-map-dots.svg";

const HelpNeedsSection = () => (
  <section className="bg-surface-container-low py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 overflow-hidden rounded-2xl border border-surface-container">
        {helpNeeds.map((need, index) => (
          <div
            key={need.title}
            className={`relative h-56 md:h-72 group ${index !== 0 ? "md:border-l md:border-white/20" : ""}`}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={need.image}
              alt={need.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs tracking-[0.2em] uppercase text-white/70 font-semibold">
                {need.region}
              </span>
              <h3 className="text-lg font-semibold mt-2">{need.title}</h3>
              <Link
                className="inline-block mt-4 bg-[#C9822C] text-white text-xs font-bold tracking-[0.2em] px-6 py-2 rounded-sm transition-all duration-200 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                to={`/donate?campaign=${need.slug}`}
              >
                {need.cta}
              </Link>
            </div>
          </div>
        ))}
        
      </div>
      <div className="flex justify-center items-center py-4">
          <Link className="mt-4 bg-[#C9822C] text-white text-xs font-bold tracking-[0.2em] px-6 py-2 rounded-sm" to="/activities">
            Read More
          </Link>
        </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <>
      <TopNav />

      <div className="md:hidden">
        <div className="bg-surface text-on-surface">
          <main className="pt-16">
            <section className="relative min-h-[795px] flex items-center bg-white overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-50"
                  style={{ backgroundImage: `url(${worldMapDots})` }}
                />
              </div>
              <div className="container relative z-10">
                <div className="max-w-3xl">
                  <h1 className="text-6xl md:text-8xl font-extrabold text-[#1B0E3D] leading-none tracking-tighter mb-8">
                    Less of ourselves, <br />
                    <span className="text-tertiary-container">
                      more on others
                    </span>
                  </h1>
                  <p className="text-[#1B0E3D]/80 text-xl md:text-2xl mb-10 max-w-xl leading-relaxed">
                    "Less of ourselves, more on others" is a core teaching by Prophet TB Joshua, emphasizing selfless love, humility, and prioritizing the needs of others over one's own comfort. This philosophy focuses on humanitarian work, giving to the less privileged, and serving God through service to humanity.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/donate"
                      className="bg-tertiary-container text-on-tertiary-container px-10 py-4 rounded-md font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(27,14,61,0.06)] text-center"
                    >
                      Donate Now
                    </Link>
                    <Link
                      to="/about"
                      className="border border-primary-container/30 text-primary-container px-10 py-4 rounded-md font-bold text-lg hover:bg-surface-container-low transition-all text-center"
                    >
                      Our Process
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-12 right-6 hidden lg:block max-w-sm">
                <div className="glass-card p-8 rounded-xl shadow-[0_20px_40px_rgba(27,14,61,0.06)] border border-white/20">
                  <span className="label-md text-primary-container font-bold mb-2 block tracking-widest uppercase">
                    Latest Milestone
                  </span>
                  <h3 className="text-2xl font-bold text-primary-container mb-4 tracking-tight">
                    Village No. 12 Completed
                  </h3>
                  <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                    Last month, we handed over keys to 14 families in the
                    Highlands region, providing secure housing for 56
                    individuals.
                  </p>
                  <div className="flex -space-x-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white"
                      data-alt="Portrait of a smiling woman"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqZ1lSx1V1R2wGOJXtwxCvePsfBMGVGN1RwZmfZ5nCfqM4ES6JpJoyagBCuMswzVDUgC2Ghqg7gzHfA_GbbQX3egCQEtlOVVRVNdHT0AX-daGxpgZu_6bUAgHiKQF-ijT2roiUbDNkhXx6bThKdDQRkOD4d-JESzpiIAURErSDFI9yqBxsjVCWqFd6cjohazv2Di_YFWrxBS5wSTQWGcoqRFsXuCjhWtmJYOidEwlAaA4D0CfE__PmpcZnN7Jhcg5YNjtWsWfCLMcD"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white"
                      data-alt="Portrait of a smiling man"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo5zXhVkHQR8DCDLH8BCGGOAzYlLBr8zkAM06SFeaXgTvv5kqLe1L8XfdiWP4SVQteu2pgzODJauywDQWB0fT2Z2X7BrlnKqSjr6T1UDxvRJ7z3TsOBqX-tg2EsmHoIsV9dWS1ZTUuNdipJBkp49ILeMSneBzGt93HzK2lzH9B7TpWJWTFVv1HzDBYpoLQDUewbNFPI4BWKwhEV5PsvRu645QdSn2UOfGfqLsSJr3fnNhEUhK4BlotA6nUkHLiJUVSF532trYUpGWX"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white"
                      data-alt="Portrait of a young woman"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeH3gr-8Wbiiu3ZQLbUEaGjA95Ys4jburb72tcSYvloO6N6vxx6p18I-JpUVRqhFZSIb8tPM4iT4uJlEw6nq1l9xmxqKnkEBNz6w939q0ur4NEJd_qpi0uKB-nMFNCZGxRx8BS9HakjN2GqMK0pX2CuEPDdmlyzXrKMcEcLxIJWGVG-QQhtEzqP5nLaSNFd0VO4ojx465w5lBF6IaGsfbLz6MwfXmZlrcyJRgg7P7SSfNRspDZF9HWljWD0mE2BM-vwFM0WOJra6l8"
                    />
                    <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      +42
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#f8f8f6] py-10">
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                    <div className="text-[32px] font-bold text-[#d4af37]">
                      1,240+
                    </div>
                    <div className="text-[13px] text-[#aaa] mt-1">
                      Families housed since 2018
                    </div>
                  </div>
                  <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                    <div className="text-[32px] font-bold text-[#d4af37]">
                      98%
                    </div>
                    <div className="text-[13px] text-[#aaa] mt-1">
                      Still in stable housing after 2 years
                    </div>
                  </div>
                  <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                    <div className="text-[32px] font-bold text-[#d4af37]">
                      34
                    </div>
                    <div className="text-[13px] text-[#aaa] mt-1">
                      Communities transformed
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 bg-surface">
              <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-tertiary font-bold tracking-widest uppercase text-sm mb-4 block">
                      Active Campaign
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tighter leading-tight">
                      Current Goal: The Grace Family Residence
                    </h2>
                    <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                      Following a devastating landslide, the Grace family lost
                      everything. We are building a high-elevation resilient
                      home that will stand for generations. Your contribution
                      directly funds the materials for this specific site.
                    </p>
                    <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-tertiary-container">
                      <div className="flex justify-between mb-4 items-end">
                        <div>
                          <span className="text-3xl font-black text-primary-container">
                            $32,450
                          </span>
                          <span className="text-on-surface-variant ml-2">
                            raised of $45,000
                          </span>
                        </div>
                        <span className="text-tertiary font-bold">
                          72% Funded
                        </span>
                      </div>
                      <div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container w-[72%]"></div>
                      </div>
                      <div className="mt-6 flex gap-8">
                        <div>
                          <span className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                            Days Left
                          </span>
                          <span className="text-xl font-bold text-primary">
                            14
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                            Donors
                          </span>
                          <span className="text-xl font-bold text-primary">
                            128
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      <img
                        alt="Construction site"
                        className="w-full aspect-[4/5] object-cover"
                        data-alt="Cinematic shot of a modern timber frame house under construction at sunrise with golden light filtering through the structure"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5v9x8teeQbmY2RqUqoQgVkf_FrbsofIFNUEi5UdKxHQCHvGjdqpcIfb2WOg1HiWLnizC_XYZCDODgma42HVb0pmPZWYjC7cueIFvAM_8E1SGvjYF9cAYrOrZFdo73vlH6Vu5h42S0M9ITn-HHSZ0LUXt4MaVIdzYg67zOqNkPdY1Lxt3KmeXmmOX-wWuJ5mfUVFCz7P0vKxDkpiCGWMI8ugQb-V-ADuu6HphD728nDjiY1_4kU6BbAxaNB99JVYk8stCZitAu2Vq9"
                      />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-primary-container text-white p-8 rounded-xl max-w-[240px]">
                      <span
                        className="material-symbols-outlined text-tertiary-container text-4xl mb-4"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        foundation
                      </span>
                      <p className="font-bold text-lg leading-tight">
                        Foundation completed Jan 12th, 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <HelpNeedsSection />

            <section className="py-24 bg-primary-container text-white overflow-hidden relative">
              <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter leading-tight">
                    Ready to build something that lasts?
                  </h2>
                  <p className="text-on-primary-container text-xl mb-12 max-w-2xl mx-auto">
                    Your monthly donation of just $25 can provide the materials
                    for one square foot of a new home. Every inch counts toward
                    a better future.
                  </p>
                  <div className="inline-flex flex-wrap justify-center gap-6">
                    <Link
                      to="/volunteer"
                      className="bg-tertiary-container text-on-tertiary-container px-12 py-5 rounded-md font-bold text-xl hover:scale-105 transition-transform"
                    >
                      Become a Monthly Partner
                    </Link>
                    <Link
                      to="/donate"
                      className="border border-white/40 text-white px-12 py-5 rounded-md font-bold text-xl hover:bg-white/10 transition-all"
                    >
                      Make a One-Time Gift
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-on-primary-fixed-variant/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
            </section>
          </main>

          <Footer />

        </div>
      </div>

      <div className="hidden md:block">
        <div className="scroll-smooth bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
          <main className="pt-16">
            <section className="relative min-h-[921px] flex items-center bg-white overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-50"
                  style={{ backgroundImage: `url(${worldMapDots})` }}
                />
              </div>
              <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-2xl">
                  <span className="inline-block py-1 px-3 rounded bg-tertiary-container/20 text-tertiary-container font-bold text-sm tracking-[0.2em] mb-6 uppercase">
                    Our Mission
                  </span>
                  <h2 className="text-6xl md:text-7xl font-black text-[#1B0E3D] leading-tight tracking-tighter mb-8">
                    "Less of ourselves, <br />
                    <span className="text-tertiary-container">
                      more on others"
                    </span>
                  </h2>
                  <p className="text-[#1B0E3D]/80 text-lg leading-relaxed mb-10 max-w-lg">
                    "Less of ourselves, more on others" is a core teaching by Prophet TB Joshua, emphasizing selfless love, humility, and prioritizing the needs of others over one's own comfort. This philosophy focuses on humanitarian work, giving to the less privileged, and serving God through service to humanity.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/donate"
                      className="bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-md font-bold hover:scale-105 transition-all"
                    >
                      Start Your Impact
                    </Link>
                    <Link
                      to="/about"
                      className="border border-primary-container/30 text-primary-container px-8 py-4 rounded-md font-bold hover:bg-surface-container-low transition-all"
                    >
                      View Our Blueprint
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block relative">
                  <div className="relative aspect-square max-w-[520px] w-full ml-auto">
                    <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-2xl bg-white z-10 translate-x-8 -translate-y-8">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Contemporary minimalist home exterior with large glass windows and warm interior lighting at dusk with high-end editorial feel"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy4GXAI787v1HuECZt_a44UKUFQjXYa5f6Rue6I4HT-ICD93UWK6hBS-RcwjOqFtTU0k8DLWpuj2tgdq6NLfbHAmxT7M4V6H-ppb94i-tOfssAz3zJn53DN9H1wJg_Kd64xUSRcPYqR16I7v1aHH4aeatnVnI8RePLHdXDU0QFM6JTFS7LXBH4cvv3Ob6DYEJW4n7V6bWIMzUVf0GL80J7gLa_Z2k6NbsWjnPymPFdWLMxQrSS7x75L4lE3AjYYuf11ZLvH5D0Ev3E"
                        alt="Contemporary minimalist home"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-[0_24px_48px_rgba(27,14,61,0.2)] border border-white bg-white z-20 -translate-x-8 translate-y-8">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Happy family of four standing together in front of their new brightly lit home, showing genuine joy and eye contact"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhtl7y7spToOK2UMfdX9XlFiNiF-PECVfB68M47FuZOiMDddrkqLaFGgnIpwBiYEgjROcbZBu-pDeZX3bemeK_SOqJVnKhb-c1-NkXtZ0heR508tE4zpWBpmD8HuhvaRYClNYptcBoIDCzeqslc3zcQJMaqWYgmZxsqdJG8926WtymPtV9JpbTNv-tF-5ut46061HJkLXy4aGaM9dgKxr2mwhOz01DFgDzLH78xGSRb6uK9SC41gO5_VAZcKbMhqpCHbPla-ZFNO-4"
                        alt="Family story"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#f8f8f6] py-12">
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                    <div className="text-[32px] font-bold text-[#d4af37]">
                      1,240+
                    </div>
                    <div className="text-[13px] text-[#aaa] mt-1">
                      Families housed since 2018
                    </div>
                  </div>
                  <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                    <div className="text-[32px] font-bold text-[#d4af37]">
                      98%
                    </div>
                    <div className="text-[13px] text-[#aaa] mt-1">
                      Still in stable housing after 2 years
                    </div>
                  </div>
                  <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                    <div className="text-[32px] font-bold text-[#d4af37]">
                      34
                    </div>
                    <div className="text-[13px] text-[#aaa] mt-1">
                      Communities transformed
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 bg-surface">
              <div className="container">
                <div className="grid lg:grid-cols-3 gap-16 items-start">
                  <div className="lg:col-span-1">
                    <h3 className="text-4xl font-bold text-primary tracking-tighter mb-4">
                      Active Project
                    </h3>
                    <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                      Join us in completing{" "}
                      <span className="font-bold text-primary">
                        2 houses for poor families in Muyumbu
                      </span>
                      . Every brick laid is a step toward stability.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-tertiary-container">
                          location_on
                        </span>
                        <span className="text-on-surface-variant font-medium">
                          Kigali, Kabuga
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-tertiary-container">
                          calendar_today
                        </span>
                        <span className="text-on-surface-variant font-medium">
                          Completion: 10th Dec 2026
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-[0_40px_24px_0_rgba(27,14,61,0.04)]">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <span className="text-sm font-bold text-tertiary uppercase tracking-widest block mb-1">
                          Fundraising Progress
                        </span>
                        <div className="text-5xl font-black text-primary">
                          1,600,000 Rf
                          <span className="text-xl font-medium text-on-surface-variant">
                            2,000,000 Rf
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-tertiary-container">
                          80%
                        </span>
                        <span className="block text-xs font-bold text-on-surface-variant uppercase">
                          Funded
                        </span>
                      </div>
                    </div>
                    <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden mb-10">
                      <div className="h-full bg-tertiary-container w-[70%] transition-all duration-1000"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="p-4 rounded-xl bg-surface-container-low">
                        <span className="block text-2xl font-bold text-primary">
                          412
                        </span>
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                          Donors
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-low">
                        <span className="block text-2xl font-bold text-primary">
                          12
                        </span>
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                          Days Left
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-low">
                        <span className="block text-2xl font-bold text-primary">
                          Phase 3
                        </span>
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                          Construction
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-tertiary-container/10">
                        <span className="block text-2xl font-bold text-tertiary-container">
                          4,0000 Rf
                        </span>
                        <span className="text-xs font-bold text-tertiary uppercase tracking-tighter">
                          Remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <HelpNeedsSection />

            <section className="py-24 relative bg-primary-container text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-tertiary-container rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-fixed-dim rounded-full blur-[150px] translate-x-1/2 translate-y-1/2"></div>
              </div>
              <div className="container relative z-10">
                <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                  Ready to lay the next stone?
                </h3>
                <p className="text-on-primary-fixed-variant text-xl mb-12 max-w-2xl mx-auto">
                  Your contribution directly funds material costs and local
                  labor. Join a community committed to architectural
                  philanthropy.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <Link
                    to="/donate?amount=50,000"
                    className="bg-tertiary-container text-on-tertiary-container px-12 py-5 rounded-md font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-black/20"
                  >
                    Donate 50,000 RWF
                  </Link>
                    <Link
                      to="/volunteer"
                      className="bg-white/10 text-white backdrop-blur-md px-12 py-5 rounded-md font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                    >
                      Become a Monthly Partner
                    </Link>
                </div>
              </div>
            </section>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
