import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { homeImpactService, homeTestimonialService, impactStatisticService, projectService } from "../services/adminServices";
import { getAssetUrl } from "../services/clientService";
import helloSectionImage from "../assets/hello_sec-img.png";
import beforeImage from "../assets/imact stories/before.png";
import afterImage from "../assets/imact stories/after.png";

const defaultStats = [
  { statistic_key: "families_supported", icon: "home", value: "0", label: "Families Supported", description: "Families who have received support" },
  { statistic_key: "completed_cases", icon: "verified", value: "0", label: "Completed Support Cases", description: "Support cases successfully completed" },
  { statistic_key: "families_housed", icon: "home", value: "0", label: "Families Housed", description: "Since 2018" },
  { statistic_key: "stable_housing", icon: "verified_user", value: "0", label: "Still in Stable Housing", description: "After 2 Years" },
];

const defaultHomeImpact = {
  before_image_url: "",
  after_image_url: "",
  badge_value: "0",
};

const homeStatisticKeys = defaultStats.map((stat) => stat.statistic_key);

const categoryLabels = {
  housing: "Housing",
  daily_needs: "Daily Needs",
  education: "Education",
  health: "Health",
  emergency: "Emergency",
  other: "Other",
};

const formatMoney = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const getDaysLeft = (endDate) => {
  if (!endDate) return null;
  const difference = new Date(endDate).getTime() - Date.now();
  return Math.max(Math.ceil(difference / (1000 * 60 * 60 * 24)), 0);
};

const volunteerReasons = [
  { icon: "volunteer_activism", title: "Make an Impact", text: "Help families and change lives." },
  { icon: "groups", title: "Use Your Skills", text: "Share your talents with purpose." },
  { icon: "event_available", title: "Flexible Opportunities", text: "Join activities that fit your schedule." },
  { icon: "sentiment_satisfied", title: "Grow Together", text: "Be part of a caring community." },
];

const defaultTestimonials = [
  {
    quote: "It feels amazing to know my contribution helped build a home for a family. This organization is truly making a difference.",
    name: "Anita M.",
    role: "Donor",
    initials: "AM",
  },
  {
    quote: "Volunteering with this team opened my eyes. The love and dedication here is inspiring.",
    name: "Jean Paul.",
    role: "Volunteer",
    initials: "JP",
  },
  {
    quote: "Transparent, trustworthy, and effective. I am proud to support such an incredible mission.",
    name: "Sarah K.",
    role: "Monthly Donor",
    initials: "SK",
  },
];

const SectionEyebrow = ({ children }) => (
  <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#C9A84C]">
    {children}
  </p>
);

const Home = () => {
  const [supportCases, setSupportCases] = useState([]);
  const [supportCasesLoading, setSupportCasesLoading] = useState(true);
  const [stats, setStats] = useState(defaultStats);
  const [homeImpact, setHomeImpact] = useState(defaultHomeImpact);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    let isMounted = true;

    projectService
      .list({ status: "active", limit: 3 })
      .then((data) => {
        if (isMounted) setSupportCases(data || []);
      })
      .catch(() => {
        if (isMounted) setSupportCases([]);
      })
      .finally(() => {
        if (isMounted) setSupportCasesLoading(false);
      });

    impactStatisticService
      .list()
      .then((data) => {
        const homepageStats = (data || []).filter((stat) => homeStatisticKeys.includes(stat.statistic_key));
        if (isMounted && homepageStats.length) setStats(homepageStats);
      })
      .catch(() => {
        if (isMounted) setStats(defaultStats);
      });

    homeImpactService
      .get()
      .then((data) => {
        if (isMounted && data) setHomeImpact({ ...defaultHomeImpact, ...data });
      })
      .catch(() => {
        if (isMounted) setHomeImpact(defaultHomeImpact);
      });

    homeTestimonialService
      .list({ limit: 12 })
      .then((data) => {
        if (isMounted && data?.length) setTestimonials(data);
      })
      .catch(() => {
        if (isMounted) setTestimonials(defaultTestimonials);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />
      <main className="pt-[78px]">
        <section className="relative min-h-[calc(100svh-78px)] overflow-hidden bg-[#131129] text-white sm:min-h-[min(700px,calc(100svh-78px))] lg:min-h-[min(700px,calc(100svh-78px))]">
          <img
            src={helloSectionImage}
            alt="Family standing near a home under construction"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131129] via-[#131129]/88 via-65% to-[#131129]/12" />
          <div className="container relative z-10 flex min-h-[calc(100svh-78px)] items-center py-8 sm:min-h-[min(700px,calc(100svh-78px))] sm:py-12 lg:min-h-[min(700px,calc(100svh-78px))] lg:py-14 [@media(max-height:760px)]:items-start [@media(max-height:760px)]:pt-12">
            <div className="max-w-[650px]">
              <span className="inline-flex rounded-md bg-[#C9A84C] px-3 py-1.5 text-xs font-extrabold text-white shadow-lg shadow-black/20 sm:text-sm">
                Here am I. Send me.
              </span>
              <h1 className="mt-5 max-w-[620px] text-[34px] font-extrabold leading-tight tracking-normal sm:mt-6 sm:text-5xl lg:text-[clamp(48px,4.4vw,64px)] [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:text-[clamp(42px,4vw,54px)]">
                Together, we serve with compassion and restore dignity.
              </h1>
              <p className="mt-4 max-w-[540px] text-sm font-semibold leading-6 text-white/82 sm:mt-5 sm:text-base sm:leading-8 [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:leading-7">
                Join I AM Charity in sharing God’s love through practical care and sustainable support for orphans, widows, the elderly, and people in need across Rwanda.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:flex sm:gap-4 [@media(max-height:760px)]:mt-5">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D0A733] px-3 py-3 text-xs font-extrabold text-white shadow-xl shadow-black/20 transition hover:bg-[#bd9525] sm:px-6 sm:py-4 sm:text-sm"
                >
                  Donate Now
                  <span className="material-symbols-outlined text-[19px]">favorite</span>
                </Link>
                <Link
                  to="/volunteer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/45 bg-[#17142F]/30 px-3 py-3 text-center text-xs font-extrabold text-white backdrop-blur-sm transition hover:bg-white/10 sm:px-6 sm:py-4 sm:text-sm"
                >
                  <span className="material-symbols-outlined text-[19px]">person_add</span>
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-16 px-3 sm:px-4">
          <div className="container rounded-lg bg-white px-3 py-6 shadow-[0_18px_48px_rgba(17,14,47,0.14)] sm:px-5 sm:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.statistic_key || stat.label}
                  className={[
                    "px-2 py-5 text-center sm:px-4",
                    index % 2 === 0 ? "border-r border-[#EEE9DA]" : "",
                    index < 2 ? "border-b border-[#EEE9DA] lg:border-b-0" : "",
                    index < stats.length - 1 ? "lg:border-r lg:border-[#EEE9DA]" : "lg:border-r-0",
                  ].join(" ")}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F0E4] text-[#C9A84C] sm:h-14 sm:w-14">
                    <span className="material-symbols-outlined text-[26px] sm:text-[30px]">{stat.icon}</span>
                  </div>
                  <p className="mt-3 text-2xl font-extrabold text-[#17142F] sm:mt-4 sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-[#514E66] sm:text-sm">{stat.label}</p>
                  <p className="text-[11px] font-semibold leading-4 text-[#737083] sm:text-xs">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 pt-8 lg:pb-20 lg:pt-10">
          <div className="container">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionEyebrow>Our Current Focus</SectionEyebrow>
                <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-[#17142F] md:text-4xl">
                  People Who Need Support
                </h2>
                <p className="mt-4 max-w-[560px] text-sm font-semibold leading-7 text-[#666276]">
                  Meet people and families whose lives can change through practical support.
                </p>
              </div>
              <Link
                to="/projects"
                className="inline-flex w-fit items-center justify-center gap-3 rounded-md bg-[#17142F] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#17142F]/20 transition hover:bg-[#25204a]"
              >
                See Who Needs Help
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {supportCases.map((project) => {
                const progress = Math.min(Number(project.progress || 0), 100);
                const daysLeft = getDaysLeft(project.end_date);

                return (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-lg border border-[#E7DDBE] bg-white shadow-[0_12px_36px_rgba(17,14,47,0.08)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    {project.main_image ? (
                      <img src={getAssetUrl(project.main_image)} alt={project.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#F6F1E5] text-[#C49B2E]">
                        <span className="material-symbols-outlined text-[48px]">image</span>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-md bg-[#C9A84C] px-3 py-2 text-xs font-extrabold text-white">
                      {categoryLabels[project.category] || "Support"}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-extrabold leading-6 text-[#17142F]">{project.title}</h3>
                    <p className="mt-3 flex items-center gap-1 text-sm font-bold text-[#7A7488]">
                      <span className="material-symbols-outlined text-[18px] text-[#C9A84C]">location_on</span>
                      {project.location || "Rwanda"}
                    </p>
                    <p className="mt-4 min-h-[56px] text-sm font-semibold leading-7 text-[#625E72]">
                      {project.short_description || "Support this person or family through practical assistance."}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ECE8F0]">
                        <div className="h-full rounded-full bg-[#C9A84C]" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-sm font-extrabold text-[#514E66]">{progress}%</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-extrabold text-[#17142F]">{formatMoney(project.raised_amount, project.currency || "USD")}</p>
                        <p className="text-xs font-semibold text-[#777386]">raised of {formatMoney(project.target_amount, project.currency || "USD")}</p>
                      </div>
                      <div>
                        <p className="font-extrabold text-[#17142F]">{daysLeft === null ? "Open" : daysLeft}</p>
                        <p className="text-xs font-semibold text-[#777386]">{daysLeft === null ? "No deadline" : "Days Left"}</p>
                      </div>
                    </div>
                    <Link
                      to={`/needs/${project.id}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#D7B34C] px-4 py-3 text-sm font-extrabold text-[#C49B2E] transition hover:bg-[#C9A84C] hover:text-white"
                    >
                      View Their Need
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
                );
              })}

              {supportCasesLoading ? (
                <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-[#E7DDBE] text-sm font-bold text-[#777386] lg:col-span-3">
                  Loading support cases...
                </div>
              ) : null}

              {!supportCasesLoading && !supportCases.length ? (
                <div className="flex min-h-52 items-center justify-center rounded-lg border border-dashed border-[#E7DDBE] px-6 text-center text-sm font-bold text-[#777386] lg:col-span-3">
                  No active support cases are available right now.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAF6] py-9 sm:py-14 lg:py-16">
          <div className="container grid gap-7 sm:gap-10 lg:grid-cols-[0.68fr_1.55fr] lg:items-center">
            <div>
              <SectionEyebrow>Our Impact</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#17142F] sm:text-4xl">
                Real Change. <br className="hidden sm:block" /> Real People.
              </h2>
              <p className="mt-3 max-w-[390px] text-sm font-semibold leading-6 text-[#666276] sm:mt-6 sm:leading-7">
                We do not just build houses, we build stronger communities and brighter futures.
              </p>
              <Link
                to="/impact-stories"
                className="mt-5 inline-flex items-center gap-3 rounded-md bg-[#D0A733] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#C9A84C]/25 transition hover:bg-[#bd9525] sm:mt-8 sm:px-6 sm:py-4"
              >
                See More Stories
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="relative grid grid-cols-2 gap-3 pb-9 sm:gap-6 sm:pb-10 md:pb-8">
              <div className="relative overflow-hidden rounded-lg shadow-[0_14px_36px_rgba(17,14,47,0.12)]">
                <img src={homeImpact.before_image_url ? getAssetUrl(homeImpact.before_image_url) : beforeImage} alt="Home before support" className="h-44 w-full object-cover sm:h-[310px]" />
                <span className="absolute left-2 top-2 rounded-md bg-[#17142F] px-3 py-1.5 text-xs font-extrabold text-white sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                  Before
                </span>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-[0_14px_36px_rgba(17,14,47,0.12)]">
                <img src={homeImpact.after_image_url ? getAssetUrl(homeImpact.after_image_url) : afterImage} alt="Home after support" className="h-44 w-full object-cover sm:h-[310px]" />
                <span className="absolute left-2 top-2 rounded-md bg-[#C9A84C] px-3 py-1.5 text-xs font-extrabold text-white sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                  After
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#17142F] px-5 py-3 text-white shadow-xl sm:px-8 sm:py-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="material-symbols-outlined text-[28px] text-[#C9A84C] sm:text-[38px]">home</span>
                  <div>
                    <p className="text-xl font-extrabold text-[#D0A733] sm:text-3xl">{homeImpact.badge_value}</p>
                    <p className="text-[10px] font-bold text-white/80 sm:text-xs">Homes Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#14112D] py-8 text-white sm:py-16 lg:py-20">
          <div className="container grid gap-7 sm:gap-9 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-10">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C] sm:h-16 sm:w-16">
                <span className="material-symbols-outlined text-[25px] sm:text-[34px]">diversity_1</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:mt-7 sm:text-3xl md:text-4xl">
                Be the Reason <br className="hidden sm:block" /> Someone Smiles Today
              </h2>
              <p className="mt-3 max-w-[430px] text-sm font-semibold leading-6 text-white/72 sm:mt-5 sm:leading-7">
                Your time and skills can make a huge difference in someone's life.
              </p>
              <Link
                to="/volunteer"
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#D0A733] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#bd9525] sm:mt-7 sm:w-auto sm:px-6 sm:py-4"
              >
                Become a Volunteer
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {volunteerReasons.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    "min-w-0",
                    index % 2 === 1 ? "border-l border-white/15 pl-4 sm:pl-6" : "",
                    index > 1 ? "border-t border-white/15 pt-8 lg:border-t-0 lg:pt-0" : "",
                    index > 0 ? "lg:border-l lg:border-white/15 lg:pl-7" : "lg:pl-0",
                  ].join(" ")}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C] sm:h-16 sm:w-16">
                    <span className="material-symbols-outlined text-[26px] sm:text-[32px]">{item.icon}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-extrabold leading-5 sm:mt-6 sm:text-base">{item.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-white/72 sm:text-sm sm:leading-6">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white py-10 sm:py-16 lg:py-20">
          <div className="container">
            <div className="text-center">
              <SectionEyebrow>What People Say</SectionEyebrow>
              <h2 className="mx-auto mt-2 max-w-[330px] text-2xl font-extrabold leading-tight text-[#17142F] sm:max-w-none sm:text-3xl md:text-4xl">
                Words From Our Supporters
              </h2>
            </div>
            <div className="hide-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 sm:mx-0 sm:mt-11 sm:grid sm:grid-cols-2 sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="w-[86%] shrink-0 snap-center rounded-lg bg-white p-5 shadow-[0_12px_34px_rgba(17,14,47,0.08)] sm:w-auto sm:p-8"
                >
                  <span className="text-4xl font-extrabold leading-none text-[#C9A84C] sm:text-6xl">“</span>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#4F4B60] sm:mt-2 sm:min-h-[112px] sm:leading-7">
                    {testimonial.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17142F] text-xs font-extrabold text-white sm:h-12 sm:w-12 sm:text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#17142F] sm:text-base">{testimonial.name}</p>
                      <p className="text-xs font-bold text-[#777386]">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {testimonials.length > 3 ? <p className="mt-1 text-center text-xs font-bold text-[#8A8796] sm:hidden">Swipe to read more</p> : null}
            {testimonials.length > 3 ? (
              <div className="mt-9 hidden justify-center gap-2 sm:flex">
                {testimonials.map((testimonial, index) => (
                  <span
                    key={testimonial.id || testimonial.name || index}
                    className={`h-3 w-3 rounded-full ${index === 0 ? "bg-[#C9A84C]" : "bg-[#DED9E5]"}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-[#FAF8F2] py-7 sm:py-12">
          <div className="container grid gap-5 sm:gap-7 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="flex items-start gap-3 sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A84C] text-[#17142F] sm:h-16 sm:w-16">
                <span className="material-symbols-outlined text-[24px] sm:text-[32px]">mail</span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#17142F] sm:text-2xl">Stay Updated</h2>
                <p className="mt-1 max-w-[460px] text-xs font-semibold leading-5 text-[#666276] sm:mt-2 sm:text-sm sm:leading-7">
                  Subscribe to receive updates about people who need support and stories of lives changed.
                </p>
              </div>
            </div>
            <form className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-12 min-w-0 rounded-md border border-[#E6E0D2] bg-white px-3 text-xs font-semibold shadow-sm outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C] sm:h-14 sm:px-5 sm:text-sm"
              />
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#17142F] px-4 text-xs font-extrabold text-white transition hover:bg-[#25204a] sm:h-14 sm:gap-3 sm:px-7 sm:text-sm"
              >
                Subscribe
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
