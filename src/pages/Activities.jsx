import MobileBottomNav from "../components/MobileBottomNav";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const Activities = () => {
  return (
    <>
      <TopNav />

      <div className="md:hidden">
        <div className="bg-background text-on-surface selection:bg-tertiary-container selection:text-on-tertiary-container">
          <main className="pt-24 pb-32 container">
            <section className="mb-16">
              <div className="flex flex-col md:flex-row gap-8 items-end">
                <div className="md:w-2/3">
                  <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Impact</span>
                  <h2 className="text-5xl md:text-7xl font-extrabold text-primary leading-[0.9] tracking-tighter mb-6">
                    Building Futures, Brick by Brick.
                  </h2>
                </div>
                <div className="md:w-1/3 pb-2">
                  <p className="text-on-surface-variant text-lg leading-relaxed font-medium">
                    Explore our current initiatives and celebrated completions. Every project is a testament to the power
                    of collective compassion.
                  </p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <article className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_0_rgba(27,14,61,0.06)] flex flex-col group">
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Architectural detail of a community center under construction with scaffolding against a clear blue sky and warm sunlight"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmdG5Y0qxf7GFbIXxyiyArxWIlcQdrnp3AMQcfSXOgnMxPxSxXMiWvJMU4Ylg6EH-ety1a3hfbou4v5y3u-ua8tk_Vkx8tDQuBLxLNSQpXbiK813jG2RSeQt9dK6Nx-l5XA1R8BFzsZ2p8G7gbGnknVtwE3TvuEYjW-TKDz-P9XINymedRBQqNwxyQH9ZX5tAp0-Loz9rnelPI8Es5RdS4jqQIuAgC9IasZ8UfBKidZChqlbMoARH8z0s0EOB4id2stPNsjrgpcDYy"
                    alt="Community center under construction"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-on-tertiary-container rounded-full animate-pulse"></span>
                      In Progress
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Shelter
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold tracking-tighter mb-4 text-primary-container">Lumina Community Haven</h3>
                    <p className="text-on-surface-variant leading-relaxed mb-6">
                      A state-of-the-art multi-purpose space designed to provide education and safe housing for over 200
                      families in the valley district. Focusing on sustainable architecture and renewable energy.
                    </p>
                    <div className="space-y-2 mb-8">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        <span>Phase 1: Foundation</span>
                        <span>65% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container w-[65%]"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-tertiary-container text-on-tertiary-container px-8 py-3 font-bold rounded-md hover:scale-105 transition-transform duration-200 flex items-center gap-2">
                        Support this Project
                        <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
                          arrow_forward
                        </span>
                      </button>
                      <button className="bg-surface-container-high text-on-surface px-8 py-3 font-bold rounded-md hover:scale-105 transition-transform duration-200">
                        View Full Plan
                      </button>
                    </div>
                  </div>
                  <div className="md:w-48 grid grid-cols-2 md:grid-cols-1 gap-2 flex-shrink-0">
                    <img
                      className="w-full h-24 object-cover rounded-lg"
                      data-alt="Close up of bricklaying process with fresh mortar and skilled hands working"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhFlSiotiZTVG6dsGRJdgDzfDhc__zxAHhnTGWnNWvhA4CX7AmgepUL_U6Zj8M-y1j17d--O5FmGJTHDhkbB1dSQl7RuQH6l3DnkBtffWl0MEnXaNjEnEETs8jyZe60VWMkKCrK5t4xGqtlVakn94QUm0D5Z3Wi0aJ72Odlkykcda3vjV8mhQcNskS3vn6GNgk1NwCOqWFmjvlddF7rnpBazu5Zdakbjfy4kwy9ie2J2BL95TP-QKfrs4DlYeMuJErF0216IeK89d-"
                      alt="Bricklaying"
                    />
                    <img
                      className="w-full h-24 object-cover rounded-lg"
                      data-alt="Architectural blueprints and wooden models on a table with morning light"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjYP4DA9E3j5xBBUtiUKTSaz98To-oj41mMnkjJFaW7jGciryf64_os96LAHpTCZ9i1z6H0ocSrVtWj6YBR55B1-yiLKKNk1pPc3t-y1p2bVLWKsnCOc4Ov5jJB7D9IqqJVJ-TRQ4oxcKdYFlovaZjEoRJDdmzHvK0Im5jgrvJqjNkRxMrZkQUXIqZXGVIlBNeNTeQvfU2GUKd57dFNFM5m-fYdr9QITZXCAErWl4Mw67pz91JCB6JzC3XbKUC67EUblC6JrEreupr"
                      alt="Blueprints"
                    />
                  </div>
                </div>
              </article>

              <article className="md:col-span-4 bg-surface-container rounded-xl overflow-hidden shadow-[0_4px_24px_0_rgba(27,14,61,0.06)] flex flex-col group">
                <div className="relative h-[300px]">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    data-alt="Modern clean office and education space with light wood furniture and floor to ceiling windows"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUJYQzJpo1GVrhhxNcd4RAfi_LT5Klre1gBOFrzIyKh0D-eYSePMsUm8fkzekrec7grA04Iru5ycOsfpmlz4YtMyfjmqrsKfO9wql_2yvbqbmAOfJ84G2wsSLpdrUGKz0hRQFxkSSQRhxHuPBy69uk7Jub2hhfQKJuPxLV-URHIxSIXG_f2UL_nZQqdnLTN7cUrQZmbHSIxhZUnYeQuhjKh1fjH5yrI-RBvUwtKPdXnS-5yZaGT3YrQRLD2n1FISl5hO_kmJqKUwGu"
                    alt="Modern clean office"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Completed
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold tracking-tighter mb-2 text-primary-container">The Oasis Academy</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow italic">
                    &quot;A dream realized for the youth of Accra, providing digital literacy to 500+ students annually.&quot;
                  </p>
                  <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Finished: Oct 2023
                    </span>
                    <a className="text-tertiary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
                      Read Case Study
                      <span className="material-symbols-outlined text-xs" data-icon="open_in_new">
                        open_in_new
                      </span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="md:col-span-5 bg-primary-container text-white rounded-xl overflow-hidden shadow-[0_4px_24px_0_rgba(27,14,61,0.06)] flex flex-col group">
                <div className="p-8 flex-grow">
                  <div className="mb-6 flex justify-between items-start">
                    <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Active
                    </span>
                    <span
                      className="material-symbols-outlined text-tertiary-container"
                      data-icon="water_drop"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      water_drop
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter mb-4 text-tertiary-fixed">Crystal Flow Wells</h3>
                  <p className="text-on-primary-container leading-relaxed mb-8">
                    Installing solar-powered water filtration systems across 5 remote villages. Ensuring consistent access
                    to clean drinking water for decades to come.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                        data-alt="Portrait of a female volunteer smiling in the sun"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEyVha0eaYAE2lDEskrB6YhGEXVYngP_mvoGan7VfuC4hpeMieGp8hvJWAP8XreBkyxnY8gBY1WGgB8_1vjshDugy-Sqs9YBIuBLbsvP_rPjFxpDh6qo6hVmtJXUgP7--sBdjmHONtQNElUSjcdBJDTVtUHF2NqyGf9USNMH3daaOq_sHwf4awfubepE4Ig-BYduTrxsR9uQiyddGy2y2oZR6X3js4x_itDPNx5w9AJl5bKFZBvFLLMpNLLJkUzMrw5Hp9SSU43o9n"
                        alt="Volunteer portrait"
                      />
                      <span className="text-xs font-semibold text-white/80 tracking-wide">Project Lead: Sarah Jenkins</span>
                    </div>
                    <button className="w-full bg-[#C9A84C] text-[#1B0E3D] py-3 font-bold rounded-md hover:scale-[1.02] transition-transform">
                      Support this Project
                    </button>
                  </div>
                </div>
                <img
                  className="w-full h-48 object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                  data-alt="Children laughing around a new communal water tap in a dusty rural setting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsSt47qw9brV3RFRUrL8JpMOq3Il2u2HUb4VngBAiV9izzrZJ2XOnwXddrkEU-q-zM0KbHCqaccznoVwxnqnhcwmtoiBL6iLDYS9dBxwb0QZwjlnhY3F-y7kwSY344oXZGDNw39Ic1xEBcuaiflSokNrVFGpo7kVDsxHdE4Z7mxPupKLECHN0LS0tsYY1cHtoorGV9khyU9F6gRqw_s9yWvCNpxihKS2u6fOoYR8k70IvswwLXtmJa75c7xf4rdl_jhu6zLgiYpkUk"
                  alt="Children at water tap"
                />
              </article>

              <article className="md:col-span-7 bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_0_rgba(27,14,61,0.06)] grid grid-cols-2 grid-rows-2 gap-1 p-1 group">
                <div className="col-span-1 row-span-2 relative overflow-hidden rounded-l-lg">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    data-alt="Bustling street market being renovated with new stalls and colorful awnings"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzCGgtktx60Rf3f4ATib7aDrxKqj42Y0kb2GBpcI5V_4CbjYz7CLIyQA0j2B9jCBdKaT2vjed5dL4tH-T2byjNSBePz3D3ZPzRyghRqVijh_Czkn99nsMaDAagijyRwfHB0nqDO0h89DzdCvu3ql3o9OrOWPPVfFIV8GTsyso88LC7a-NtNaOqVOT1-2GpjkrYM8kBSjutRX-p8_eVtsIGa47WFckAqRheqOb32_Q-_QddyenKGDCbMCYisiipQxt4sko2lZUOw_Hn"
                    alt="Market rebuild"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h4 className="text-white font-bold text-xl tracking-tighter">Market Rebuild</h4>
                  </div>
                </div>
                <div className="col-span-1 row-span-1 relative overflow-hidden rounded-tr-lg">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    data-alt="Handshakes over a wooden table, symbolizing a successful partnership"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOKFJhHJWb4qJ7np338848AzoGketZjgISdrJoDB1xBKXRMpDCI5U5JeYKc6iFoEtj3uxz9m6s1rhpxKjfK9jBntrco7d-MlskBkzIY-yhKZv6nq0nnwVTkvUcuuf5la_LK6ZqS4eX59pPv7IdC-ThuOcOBw3_X2JaxkMHbwMteGVJY84aFcRPHfqeKLuEdFisB1NUVqpMRp4l4k_mXgF5ojSZ6yIAuiDiW_bbEQGEmal1P6sBOBpC4NSSlLKFtP8YujKmCEDbmMhx"
                    alt="Handshake"
                  />
                </div>
                <div className="col-span-1 row-span-1 relative overflow-hidden rounded-br-lg bg-tertiary-container flex items-center justify-center text-center p-4">
                  <div>
                    <span className="block text-3xl font-black text-on-tertiary-container mb-1">+12</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container/80">
                      More Activities
                    </span>
                    <a className="mt-2 block text-xs font-bold text-on-tertiary-container underline underline-offset-4" href="#">
                      Explore All
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />

          <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-[#C9A84C] text-[#1B0E3D] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40">
            <span
              className="material-symbols-outlined text-3xl"
              data-icon="volunteer_activism"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              volunteer_activism
            </span>
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="scroll-smooth bg-background text-on-background antialiased selection:bg-tertiary-container selection:text-on-tertiary-container">
          <main className="pt-24 pb-20 container">
            <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-7">
                <span className="label-md uppercase tracking-[0.3em] text-tertiary font-bold mb-4 block">
                  Current Activities
                </span>
                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-primary leading-none">
                  BUILDING
                  <br />THE FUTURE.
                </h2>
                <p className="mt-8 text-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Our architectural approach to charity focuses on permanence. We aren&apos;t just providing aid; we are
                  constructing the literal foundations for flourishing communities.
                </p>
              </div>
              <div className="md:col-span-5 hidden md:block">
                <div className="bg-surface-container-high p-8 rounded-xl aspect-[4/3] relative overflow-hidden group">
                  <img
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30 group-hover:scale-110 transition-transform duration-700"
                    data-alt="Modern architectural blueprint with golden pen lying on a desk with soft morning sunlight streaming through a window"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA78tLW3nL5fS7JwxM7qWdU8mKaTeBHI1XJyAVBfi1HP3_Ya9DJp8Wq8am68G_OZb6WIFVVRI1nuo2wIVX5VTaeVRXqCZWikmTniX2xCi-WH3Dc9ukKU9o8J-MOfCOpYVeClffZ_gjI0AZqpVvJTeSpSp_4LFz-_NXdM7YXHJxvnovzQwIEwmu0LsKkoOYop7VuhslEOVUd8iHVx9Y6neaLkIqWrWCZvX4AEP4iXgOlghCtV8zWKykJRX1ABL8XA_1uhCbTNYxn0muZ"
                    alt="Architectural blueprint"
                  />
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <p className="font-bold text-primary-container text-2xl leading-tight">Architecture of Compassion</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="space-y-32">
              <article className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-16 items-center">
                <div className="md:col-span-7 order-2 md:order-1">
                  <div className="bg-surface-container-lowest p-8 md:p-12 shadow-[0_4px_24px_0_rgba(27,14,61,0.06)] rounded-xl border border-outline-variant/10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-12 h-[2px] bg-tertiary-container"></span>
                      <span className="font-bold tracking-widest text-xs uppercase text-tertiary">EDUCATION HUB</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-primary mb-6">
                      Lumina Community Haven
                    </h3>
                    <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                      A multi-purpose facility designed to host vocational training, medical clinics, and safe community
                      gatherings. Designed with sustainable cooling systems and local materials to ensure century-long
                      utility.
                    </p>
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-sm font-bold text-primary-container">
                        <span>CONSTRUCTION PROGRESS</span>
                        <span>78%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container" style={{ width: "78%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                        <span>EST. COMPLETION: OCT 2024</span>
                        <span>GOAL: $450,000</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-primary-container text-on-primary px-8 py-3 font-bold rounded-md hover:scale-105 transition-all">
                        Support Construction
                      </button>
                      <button className="bg-surface-container-high text-primary-container px-8 py-3 font-bold rounded-md hover:scale-105 transition-all">
                        View Blueprints
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5 order-1 md:order-2 mb-8 md:mb-0">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Contemporary sustainable architecture with warm wood accents and large glass walls reflecting a lush garden at twilight"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuVZjuGfr9iZ8wNd_OhfKoqZMSAvzWmT0hLqKSd3P47dCBwlLDpT12x-_AoYokUhHmLZkpCewFnFf5hsnGwU0LcI18Upty234W6OTsYeGGxvmCERL_niZg0VIrn9b-BjRI9_1Y863iB-hVWohlLFbod2wFTpB631G7EHeyuIcHOYk5XfPSpnbSiCaTUVigmn8-ApGIXCugdWyty7Hsa5HsdKQOLG76Ung10y6gUBv-eFJmgBBscgJOfg9axnMRUOufXL7bDHuLaCmP"
                      alt="Sustainable architecture"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent"></div>
                  </div>
                </div>
              </article>

              <article className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-16 items-center">
                <div className="md:col-span-5 mb-8 md:mb-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Sun-drenched classroom with minimalist wooden furniture and diverse children engaged in collaborative learning with artistic murals in background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXmlLoJa0Zcn2bhYW10yJwj0msdpIvH38pWNWpjGw7_NixBu_Ph9g8Fg5h7jG11Je8mOFsvWHzuiSa2CpKIutkOMNTJDNnsqEbZXSEmfI6hR1yHkhfU7hHwUEDO4D_SPKHfAqQ7t8Q9YXWMo9bpIja1KOiouBbvWakHJUNHWYJIjHj851INN0KJb1mL3VhsdLxDiUBUU9iM-wHKsPX2UCSWqPzOf-Aux5BW13XfSMNWja77zAm2CeLs2BGCBMPcfTKuVVkx9LbPhd1"
                      alt="Sun-drenched classroom"
                    />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="bg-primary-container text-on-primary p-8 md:p-12 shadow-xl rounded-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-12 h-[2px] bg-tertiary-container"></span>
                      <span className="font-bold tracking-widest text-xs uppercase text-tertiary-fixed">KNOWLEDGE CENTER</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-6">
                      The Oasis Academy
                    </h3>
                    <p className="text-on-primary-container text-lg leading-relaxed mb-8">
                      Empowering the next generation through a curriculum focused on technology, entrepreneurship, and
                      ethics. The Academy serves 400 students annually from surrounding marginalized districts.
                    </p>
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-sm font-bold text-tertiary-fixed">
                        <span>FUNDING GOAL</span>
                        <span>42%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container" style={{ width: "42%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-on-primary-container font-medium">
                        <span>RAISED: $126,000</span>
                        <span>TARGET: $300,000</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-tertiary-container text-on-tertiary-container px-8 py-3 font-bold rounded-md hover:scale-105 transition-all">
                        Sponsor a Student
                      </button>
                      <button className="border border-white/20 text-white px-8 py-3 font-bold rounded-md hover:bg-white/10 transition-all">
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-16 items-center">
                <div className="md:col-span-7 order-2 md:order-1">
                  <div className="bg-surface-container-low p-8 md:p-12 rounded-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-12 h-[2px] bg-tertiary-container"></span>
                      <span className="font-bold tracking-widest text-xs uppercase text-tertiary">VITAL RESOURCES</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-primary mb-6">
                      Crystal Flow Wells
                    </h3>
                    <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                      Implementing deep-borehole solar pumping systems to provide clean, filtered water to over 5,000
                      households across the arid northern regions.
                    </p>
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-sm font-bold text-primary-container">
                        <span>OPERATIONAL CAPACITY</span>
                        <span>92%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container" style={{ width: "92%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                        <span>ACTIVE WELLS: 14</span>
                        <span>UNDER CONSTRUCTION: 2</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-primary-container text-on-primary px-8 py-3 font-bold rounded-md hover:scale-105 transition-all">
                        Fund a Well
                      </button>
                      <button className="bg-surface-container-high text-primary-container px-8 py-3 font-bold rounded-md hover:scale-105 transition-all">
                        Technical Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5 order-1 md:order-2 mb-8 md:mb-0">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Clear sparkling water splashing into a modern clean reservoir with minimalist concrete design under a bright clear sky"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBywDBNrdSIhgWkeJsdTquTdYxJhaITzDsxpZFL1pzHNYWJEadSkpDkHBBJ5LwEOfmIK3Ywo7poTczb1T0OIkcrWka60jlwN6cJjDiBTF_e-5QF6NYvEgCNuS7BxObcajv9OYFs7KBaQcEGuBvQSOsDBGyXqzYzTe9xUcoCWTLOFJmqDnr2I9fKFxD5-QH8-5FbfsbEARql1v7QkwEpjZEHS3oSShlHIsVF8bwlU3LuEKwnvM4R7PGz_5TUv-PAwf9KI09OurHP1O25"
                      alt="Crystal flow wells"
                    />
                  </div>
                </div>
              </article>
            </div>

            <section className="mt-40">
              <h4 className="text-center text-3xl font-extrabold tracking-tighter mb-16">THE IMPACT OF YOUR ARCHITECTURE</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest p-8 rounded-xl md:col-span-2 shadow-sm border border-outline-variant/10">
                  <span className="material-symbols-outlined text-4xl text-tertiary mb-6">home</span>
                  <p className="text-5xl font-black text-primary tracking-tighter mb-2">1,240</p>
                  <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Homes Reinforced</p>
                </div>
                <div className="bg-primary-container p-8 rounded-xl text-on-primary">
                  <span className="material-symbols-outlined text-4xl text-tertiary-container mb-6">school</span>
                  <p className="text-4xl font-black tracking-tighter mb-2">8,500+</p>
                  <p className="text-on-primary-container font-bold uppercase tracking-widest text-xs">Students Graduated</p>
                </div>
                <div className="bg-tertiary-container p-8 rounded-xl text-on-tertiary-container">
                  <span className="material-symbols-outlined text-4xl text-primary-container mb-6">water_drop</span>
                  <p className="text-4xl font-black tracking-tighter mb-2">15.2M</p>
                  <p className="text-on-tertiary-container/80 font-bold uppercase tracking-widest text-xs">Liters Provided</p>
                </div>
                <div className="bg-surface-container-high p-8 rounded-xl md:col-span-4 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-primary-container">Ready to help us build more?</p>
                    <p className="text-on-surface-variant">Join our monthly builder program for exclusive project updates.</p>
                  </div>
                  <div className="flex w-full md:w-auto gap-4">
                    <input
                      className="flex-grow bg-white border-none rounded-md px-6 py-3 focus:ring-2 focus:ring-tertiary-container outline-none"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <button className="bg-primary text-white px-8 py-3 font-bold rounded-md whitespace-nowrap">Join Now</button>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Activities;
