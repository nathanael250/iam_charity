import { Link } from "react-router";
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  Heart,
  Home as HomeIcon,
  Mail,
  MapPin,
  Quote,
  Send,
  ShieldCheck,
  Smile,
  UserRound,
  Users,
} from "lucide-react";
import { mockProjects } from "../../data/mockData";

const projectImages = [
  "from-stone-800 via-amber-900 to-stone-500",
  "from-slate-800 via-yellow-900 to-stone-500",
  "from-zinc-900 via-stone-700 to-amber-800",
];

const testimonials = [
  {
    quote:
      "It feels amazing to know my contribution helped build a home for a family. This organization is truly making a difference.",
    name: "Anita M.",
    role: "Donor",
  },
  {
    quote:
      "Volunteering with this team opened my eyes. The love and dedication here is inspiring.",
    name: "Jean Paul.",
    role: "Volunteer",
  },
  {
    quote:
      "Transparent, trustworthy, and effective. I am proud to support such an incredible mission.",
    name: "Sarah K.",
    role: "Monthly Donor",
  },
];

export function Home() {
  const activeProjects = mockProjects.slice(0, 3);

  const stats = [
    {
      icon: HomeIcon,
      value: "1,240+",
      label: "Families Housed",
      detail: "Since 2018",
    },
    {
      icon: ShieldCheck,
      value: "98%",
      label: "Still in Stable Housing",
      detail: "After 2 Years",
    },
    {
      icon: Users,
      value: "34",
      label: "Communities",
      detail: "Transformed",
    },
    {
      icon: Heart,
      value: "2,500+",
      label: "Generous Donors",
      detail: "Worldwide",
    },
  ];

  const volunteerReasons = [
    {
      icon: HandHeart,
      title: "Make an Impact",
      text: "Help families and change lives.",
    },
    {
      icon: UserRound,
      title: "Use Your Skills",
      text: "Share your talents with purpose.",
    },
    {
      icon: CalendarDays,
      title: "Flexible Opportunities",
      text: "Join activities that fit your schedule.",
    },
    {
      icon: Smile,
      title: "Grow Together",
      text: "Be part of a caring community.",
    },
  ];

  return (
    <div className="bg-white text-[#111226]">
      <section className="relative overflow-hidden bg-[#09082f] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-full md:w-[68%] bg-[radial-gradient(circle_at_70%_36%,rgba(255,255,255,0.3),transparent_18%),linear-gradient(110deg,rgba(9,8,47,0.98)_0%,rgba(9,8,47,0.82)_30%,rgba(9,8,47,0.18)_58%,rgba(9,8,47,0.0)_100%),linear-gradient(135deg,#815b34_0%,#d2a76b_38%,#6d7b50_72%,#b8d7e8_100%)]" />
          <div className="absolute right-[8%] top-10 hidden h-52 w-80 rotate-[-7deg] border-t-[10px] border-[#8b5527] md:block">
            <div className="absolute left-8 top-3 h-44 w-1 rotate-[-28deg] bg-[#7a4b24]" />
            <div className="absolute left-24 top-0 h-44 w-1 rotate-[-12deg] bg-[#7a4b24]" />
            <div className="absolute left-44 top-0 h-44 w-1 rotate-[14deg] bg-[#7a4b24]" />
            <div className="absolute left-60 top-4 h-44 w-1 rotate-[34deg] bg-[#7a4b24]" />
          </div>
          <div className="absolute bottom-0 right-[4%] hidden h-[300px] w-[500px] md:block">
            <div className="absolute bottom-0 right-0 h-64 w-80 rounded-t-sm bg-[#cda575] shadow-2xl">
              <div className="absolute left-10 top-20 h-28 w-16 bg-[#2f241d]" />
              <div className="absolute right-14 top-24 h-16 w-16 bg-[#221b18]" />
            </div>
            <FamilyFigure className="absolute bottom-0 right-5 h-64 w-32" shirt="#27342d" />
            <FamilyFigure className="absolute bottom-0 right-40 h-48 w-24" shirt="#8a7f4a" />
            <FamilyFigure className="absolute bottom-0 right-56 h-40 w-20" shirt="#614337" />
            <FamilyFigure className="absolute bottom-0 right-72 h-56 w-28" shirt="#9c756c" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#d4a928] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-black/20">
              Building Homes. Restoring Hope.
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
              Together, we build homes and transform lives.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/86 sm:text-lg">
              We mobilize support to build safe homes and provide essentials
              for homeless and vulnerable families.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-[#d4a928] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-[#bc941f]"
              >
                Donate Now
                <Heart className="h-4 w-4" />
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-white/40 bg-white/5 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/12"
              >
                <Users className="h-4 w-4 text-[#d4a928]" />
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 rounded-lg bg-white p-6 shadow-xl shadow-slate-900/12 md:grid-cols-4 md:p-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f0e0]">
                  <Icon className="h-6 w-6 text-[#c59c26]" />
                </div>
                <div className="text-2xl font-black text-[#101126] md:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#c59c26]">
              Our Current Focus
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#111226] md:text-4xl">
              Active Support Projects
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Every project represents a family&apos;s hope for a better
              tomorrow.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-3 rounded-md bg-[#09082f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#171352]"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 text-[#d4a928]" />
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {activeProjects.map((project, index) => {
            const progress = Math.min(
              Math.round((project.currentAmount / project.targetAmount) * 100),
              100,
            );
            const daysLeft = [12, 18, 20][index] ?? 15;
            return (
              <article
                key={project.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div
                  className={`relative h-40 bg-gradient-to-br ${projectImages[index]}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.35))]" />
                  <div className="absolute bottom-0 left-8 h-24 w-28 rounded-t-sm bg-stone-300/55 shadow-lg">
                    <div className="absolute left-4 top-8 h-12 w-8 bg-stone-950/60" />
                    <div className="absolute right-4 top-7 h-8 w-8 bg-stone-950/50" />
                  </div>
                  <span className="absolute left-4 top-4 rounded-md bg-[#d4a928] px-3 py-1 text-xs font-bold text-white">
                    {index === 2 ? "Daily Needs" : "Housing"}
                  </span>
                  <button
                    type="button"
                    aria-label="Save project"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#09082f] shadow-md"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-1 text-base font-black text-[#111226]">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-[#d4a928]" />
                    {project.location}
                  </p>
                  <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">
                    {project.story}
                  </p>
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold">
                      <span className="sr-only">Project progress</span>
                      <span />
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#d4a928]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-black text-[#111226]">
                        {formatRwf(project.currentAmount)}
                      </p>
                      <p className="text-xs text-slate-500">
                        raised of {formatRwf(project.targetAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-[#111226]">{daysLeft}</p>
                      <p className="text-xs text-slate-500">Days Left</p>
                    </div>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#d4a928]/70 px-4 py-3 text-sm font-bold text-[#c59c26] transition hover:bg-[#d4a928] hover:text-white"
                  >
                    View Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#c59c26]">
              Our Impact
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#111226] md:text-4xl">
              Real Change.
              <br />
              Real People.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              We don&apos;t just build houses, we build stronger communities and
              brighter futures.
            </p>
            <Link
              to="/impact-stories"
              className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#d4a928] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#bc941f]"
            >
              See More Stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-2">
            <BeforeAfterCard label="Before" tone="dark" />
            <BeforeAfterCard label="After" tone="light" />
            <div className="absolute bottom-[-24px] left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg bg-[#09082f] px-7 py-4 text-white shadow-xl shadow-slate-900/25">
              <HomeIcon className="h-8 w-8 text-[#d4a928]" />
              <div>
                <p className="text-2xl font-black text-[#d4a928]">210+</p>
                <p className="text-xs font-semibold">Homes Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#09082f] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_2fr] lg:px-8">
          <div>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d4a928]">
              <Users className="h-8 w-8 text-[#d4a928]" />
            </div>
            <h2 className="text-3xl font-black leading-tight">
              Be the Reason
              <br />
              Someone Smiles Today
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Your time and skills can make a huge difference in someone&apos;s
              life.
            </p>
            <Link
              to="/volunteer"
              className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#d4a928] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#bc941f]"
            >
              Become a Volunteer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {volunteerReasons.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border-white/12 border-l px-5 py-4"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4a928]/80">
                    <Icon className="h-7 w-7 text-[#d4a928]" />
                  </div>
                  <h3 className="text-sm font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/70">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#c59c26]">
              What People Say
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#111226] md:text-4xl">
              Words From Our Supporters
            </h2>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className="rounded-lg bg-white p-7 shadow-xl shadow-slate-900/7"
              >
                <Quote className="h-9 w-9 fill-[#d4a928] text-[#d4a928]" />
                <p className="mt-5 min-h-24 text-sm leading-7 text-slate-600">
                  {item.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a928] to-[#09082f] text-sm font-black text-white">
                    {index === 1 ? "JP" : item.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#111226]">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-9 flex justify-center gap-2">
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={`h-2 w-2 rounded-full ${
                  dot === 0 ? "bg-[#d4a928]" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 sm:px-6 md:grid-cols-[1fr_1.4fr] lg:px-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d4a928]">
              <Mail className="h-8 w-8 text-[#09082f]" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#111226]">
                Stay Updated
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                Subscribe to our newsletter and get the latest updates on our
                projects and impact stories.
              </p>
            </div>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="h-12 flex-1 rounded-md border border-slate-200 bg-white px-5 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#d4a928]"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#09082f] px-7 text-sm font-bold text-white transition hover:bg-[#171352]"
            >
              Subscribe
              <Send className="h-4 w-4 text-[#d4a928]" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function formatRwf(amount: number) {
  return `${amount.toLocaleString()} Rwf`;
}

function FamilyFigure({
  className,
  shirt,
}: {
  className: string;
  shirt: string;
}) {
  return (
    <div className={className}>
      <div className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full bg-[#5b3526]" />
      <div
        className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 rounded-t-full"
        style={{ height: "78%", backgroundColor: shirt }}
      />
    </div>
  );
}

function BeforeAfterCard({
  label,
  tone,
}: {
  label: string;
  tone: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <div
      className={`relative h-64 overflow-hidden rounded-lg shadow-lg ${
        isLight
          ? "bg-[linear-gradient(145deg,#e9eef0_0%,#f9faf9_45%,#cbb08d_100%)]"
          : "bg-[linear-gradient(145deg,#4b392b_0%,#77604c_48%,#231f1a_100%)]"
      }`}
    >
      <span
        className={`absolute left-5 top-4 rounded-md px-3 py-1 text-xs font-bold text-white ${
          isLight ? "bg-[#d4a928]" : "bg-[#09082f]"
        }`}
      >
        {label}
      </span>
      <div
        className={`absolute bottom-0 left-1/2 h-44 w-56 -translate-x-1/2 rounded-t-sm ${
          isLight ? "bg-[#efe6d7]" : "bg-[#594334]"
        }`}
      >
        <div
          className={`absolute left-10 top-16 h-24 w-12 ${
            isLight ? "bg-[#9c4a24]" : "bg-[#201915]"
          }`}
        />
        <div
          className={`absolute right-10 top-16 h-12 w-12 ${
            isLight ? "bg-[#bad7e8]" : "bg-[#1b1714]"
          }`}
        />
        <div
          className={`absolute -top-8 left-[-14px] h-10 w-64 skew-x-[-20deg] ${
            isLight ? "bg-[#a7a197]" : "bg-[#2b211a]"
          }`}
        />
      </div>
    </div>
  );
}
