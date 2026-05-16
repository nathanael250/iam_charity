import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import helpNeeds from "../data/helpNeeds";
import helloSectionImage from "../assets/hello_sec-img.png";
import heroFamily from "../assets/family_images/c_img1.png";
import homeImage from "../assets/family_images/c_img2.png";
import supportImage from "../assets/family_images/c_img3.png";
import beforeImage from "../assets/imact stories/before.png";
import afterImage from "../assets/imact stories/after.png";

const stats = [
  { icon: "home", value: "1,240+", label: "Families Housed", meta: "Since 2018" },
  { icon: "verified_user", value: "98%", label: "Still in Stable Housing", meta: "After 2 Years" },
  { icon: "groups", value: "34", label: "Communities", meta: "Transformed" },
  { icon: "favorite", value: "2,500+", label: "Generous Donors", meta: "Worldwide" },
];

const projects = [
  {
    category: "Housing",
    title: "Build a Home for Mukamazina Family",
    place: "Kigali, Kabuga",
    image: heroFamily,
    summary: "Help a family of 3 living in a temporary shelter build a safe and stable home.",
    raised: "1,600,000 Rwf",
    goal: "2,000,000 Rwf",
    days: "12",
    progress: 80,
  },
  {
    category: "Housing",
    title: "New Home for Nyiransabimana Family",
    place: "Rulindo, Cyinzuzi",
    image: homeImage,
    summary: "This family of 4 lives in very poor condition. Let us give them a decent place to call home.",
    raised: "1,300,000 Rwf",
    goal: "2,000,000 Rwf",
    days: "18",
    progress: 65,
  },
  {
    category: "Daily Needs",
    title: "Support for Basic Household Needs",
    place: "Kigali, Nyarugenge",
    image: supportImage,
    summary: "Support this family with mattresses, cooking tools, and essential household items.",
    raised: "400,000 Rwf",
    goal: "1,000,000 Rwf",
    days: "20",
    progress: 40,
  },
];

const volunteerReasons = [
  { icon: "volunteer_activism", title: "Make an Impact", text: "Help families and change lives." },
  { icon: "groups", title: "Use Your Skills", text: "Share your talents with purpose." },
  { icon: "event_available", title: "Flexible Opportunities", text: "Join activities that fit your schedule." },
  { icon: "sentiment_satisfied", title: "Grow Together", text: "Be part of a caring community." },
];

const testimonials = [
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
  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />
      <main className="pt-[78px]">
        <section className="relative min-h-[700px] overflow-hidden bg-[#131129] text-white">
          <img
            src={helloSectionImage}
            alt="Family standing near a home under construction"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131129] via-[#131129]/88 via-65% to-[#131129]/12" />
          <div className="container relative z-10 flex min-h-[700px] items-center py-16">
            <div className="max-w-[650px]">
              <span className="inline-flex rounded-md bg-[#C9A84C] px-3 py-1 text-sm font-extrabold text-white shadow-lg shadow-black/20">
                Building Homes. Restoring Hope.
              </span>
              <h1 className="mt-7 max-w-[620px] text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-[64px]">
                Together, we build homes and transform lives.
              </h1>
              <p className="mt-6 max-w-[520px] text-base font-semibold leading-8 text-white/82">
                We mobilize support to build safe homes and provide essentials for homeless and vulnerable families.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D0A733] px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-black/20 transition hover:bg-[#bd9525]"
                >
                  Donate Now
                  <span className="material-symbols-outlined text-[19px]">favorite</span>
                </Link>
                <Link
                  to="/volunteer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/45 bg-[#17142F]/30 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-[19px]">person_add</span>
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-16 px-4">
          <div className="container rounded-lg bg-white px-5 py-8 shadow-[0_18px_48px_rgba(17,14,47,0.14)]">
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0E4] text-[#C9A84C]">
                    <span className="material-symbols-outlined text-[30px]">{stat.icon}</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold text-[#17142F]">{stat.value}</p>
                  <p className="mt-1 text-sm font-bold text-[#514E66]">{stat.label}</p>
                  <p className="text-xs font-semibold text-[#737083]">{stat.meta}</p>
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
                  Active Support Projects
                </h2>
                <p className="mt-4 max-w-[560px] text-sm font-semibold leading-7 text-[#666276]">
                  Every project represents a family's hope for a better tomorrow.
                </p>
              </div>
              <Link
                to="/projects"
                className="inline-flex w-fit items-center justify-center gap-3 rounded-md bg-[#17142F] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#17142F]/20 transition hover:bg-[#25204a]"
              >
                View All Projects
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="overflow-hidden rounded-lg border border-[#E7DDBE] bg-white shadow-[0_12px_36px_rgba(17,14,47,0.08)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-md bg-[#C9A84C] px-3 py-2 text-xs font-extrabold text-white">
                      {project.category}
                    </span>
                    <button
                      aria-label="Save project"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#17142F] shadow-md"
                    >
                      <span className="material-symbols-outlined text-[22px]">favorite</span>
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-extrabold leading-6 text-[#17142F]">{project.title}</h3>
                    <p className="mt-3 flex items-center gap-1 text-sm font-bold text-[#7A7488]">
                      <span className="material-symbols-outlined text-[18px] text-[#C9A84C]">location_on</span>
                      {project.place}
                    </p>
                    <p className="mt-4 min-h-[56px] text-sm font-semibold leading-7 text-[#625E72]">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ECE8F0]">
                        <div className="h-full rounded-full bg-[#C9A84C]" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-sm font-extrabold text-[#514E66]">{project.progress}%</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-extrabold text-[#17142F]">{project.raised}</p>
                        <p className="text-xs font-semibold text-[#777386]">raised of {project.goal}</p>
                      </div>
                      <div>
                        <p className="font-extrabold text-[#17142F]">{project.days}</p>
                        <p className="text-xs font-semibold text-[#777386]">Days Left</p>
                      </div>
                    </div>
                    <Link
                      to="/donate"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#D7B34C] px-4 py-3 text-sm font-extrabold text-[#C49B2E] transition hover:bg-[#C9A84C] hover:text-white"
                    >
                      View Project
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAF6] py-14 lg:py-16">
          <div className="container grid gap-10 lg:grid-cols-[0.68fr_1.55fr] lg:items-center">
            <div>
              <SectionEyebrow>Our Impact</SectionEyebrow>
              <h2 className="mt-2 text-4xl font-extrabold leading-tight text-[#17142F]">
                Real Change. <br /> Real People.
              </h2>
              <p className="mt-6 max-w-[390px] text-sm font-semibold leading-7 text-[#666276]">
                We do not just build houses, we build stronger communities and brighter futures.
              </p>
              <Link
                to="/activities"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#D0A733] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#C9A84C]/25 transition hover:bg-[#bd9525]"
              >
                See More Stories
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="relative grid gap-6 pb-10 md:grid-cols-2 md:pb-8">
              <div className="relative overflow-hidden rounded-lg shadow-[0_14px_36px_rgba(17,14,47,0.12)]">
                <img src={beforeImage} alt="Home before support" className="h-[310px] w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-md bg-[#17142F] px-4 py-2 text-sm font-extrabold text-white">
                  Before
                </span>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-[0_14px_36px_rgba(17,14,47,0.12)]">
                <img src={afterImage} alt="Home after support" className="h-[310px] w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-md bg-[#C9A84C] px-4 py-2 text-sm font-extrabold text-white">
                  After
                </span>
              </div>
              <div className="bottom-0 left-1/2 z-10 rounded-lg bg-[#17142F] px-8 py-5 text-white shadow-xl md:absolute md:-translate-x-1/2">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[38px] text-[#C9A84C]">home</span>
                  <div>
                    <p className="text-3xl font-extrabold text-[#D0A733]">210+</p>
                    <p className="text-xs font-bold text-white/80">Homes Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#14112D] py-16 text-white lg:py-20">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]">
                <span className="material-symbols-outlined text-[34px]">diversity_1</span>
              </div>
              <h2 className="mt-7 text-3xl font-extrabold leading-tight md:text-4xl">
                Be the Reason <br /> Someone Smiles Today
              </h2>
              <p className="mt-5 max-w-[430px] text-sm font-semibold leading-7 text-white/72">
                Your time and skills can make a huge difference in someone's life.
              </p>
              <Link
                to="/volunteer"
                className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#D0A733] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#bd9525]"
              >
                Become a Volunteer
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {volunteerReasons.map((item) => (
                <div key={item.title} className="border-white/15 lg:border-l lg:pl-7">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]">
                    <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                  </div>
                  <h3 className="mt-6 text-base font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/72">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="container">
            <div className="text-center">
              <SectionEyebrow>What People Say</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-extrabold text-[#17142F] md:text-4xl">
                Words From Our Supporters
              </h2>
            </div>
            <div className="mt-11 grid gap-7 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-lg bg-white p-8 shadow-[0_18px_48px_rgba(17,14,47,0.07)]">
                  <span className="text-6xl font-extrabold leading-none text-[#C9A84C]">“</span>
                  <p className="mt-2 min-h-[112px] text-sm font-semibold leading-7 text-[#4F4B60]">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17142F] text-sm font-extrabold text-white">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-extrabold text-[#17142F]">{testimonial.name}</p>
                      <p className="text-xs font-bold text-[#777386]">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-9 flex justify-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#C9A84C]" />
              <span className="h-3 w-3 rounded-full bg-[#DED9E5]" />
              <span className="h-3 w-3 rounded-full bg-[#DED9E5]" />
              <span className="h-3 w-3 rounded-full bg-[#DED9E5]" />
            </div>
          </div>
        </section>

        <section className="bg-[#FAF8F2] py-12">
          <div className="container grid gap-7 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#C9A84C] text-[#17142F]">
                <span className="material-symbols-outlined text-[32px]">mail</span>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-[#17142F]">Stay Updated</h2>
                <p className="mt-2 max-w-[460px] text-sm font-semibold leading-7 text-[#666276]">
                  Subscribe to our newsletter and get the latest updates on our projects and impact stories.
                </p>
              </div>
            </div>
            <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-14 rounded-md border border-[#E6E0D2] bg-white px-5 text-sm font-semibold shadow-sm outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C]"
              />
              <button
                type="button"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-[#17142F] px-7 text-sm font-extrabold text-white transition hover:bg-[#25204a]"
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
