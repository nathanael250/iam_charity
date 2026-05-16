import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import beforeImage from "../assets/imact stories/before.png";
import afterImage from "../assets/imact stories/after.png";
import familyImage from "../assets/family_images/c_img1.png";
import motherImage from "../assets/family_images/c_img3.png";
import schoolImage from "../assets/family_images/c_img6.png";

const stats = [
  { icon: "home", value: "210+", label: "Homes Completed" },
  { icon: "groups", value: "1,240+", label: "Families Helped" },
  { icon: "volunteer_activism", value: "2,500+", label: "Generous Donors" },
  { icon: "diversity_3", value: "1,100+", label: "Volunteers Involved" },
  { icon: "location_on", value: "34", label: "Communities Transformed" },
];

const filters = [
  ["All Stories", "apps"],
  ["Completed Homes", "home"],
  ["Family Stories", "groups"],
  ["Community Transformation", "favorite"],
  ["Education", "school"],
  ["Healthcare", "favorite"],
  ["Other Stories", "inventory_2"],
];

const stories = [
  {
    category: "Completed Home",
    icon: "home",
    title: "A New Home for the Mukamana Family",
    location: "Kigali, Kabuga",
    before: beforeImage,
    after: afterImage,
    text: "After years of living in a temporary shelter, the Mukamana family now has a safe and decent home.",
    count: "5",
    countLabel: "Family Members",
    date: "May 12, 2024",
  },
  {
    category: "Family Story",
    icon: "favorite",
    title: "A Brighter Future for Nyiransabimana",
    location: "Rulindo, Cyinzuzi",
    before: familyImage,
    after: motherImage,
    text: "With improved housing and support, Nyiransabimana can now provide a better life for her children.",
    count: "4",
    countLabel: "Family Members",
    date: "April 25, 2024",
  },
  {
    category: "Education",
    icon: "menu_book",
    title: "From Dreams to Opportunities",
    location: "Gicumbi District",
    before: schoolImage,
    after: schoolImage,
    text: "We built a new classroom and provided learning materials for 120 children in the community.",
    count: "120",
    countLabel: "Children Benefited",
    date: "March 10, 2024",
  },
];

const transformations = [
  { icon: "groups", title: "Strong Families", text: "Families are stronger and more self-reliant." },
  { icon: "verified_user", title: "Safe Communities", text: "Communities are safer and more united." },
  { icon: "trending_up", title: "Better Opportunities", text: "Access to education and skills creates opportunities." },
  { icon: "eco", title: "Sustainable Change", text: "We build solutions that last for generations." },
];

const ImpactStoriesPage = () => {
  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="grid bg-[#14112D] text-white lg:grid-cols-[0.66fr_1fr]">
          <div className="flex min-h-[370px] items-center px-6 py-12 sm:px-10 lg:pl-[max(3.5rem,calc((100vw-80rem)/2+3.5rem))] lg:pr-12">
            <div className="max-w-[460px]">
              <p className="text-sm font-bold text-white/85">
                <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
                <span className="mx-2">›</span>
                Impact Stories
              </p>
              <h1 className="mt-8 text-[44px] font-extrabold leading-tight md:text-[58px]">Impact Stories</h1>
              <div className="mt-5 h-[3px] w-14 bg-[#C9A84C]" />
              <p className="mt-7 text-base font-semibold leading-8 text-white/88">
                Real stories. Real change. See how your support is transforming lives and building hope for a better tomorrow.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-7 py-4 text-sm font-extrabold text-white">
                  Donate Now
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </Link>
                <Link to="/projects" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#C9A84C] px-7 py-4 text-sm font-extrabold text-white">
                  <span className="material-symbols-outlined text-[18px] text-[#C9A84C]">redeem</span>
                  Support a Project
                </Link>
              </div>
            </div>
          </div>

          <div className="grid min-h-[370px] grid-cols-2">
            <div className="relative border-l border-white/30">
              <img src={beforeImage} alt="Home before support" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/25" />
              <span className="absolute bottom-7 left-7 rounded-md bg-[#17142F] px-4 py-2 text-sm font-extrabold">Before</span>
            </div>
            <div className="relative border-l border-white/80">
              <img src={afterImage} alt="Home after support" className="h-full w-full object-cover" />
              <span className="absolute bottom-7 right-7 rounded-md bg-[#C9A84C] px-4 py-2 text-sm font-extrabold">After</span>
            </div>
            <div className="absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#17142F] shadow-xl lg:flex">
              <span className="material-symbols-outlined text-[24px]">chevron_left</span>
              <span className="material-symbols-outlined text-[24px]">chevron_right</span>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-[-1px] bg-[#FBFAFF] py-5">
          <div className="container rounded-lg bg-white px-6 py-8 shadow-[0_18px_48px_rgba(17,14,47,0.08)]">
            <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat, index) => (
                <div key={stat.label} className={["text-center", index !== 0 ? "lg:border-l lg:border-[#EAE5ED]" : ""].join(" ")}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7EF] text-[#C9A84C]">
                    <span className="material-symbols-outlined text-[36px]">{stat.icon}</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold">{stat.value}</p>
                  <p className="text-sm font-semibold text-[#514E66]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-7">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE9DA] pb-5">
              {filters.map(([label, icon], index) => (
                <button
                  key={label}
                  type="button"
                  className={[
                    "inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-extrabold",
                    index === 0 ? "bg-[#17142F] text-white" : "text-[#17142F] hover:bg-[#FBF7EF]",
                  ].join(" ")}
                >
                  {index !== 0 && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-8">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr_220px] lg:items-start">
              <div>
                <h2 className="text-3xl font-extrabold">Stories of Hope</h2>
                <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              </div>
              <p className="text-sm font-semibold leading-7 text-[#5D586B]">
                Every story is a reminder that together, we can build stronger communities and brighter futures.
              </p>
              <select className="rounded-md border-[#DDD6C8] text-sm font-semibold">
                <option>Most Recent</option>
              </select>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-3">
              {stories.map((story) => (
                <article key={story.title} className="overflow-hidden rounded-lg border border-[#EEE9DA] bg-white shadow-[0_14px_38px_rgba(17,14,47,0.07)]">
                  <div className="grid h-52 grid-cols-2">
                    <div className="relative">
                      <img src={story.before} alt={`${story.title} before`} className="h-full w-full object-cover" />
                      <span className="absolute left-3 top-3 rounded bg-[#17142F] px-3 py-1 text-xs font-extrabold text-white">Before</span>
                    </div>
                    <div className="relative">
                      <img src={story.after} alt={`${story.title} after`} className="h-full w-full object-cover" />
                      <span className="absolute right-3 top-3 rounded bg-[#C9A84C] px-3 py-1 text-xs font-extrabold text-white">After</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#FBF7EA] px-3 py-2 text-xs font-extrabold text-[#C49B2E]">
                      <span className="material-symbols-outlined text-[16px]">{story.icon}</span>
                      {story.category}
                    </span>
                    <h3 className="mt-5 text-xl font-extrabold leading-7">{story.title}</h3>
                    <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#5D586B]">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {story.location}
                    </p>
                    <p className="mt-4 min-h-[72px] text-sm font-semibold leading-7 text-[#5D586B]">{story.text}</p>
                    <div className="mt-6 grid grid-cols-2 gap-5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[22px]">groups</span>
                        <div>
                          <p className="font-extrabold">{story.count}</p>
                          <p className="text-xs font-semibold">{story.countLabel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                        <div>
                          <p className="font-extrabold">{story.date}</p>
                          <p className="text-xs font-semibold">Completed On</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/impact-stories" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#C9A84C] px-5 py-3 text-sm font-extrabold text-[#C49B2E]">
                      Read Full Story
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-6">
          <div className="container">
            <div className="grid gap-8 rounded-lg bg-[#FBFAFF] p-8 lg:grid-cols-[0.85fr_repeat(4,1fr)] lg:items-center">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight">Transformation in Communities</h2>
                <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
                <p className="mt-5 text-sm font-semibold leading-7 text-[#5D586B]">
                  Beyond homes, we transform entire communities through partnership, love, and consistent support.
                </p>
                <Link to="/projects" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#C9A84C] px-6 py-3 text-sm font-extrabold text-white">
                  View More Stories
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
              {transformations.map((item) => (
                <div key={item.title} className="border-[#E4DEEA] text-center lg:border-l lg:px-7">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7EF] text-[#C9A84C]">
                    <span className="material-symbols-outlined text-[34px]">{item.icon}</span>
                  </div>
                  <h3 className="mt-5 text-sm font-extrabold">{item.title}</h3>
                  <p className="mt-3 text-xs font-semibold leading-6 text-[#5D586B]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container">
            <div className="rounded-lg bg-[#17142F] px-8 py-8 text-white shadow-[0_16px_44px_rgba(17,14,47,0.14)]">
              <div className="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]">
                  <span className="material-symbols-outlined text-[38px]">volunteer_activism</span>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">You Can Be Part of the Next Story</h2>
                  <p className="mt-2 text-sm font-semibold text-white/75">Your support today can be someone&apos;s turning point tomorrow.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-8 py-4 text-sm font-extrabold text-white">
                    Donate Now
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </Link>
                  <Link to="/projects" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 px-8 py-4 text-sm font-extrabold text-white">
                    <span className="material-symbols-outlined text-[18px]">redeem</span>
                    Support a Project
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

export default ImpactStoriesPage;
