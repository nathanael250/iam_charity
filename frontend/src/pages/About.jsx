import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { aboutImpactService, impactStatisticService } from "../services/adminServices";
import { getAssetUrl } from "../services/clientService";
import aboutHero from "../assets/hello_sec-img_1.png";
import impactFamily from "../assets/family_images/c_img2.png";

const values = [
  { icon: "volunteer_activism", title: "Compassion", text: "We care deeply about people and act with kindness and empathy." },
  { icon: "groups", title: "Respect", text: "We value every individual regardless of background, belief, or circumstance." },
  { icon: "favorite", title: "Empowerment", text: "We empower families and communities to build a better future." },
  { icon: "diversity_3", title: "Collaboration", text: "We believe in the power of partnerships and working together for greater impact." },
];

const defaultStats = [
  { statistic_key: "families_supported", icon: "home", value: "0", label: "Families Supported", description: "Families who have received support" },
  { statistic_key: "completed_cases", icon: "verified", value: "0", label: "Completed Support Cases", description: "Support cases successfully completed" },
  { statistic_key: "families_housed", icon: "home", value: "0", label: "Families Housed", description: "Since 2018" },
  { statistic_key: "stable_housing", icon: "verified_user", value: "0", label: "Still in Stable Housing", description: "After 2 Years" },
];

const impactStatisticKeys = defaultStats.map((stat) => stat.statistic_key);

const SectionTitle = ({ eyebrow, title, centered = false }) => (
  <div className={centered ? "text-center" : ""}>
    {eyebrow && <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#C9A84C]">{eyebrow}</p>}
    <h2 className="mt-2 text-[26px] font-extrabold leading-tight text-[#17142F] sm:text-[30px] md:text-[34px]">{title}</h2>
    <div className={["mt-3 h-[3px] w-12 bg-[#C9A84C]", centered ? "mx-auto" : ""].join(" ")} />
  </div>
);

const About = () => {
  const [stats, setStats] = useState(defaultStats);
  const [aboutImpact, setAboutImpact] = useState({ impact_image_url: "" });

  useEffect(() => {
    let isMounted = true;

    impactStatisticService
      .list()
      .then((data) => {
        const filteredStats = (data || []).filter((stat) => impactStatisticKeys.includes(stat.statistic_key));
        if (isMounted && filteredStats.length) setStats(filteredStats);
      })
      .catch(() => {
        if (isMounted) setStats(defaultStats);
      });

    aboutImpactService
      .get()
      .then((data) => {
        if (isMounted && data) setAboutImpact(data);
      })
      .catch(() => {
        if (isMounted) setAboutImpact({ impact_image_url: "" });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="relative overflow-hidden bg-[#14112D] text-white">
          <img
            src={aboutHero}
            alt="Mother and child near a home under construction"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14112D] via-[#14112D]/88 via-58% to-[#14112D]/8" />
          <div className="container relative z-10 flex min-h-[190px] items-center py-6 sm:min-h-[240px] sm:py-8 lg:min-h-[270px]">
            <div className="max-w-[500px]">
              <h1 className="text-3xl font-extrabold tracking-normal sm:text-[44px] md:text-[56px]">About Us</h1>
              <div className="mt-3 h-0.5 w-10 bg-[#C9A84C] sm:mt-5 sm:h-[3px] sm:w-14" />
            </div>
          </div>
        </section>

        <section className="bg-white py-9 sm:py-12 lg:py-14">
          <div className="container grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-[1.18fr_1fr_1fr]">
            <div className="col-span-2 pr-0 lg:col-span-1 lg:pr-12">
              <SectionTitle title="Who We Are" />
              <div className="mt-4 space-y-3 text-sm font-semibold leading-6 text-[#4F4B60] sm:mt-7 sm:space-y-6 sm:text-[15px] sm:leading-8">
                <p>
                  I Am Group is a Rwanda-based organization responding to the needs of orphans, widows, the elderly, and people in need through compassionate and practical action.
                </p>
                <p>
                  Our name reflects the biblical call, “Here am I. Send me,” and our commitment to answer that call by restoring dignity and empowering vulnerable lives.
                </p>
              </div>
            </div>

            <article className="rounded-lg bg-gradient-to-br from-[#FBF8EF] to-[#F7F1E4] p-4 shadow-[0_18px_50px_rgba(17,14,47,0.055)] sm:min-h-[340px] sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#C9A84C] shadow-sm sm:h-16 sm:w-16">
                <span className="material-symbols-outlined text-[25px] sm:text-[34px]">visibility</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#17142F] sm:mt-8 sm:text-2xl">Our Vision</h3>
              <div className="mt-2 h-0.5 w-8 bg-[#C9A84C] sm:mt-3 sm:h-[3px] sm:w-12" />
              <p className="mt-3 text-[11px] font-semibold leading-5 text-[#4F4B60] sm:mt-6 sm:text-[15px] sm:leading-8">
                A society where orphans, widows, the elderly, and the needy experience God’s love through practical support, restored dignity, and empowered lives.
              </p>
            </article>

            <article className="rounded-lg bg-gradient-to-br from-[#FCF8FD] to-[#F7F1FA] p-4 shadow-[0_18px_50px_rgba(17,14,47,0.055)] sm:min-h-[340px] sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#C9A84C] shadow-sm sm:h-16 sm:w-16">
                <span className="material-symbols-outlined text-[25px] sm:text-[34px]">track_changes</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#17142F] sm:mt-8 sm:text-2xl">Our Mission</h3>
              <div className="mt-2 h-0.5 w-8 bg-[#C9A84C] sm:mt-3 sm:h-[3px] sm:w-12" />
              <p className="mt-3 text-[11px] font-semibold leading-5 text-[#4F4B60] sm:mt-6 sm:text-[15px] sm:leading-8">
                To heed the biblical call “Here am I. Send me” by delivering compassionate, holistic care and sustainable development to vulnerable groups in Rwanda.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-[#FAFAFC] py-8 sm:py-11">
          <div className="container">
            <SectionTitle title="Our Core Values" centered />
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-10 sm:gap-7 lg:grid-cols-4">
              {values.map((value) => (
                <article key={value.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#E2C66C] bg-white text-[#C9A84C] shadow-sm sm:h-[70px] sm:w-[70px]">
                    <span className="material-symbols-outlined text-[26px] sm:text-[34px]">{value.icon}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-extrabold text-[#17142F] sm:mt-5 sm:text-[15px]">{value.title}</h3>
                  <p className="mx-auto mt-2 max-w-[165px] text-[11px] font-semibold leading-5 text-[#4F4B60] sm:mt-3 sm:max-w-[185px] sm:text-xs sm:leading-6">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-10">
          <div className="container grid gap-6 sm:gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <SectionTitle title="Our Impact in Numbers" />
              <div className="mt-6 grid grid-cols-2 sm:mt-9 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={[
                      "px-2 py-5 text-center sm:px-3",
                      index % 2 === 0 ? "border-r border-[#EAE5ED]" : "",
                      index < 2 ? "border-b border-[#EAE5ED] lg:border-b-0" : "",
                      index > 0 ? "lg:border-l lg:border-[#EAE5ED]" : "",
                      index % 2 === 0 ? "lg:border-r-0" : "",
                    ].join(" ")}
                  >
                    <span className="material-symbols-outlined text-[27px] text-[#C9A84C] sm:text-[34px]">{stat.icon}</span>
                    <p className="mt-2 text-xl font-extrabold text-[#17142F] sm:mt-4 sm:text-[26px]">{stat.value}</p>
                    <p className="mt-1 text-[11px] font-bold leading-4 text-[#514E66] sm:text-xs">{stat.label}</p>
                    <p className="text-[10px] font-semibold leading-4 text-[#777386] sm:text-xs">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={aboutImpact.impact_image_url ? getAssetUrl(aboutImpact.impact_image_url) : impactFamily}
              alt="Family standing in front of a completed home"
              className="h-48 w-full rounded-lg object-cover object-center shadow-[0_16px_44px_rgba(17,14,47,0.1)] sm:h-[294px]"
            />
          </div>
        </section>

        <section className="bg-[#FBFAFF] pb-7 pt-2 sm:pb-14 sm:pt-5">
          <div className="container">
            <div className="rounded-lg border border-[#E7D8AA] bg-gradient-to-r from-[#FBF6E8] to-[#F7F0DF] px-4 py-5 text-[#17142F] shadow-[0_16px_44px_rgba(17,14,47,0.08)] sm:px-8 sm:py-8">
              <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-5 sm:block lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C] bg-white/70 text-[#B88D1D] sm:h-20 sm:w-20">
                  <span className="material-symbols-outlined text-[25px] sm:text-[38px]">volunteer_activism</span>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold sm:text-3xl">Be Part of the Change</h2>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#625E72] sm:mt-2 sm:text-sm">Your support helps us restore dignity and empower vulnerable lives.</p>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-2 sm:mt-7 sm:flex sm:gap-3 lg:col-span-1 lg:mt-0">
                  <Link
                    to="/donate"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-[#C9A84C] px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#b99737] sm:px-7 sm:py-4 sm:text-sm"
                  >
                    Donate Now
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">favorite</span>
                  </Link>
                  <Link
                    to="/volunteer"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#17142F]/25 bg-white/55 px-2 py-2.5 text-center text-[11px] font-extrabold leading-4 text-[#17142F] transition hover:border-[#C9A84C] hover:bg-white sm:px-7 sm:py-4 sm:text-sm"
                  >
                    <span className="material-symbols-outlined hidden text-[18px] sm:inline-block">person_add</span>
                    Become a Volunteer
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
