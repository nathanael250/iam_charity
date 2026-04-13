import MobileBottomNav from "../components/MobileBottomNav";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <TopNav />

      <div className="md:hidden">
        <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
          <main className="pt-16 pb-32">
            <section className="px-6 py-20 md:py-32 grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-tight mb-8">
                  More than a roof.
                  <br />A permanent <span className="text-on-primary-container">foundation</span>.
                </h1>
                <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
                  At iam charity, we believe homelessness is a structural failure, not a personal one. We architect
                  sustainable, beautiful homes that restore dignity and foster thriving communities.
                </p>
              </div>
              <div className="md:col-span-5 relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Modern architectural house with clean lines and warm wood accents surrounded by lush landscaping under a soft evening sky"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ--rmb0LEVwBHxmfZbpxHkZS_io7jgaV41e7Y3uU91Pi5RKJgWUpmnVwjzir_5MODgMJcWGAg5ELFcOtXLxz6Gm-62qdd5vu2Nj1PjsRjTfSw0C0TG8Oc53VMt3ydaOQeggY1HQ5FqhTjPjzt0EixtRzVJYVHhVVUyPT9-dnxF8cq4bOXqHYSSo4XKVlhu3tXYytEeyW1NX99xi_sUeCiao_aX9NgfZLHv4qUPpblRY4Odf7cUW--kGO7oUVFLXI-cdEpS46IIWks"
                    alt="Modern architectural house"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-tertiary-container text-on-tertiary-container p-8 rounded-xl shadow-lg hidden md:block max-w-[200px]">
                  <p className="font-bold text-3xl leading-none">0%</p>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-2">Administrative Waste</p>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low py-24">
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                  <div className="max-w-2xl">
                    <h2 className="text-label text-on-primary-container font-bold uppercase tracking-[0.3em] mb-4">
                      The Human Blueprint
                    </h2>
                    <h3 className="text-4xl font-bold tracking-tight text-primary">Our Core Values</h3>
                  </div>
                  <div className="h-[2px] flex-grow bg-outline-variant/30 ml-8 mb-4 hidden md:block"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-surface-container-lowest p-10 rounded-xl hover:scale-[1.02] transition-transform duration-300">
                    <span className="material-symbols-outlined text-4xl text-tertiary mb-6" data-weight="fill">
                      volunteer_activism
                    </span>
                    <h4 className="text-2xl font-bold mb-4">Compassion</h4>
                    <p className="text-on-surface-variant leading-relaxed">
                      We listen first. Every home we build is co-designed with the residents to meet their specific needs
                      and dreams.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-10 rounded-xl hover:scale-[1.02] transition-transform duration-300">
                    <span className="material-symbols-outlined text-4xl text-tertiary mb-6" data-weight="fill">
                      verified
                    </span>
                    <h4 className="text-2xl font-bold mb-4">Integrity</h4>
                    <p className="text-on-surface-variant leading-relaxed">
                      Transparency in every brick. We use sustainable materials and rigorous financial tracking to ensure
                      maximum impact.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-10 rounded-xl hover:scale-[1.02] transition-transform duration-300">
                    <span className="material-symbols-outlined text-4xl text-tertiary mb-6" data-weight="fill">
                      groups
                    </span>
                    <h4 className="text-2xl font-bold mb-4">Community</h4>
                    <p className="text-on-surface-variant leading-relaxed">
                      We don&apos;t just build houses; we build neighborhoods. Our projects include shared spaces that foster
                      human connection.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-primary-container py-32 text-on-primary overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #4b3f6f 25%, transparent 25%), linear-gradient(-45deg, #4b3f6f 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4b3f6f 75%), linear-gradient(-45deg, transparent 75%, #4b3f6f 75%)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 20px, 20px 20px, 20px 0",
                  }}
                ></div>
              </div>
              <div className="container grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 text-on-primary">
                    Our Impact to Date
                  </h2>
                  <p className="text-on-primary-container text-lg mb-12 max-w-md">
                    The metrics of change aren&apos;t just in the numbers, they are in the lives reclaimed and the futures
                    secured.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-5xl font-black text-tertiary-container mb-2">100+</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-70">Homes Built</div>
                      <div className="mt-4 h-2 bg-on-primary-fixed-variant rounded-full w-full">
                        <div className="h-full bg-tertiary-container rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-black text-tertiary-container mb-2">500+</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-70">Lives Changed</div>
                      <div className="mt-4 h-2 bg-on-primary-fixed-variant rounded-full w-full">
                        <div className="h-full bg-tertiary-container rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img
                    className="rounded-xl w-full h-64 object-cover transform translate-y-12 shadow-2xl"
                    data-alt="Candid portrait of a smiling older man sitting on a porch steps in soft natural lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5MJGdgVBxr-Lrek7y9FBYxXisomPiAM2-6ztB2pD7v534wP_bVauFk_XMmp5euEe2ayCKb0QDbsBSDLKJGyJ2ZikB9Ygf1w1KuRtPnFMbWD7aUATtlgguZ-EA0zs_Gw2hWFlG-FagQ36mnOCdTW7I351UWm7uu4rHO316PXPnRAjQQQLLoO08tfH608bYFjn0Yfs6T9BJfUoS3blB4sWztdcI03T_PUSiefD4dly0pRnZOCVABwwnTsawgonHy5bAoUkg8IZCozf"
                    alt="Portrait of a smiling older man"
                  />
                  <img
                    className="rounded-xl w-full h-64 object-cover shadow-2xl"
                    data-alt="Close up of two people shaking hands with blueprints on a wooden table in the background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXfCQQnu3lYJuVpkJWeSSbKw0bzhJQxNOYteWo67LMrKHWfdhBSh58On8f5vTeX-AWVpRzfvRbQcIyPpG0v_kll0Ccn95vc580IdGTAmdTaNco1MscZav7jFHZj4fT8kc9jxlahh6nmkO-PjNxADjvwSNiPhAWXujx3R4Lw5m5pE9qCJfrQscsN0J0x62vUS76yndfI3BmLKojFlS4j2SykPihbVTWOtXzeWfagIiqOunylABLve2nMP6jkBQSmBOqA1q0H0TG2TCP"
                    alt="Handshake over blueprints"
                  />
                </div>
              </div>
            </section>

            <section className="py-24 px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <span className="material-symbols-outlined text-6xl text-tertiary mb-6">home_pin</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Will you help us build the next home?</h2>
                <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                  Your contribution directly translates into materials and labor for our newest project in North Carolina.
                  Join the movement to end homelessness for good.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button className="bg-tertiary-container text-on-tertiary-container px-10 py-4 rounded-md font-bold text-lg hover:scale-105 transition-all shadow-xl">
                    Donate Now
                  </button>
                  <button className="bg-primary-container text-white px-10 py-4 rounded-md font-bold text-lg hover:scale-105 transition-all">
                    View Projects
                  </button>
                </div>
              </div>
            </section>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="scroll-smooth bg-background text-on-surface">
          <main className="pt-16">
            <section className="relative min-h-[819px] flex items-center bg-primary-container overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <img
                  alt="Compassionate community work"
                  className="w-full h-full object-cover"
                  data-alt="dramatic wide angle shot of high-end architectural structure meeting natural warm sunlight with soft lens flares and editorial feel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjdInrcPQWe-fmMzF2F8Tl6dBBAl6UZ2p00Crl_Ff1aC3ngU8LpjKHY_3LBGpKulik3m6llhQgzh8e9ttT1hzblTT9-cy_hG2J8dfwys6_sldySlYosHMSCjLDorBkUOqVBK6X4Pe7FpdGi50OMloUzSfwqY2CuqAxyU8TgvSiBQmwd0b9PSdxTivmGndCblw-2CQABsK2jWxzg_w9ll4tYH3V_j6YPUbnmuhlivfZjcm_anzZHk_C_QFVUboOBKdUcA-5RY_8qgbk"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
              <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-2xl">
                  <span className="text-tertiary-container font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                    Our North Star
                  </span>
                  <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                    The Human <br /> Blueprint.
                  </h1>
                  <p className="text-on-primary-fixed-variant text-xl md:text-2xl leading-relaxed font-light">
                    We don&apos;t just build houses; we curate permanent foundations for human dignity. Through intentional
                    architecture and radical compassion, we are rewriting the narrative of charity.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-32 bg-surface">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 self-start">
                    <h2 className="text-primary text-5xl font-black tracking-tighter leading-none mb-6">
                      Built on <br />Values.
                    </h2>
                    <div className="h-1 w-20 bg-tertiary-container mb-6"></div>
                    <p className="text-on-surface-variant text-lg leading-relaxed">
                      Our principles are the load-bearing walls of every project we undertake.
                    </p>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-surface-container-lowest p-10 rounded-xl hover:scale-[1.02] transition-all duration-300 group">
                      <div className="flex flex-col h-full justify-between">
                        <span className="material-symbols-outlined text-tertiary-container text-5xl mb-8">favorite</span>
                        <div>
                          <h3 className="text-2xl font-bold text-primary-container mb-4">Compassion</h3>
                          <p className="text-on-surface-variant leading-relaxed">
                            Empathy in action. We listen to the heartbeat of every family we serve, ensuring their specific
                            needs define our architectural response.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-primary-container p-10 rounded-xl hover:scale-[1.02] transition-all duration-300">
                      <div className="flex flex-col h-full justify-between">
                        <span className="material-symbols-outlined text-tertiary-container text-5xl mb-8">verified</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-4">Integrity</h3>
                          <p className="text-on-primary-fixed-variant leading-relaxed">
                            Transparency is our bedrock. From the first brick to the final key exchange, every cent and
                            second is accounted for with absolute clarity.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 bg-surface-container-high p-10 rounded-xl hover:scale-[1.02] transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                          <span className="material-symbols-outlined text-tertiary-container text-5xl mb-8">
                            diversity_3
                          </span>
                          <h3 className="text-2xl font-bold text-primary-container mb-4">Community</h3>
                          <p className="text-on-surface-variant leading-relaxed">
                            We don&apos;t build in isolation. We foster ecosystems of support where neighbors uplift neighbors,
                            creating lasting social permanence.
                          </p>
                        </div>
                        <div className="flex-1 w-full h-48 overflow-hidden rounded-lg">
                          <img
                            alt="Community Gathering"
                            className="w-full h-full object-cover"
                            data-alt="diverse group of happy people sitting around a long wooden table in a sunlit garden, editorial lifestyle photography"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHsFk4027Vu9DU1UITRIFltQuQqfq0M7uM2mj7X_Wv6HbthWtHYTNC0YYZqlwFQSp0tOrVQABeOiVDWkpEp-ZTW9ZiYJzeiRMrJpl-YW_1hyaO-Iyib8vudjGIA1ejB3AbFobXdV3yhQfTuu4vzWVi-x-dui2mSH1CiUOyRgHiurLMp20n2e8qd6DQVmBIlWohwNKgJY7vPw85h1YVJUrzwW1K1_LQVI_qeZ1ie962udFieYnE4ksYsCcVnrctpClElLrrGgEeDIzw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low py-32">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                  <div className="max-w-xl">
                    <h2 className="text-primary text-5xl font-black tracking-tighter leading-none mb-6">
                      Measurable <br />Impact.
                    </h2>
                    <p className="text-on-surface-variant text-lg">
                      We define success by the stability of the lives we touch. These aren&apos;t just numbers; they are new
                      beginnings.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-primary-container font-black text-8xl md:text-9xl tracking-tighter block">
                      124
                    </span>
                    <span className="text-tertiary font-bold uppercase tracking-widest text-sm">Homes Completed</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="border-l-2 border-tertiary-container/30 pl-8 py-4">
                    <div className="text-primary-container text-5xl font-black mb-4">840+</div>
                    <h4 className="text-primary font-bold mb-2">Lives transformed</h4>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full mb-4">
                      <div className="bg-tertiary-container h-full w-[85%] rounded-full"></div>
                    </div>
                    <p className="text-on-surface-variant text-sm">Targeting 1,000 by end of 2024</p>
                  </div>
                  <div className="border-l-2 border-tertiary-container/30 pl-8 py-4">
                    <div className="text-primary-container text-5xl font-black mb-4">12</div>
                    <h4 className="text-primary font-bold mb-2">Active Projects</h4>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full mb-4">
                      <div className="bg-tertiary-container h-full w-[40%] rounded-full"></div>
                    </div>
                    <p className="text-on-surface-variant text-sm">Across 4 different regions</p>
                  </div>
                  <div className="border-l-2 border-tertiary-container/30 pl-8 py-4">
                    <div className="text-primary-container text-5xl font-black mb-4">100%</div>
                    <h4 className="text-primary font-bold mb-2">Direct Allocation</h4>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full mb-4">
                      <div className="bg-tertiary-container h-full w-full rounded-full"></div>
                    </div>
                    <p className="text-on-surface-variant text-sm">Donations go straight to builds</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-32">
              <div className="container mx-auto grid md:grid-cols-2 gap-24 items-center">
                <div className="relative">
                  <img
                    alt="Mother and Child in new home"
                    className="w-full aspect-[4/5] object-cover rounded-xl"
                    data-alt="close up emotive portrait of a mother holding her child in a bright modern room with large windows and soft natural light"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALvcWoaqL34rLKyF2b9xso0JnOOlz1ZIGHjSdADmHz8Dx76TT5csQntwubs_aMO5DnXMghJc9jVb6H-hZaCDi40f0nOGE5OmbFxBhTEqbTK_BaXVaZDt8cNlpgKwFdscgDzV7Ojy4WQl58b2ZwElquUDJn0YSEzReOXE0s2pNF2jwgZPzZ_hI4MSrabhTQATzS_zB9kJmAu8nY83Unw2etLBu-6CVJ7pn693Qgdke7Rji0ItgSg8_n0bKg_1RFMYjiulUZaLZ-Wimv"
                  />
                  <div className="absolute -bottom-10 -right-10 bg-tertiary-container p-12 hidden md:block max-w-xs">
                    <span className="text-[#1B0E3D] font-bold text-lg leading-tight">
                      &quot;This isn&apos;t charity. This is the restoration of the human spirit through the art of living.&quot;
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-primary text-5xl font-black tracking-tighter leading-none mb-12">
                    The Architects <br />of Hope.
                  </h2>
                  <div className="space-y-8 text-on-surface-variant text-lg leading-relaxed">
                    <p>
                      Founded by a collective of designers, builders, and social workers, iam charity was born from a
                      simple realization: temporary fixes create permanent cycles of poverty.
                    </p>
                    <p>
                      Our team works globally to identify regions where housing insecurity is the primary barrier to
                      education and health. We don&apos;t just send supplies; we send experts to train local crews, ensuring the
                      knowledge to build remains long after we are gone.
                    </p>
                    <a
                      className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-widest text-sm hover:gap-6 transition-all duration-300 group"
                      href="#"
                    >
                      Our Financial Reports
                      <span className="material-symbols-outlined text-tertiary-container group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-primary-container py-24 text-center">
              <div className="container">
                <div className="max-w-3xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                  Be part of the blueprint.
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <button className="bg-tertiary-container text-[#1B0E3D] px-12 py-5 rounded-md font-bold text-lg tracking-tight hover:scale-105 transition-all shadow-[0_20px_40px_rgba(201,168,76,0.2)]">
                    START A DONATION
                  </button>
                  <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-md font-bold text-lg tracking-tight hover:bg-white/20 transition-all">
                    VOLUNTEER NOW
                  </button>
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

export default About;
