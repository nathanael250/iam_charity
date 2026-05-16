import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import heroImage from "../assets/hello_sec-img_1.png";
import familyHome from "../assets/family_images/c_img2.png";
import schoolImage from "../assets/family_images/c_img6.png";
import foodImage from "../assets/family_images/c_img3.png";
import healthImage from "../assets/family_images/c_img4.png";
import environmentImage from "../assets/family_images/c_img5.png";
import beforeImage from "../assets/imact stories/before.png";
import afterImage from "../assets/imact stories/after.png";

const projects = [
  {
    icon: "menu_book",
    title: "School Supplies for Children",
    location: "Gicumbi District",
    image: schoolImage,
    summary: "Provide essential school supplies to help children learn and build a better future.",
    raised: "$3,200",
    goal: "$5,000",
    progress: 64,
  },
  {
    icon: "room_service",
    title: "Food Support Program",
    location: "Nyabihu District",
    image: foodImage,
    summary: "Distribute food packages to families facing hunger and food insecurity.",
    raised: "$6,400",
    goal: "$10,000",
    progress: 64,
  },
  {
    icon: "health_and_safety",
    title: "Community Health Support",
    location: "Muhanga, Rwanda",
    image: healthImage,
    summary: "Support local health centers with medicine, equipment, and resources.",
    raised: "$4,800",
    goal: "$7,500",
    progress: 64,
  },
  {
    icon: "eco",
    title: "Clean Environment Initiative",
    location: "Kigali, Rwanda",
    image: environmentImage,
    summary: "Promote clean and healthy communities through cleanup and tree planting.",
    raised: "$2,100",
    goal: "$4,000",
    progress: 53,
  },
];

const stats = [
  { icon: "home", value: "1,240+", label: "Homes Built" },
  { icon: "groups", value: "2,800+", label: "Families Helped" },
  { icon: "volunteer_activism", value: "4,100+", label: "Volunteers Involved" },
  { icon: "location_on", value: "34+", label: "Communities Reached" },
];

const storyPairs = [
  {
    before: beforeImage,
    after: afterImage,
    title: "The Mukamana Family",
    text: "From a leaking shelter to a safe and beautiful home. Your support changed their lives.",
  },
  {
    before: schoolImage,
    after: environmentImage,
    title: "From Struggle to School",
    text: "With your help, these children got school supplies and the chance to dream bigger.",
  },
];

const Activities = () => {
  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">

        <section className="bg-white py-8">
          <div className="container grid overflow-hidden rounded-lg border border-[#ECE7D9] bg-white shadow-[0_18px_46px_rgba(17,14,47,0.08)] lg:grid-cols-[0.9fr_1fr]">
            <div className="relative min-h-[330px]">
              <img src={familyHome} alt="Family standing in front of a completed home" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-md bg-[#17142F] px-4 py-3 text-xs font-extrabold uppercase text-white">
                <span className="material-symbols-outlined text-[17px] text-[#C9A84C]">star</span>
                Featured Project
              </span>
            </div>
            <div className="p-8 lg:p-10">
              <h2 className="text-3xl font-extrabold leading-tight text-[#17142F]">Build a Home for a Family</h2>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#514E66]">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
                Kigali, Rwanda
              </p>
              <p className="mt-6 max-w-[610px] text-sm font-semibold leading-7 text-[#4F4B60]">
                We build safe, affordable homes for vulnerable families who live in unsafe and inadequate shelters.
              </p>
              <div className="mt-7 flex items-end justify-between gap-5">
                <p className="text-base font-extrabold text-[#17142F]">
                  $18,750 <span className="font-semibold text-[#4F4B60]">raised of $25,000 goal</span>
                </p>
                <p className="font-extrabold text-[#17142F]">75%</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#E5E2EA]">
                <div className="h-full w-[75%] rounded-full bg-[#D0A733]" />
              </div>
              <div className="mt-8 grid grid-cols-3 divide-x divide-[#EAE5ED]">
                {[
                  ["groups", "12", "Families to help"],
                  ["calendar_month", "45", "Days left"],
                  ["favorite", "360", "Donors"],
                ].map(([icon, value, label]) => (
                  <div key={label} className="flex items-center gap-3 px-4 first:pl-0">
                    <span className="material-symbols-outlined text-[30px] text-[#17142F]">{icon}</span>
                    <div>
                      <p className="text-lg font-extrabold">{value}</p>
                      <p className="text-xs font-semibold text-[#514E66]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/donate"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#17142F] px-7 py-4 text-sm font-extrabold text-white transition hover:bg-[#25204A]"
              >
                View Project
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#17142F]">Our Other Active Projects</h2>
              <div className="mx-auto mt-3 h-[3px] w-12 bg-[#C9A84C]" />
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <article key={project.title} className="overflow-hidden rounded-lg border border-[#EEE9DA] bg-white shadow-[0_14px_38px_rgba(17,14,47,0.07)]">
                  <div className="relative h-40">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#C9A84C] shadow-lg">
                      <span className="material-symbols-outlined text-[34px]">{project.icon}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-11">
                    <h3 className="text-lg font-extrabold leading-6 text-[#17142F]">{project.title}</h3>
                    <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#6E697B]">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {project.location}
                    </p>
                    <p className="mt-5 min-h-[78px] text-sm font-semibold leading-7 text-[#4F4B60]">{project.summary}</p>
                    <div className="mt-5 flex justify-between text-sm">
                      <p className="font-extrabold text-[#17142F]">
                        {project.raised} <span className="font-semibold text-[#6E697B]">raised of {project.goal}</span>
                      </p>
                      <p className="font-extrabold">{project.progress}%</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E2EA]">
                      <div className="h-full rounded-full bg-[#D0A733]" style={{ width: `${project.progress}%` }} />
                    </div>
                    <Link to="/donate" className="mt-7 inline-flex items-center gap-3 text-sm font-extrabold text-[#C49B2E]">
                      Learn More
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-7">
          <div className="container">
            <div className="grid gap-6 rounded-lg bg-[#FBF7EF] px-8 py-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className={["flex items-center justify-center gap-5", index !== 0 ? "lg:border-l lg:border-[#DED7C7]" : ""].join(" ")}>
                  <span className="material-symbols-outlined text-[42px] text-[#C9A84C]">{stat.icon}</span>
                  <div>
                    <p className="text-3xl font-extrabold text-[#17142F]">{stat.value}</p>
                    <p className="text-sm font-bold text-[#514E66]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-3">
          <div className="container">
            <h2 className="text-3xl font-extrabold text-[#17142F]">Real Impact. Real Stories.</h2>
            <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {storyPairs.map((story) => (
                <article key={story.title} className="grid gap-5 sm:grid-cols-[0.95fr_1fr_1.2fr] sm:items-center">
                  <div className="relative overflow-hidden rounded-md">
                    <img src={story.before} alt={`${story.title} before`} className="h-32 w-full object-cover" />
                    <span className="absolute left-2 top-2 rounded bg-[#17142F] px-2 py-1 text-xs font-extrabold text-white">Before</span>
                  </div>
                  <div className="relative overflow-hidden rounded-md">
                    <img src={story.after} alt={`${story.title} after`} className="h-32 w-full object-cover" />
                    <span className="absolute right-2 top-2 rounded bg-[#C9A84C] px-2 py-1 text-xs font-extrabold text-white">After</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#17142F]">{story.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[#4F4B60]">{story.text}</p>
                    <Link to="/activities" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#C49B2E]">
                      Read Their Story
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
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
                  <h2 className="text-2xl font-extrabold">Every project creates a ripple of hope.</h2>
                  <p className="mt-2 text-sm font-semibold text-white/75">Join us in building stronger communities and brighter futures.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-8 py-4 text-sm font-extrabold text-white transition hover:bg-[#b99737]">
                    Donate Now
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </Link>
                  <Link to="/volunteer" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white/10">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                    Become a Volunteer
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

export default Activities;
