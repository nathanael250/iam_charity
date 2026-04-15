import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ImpactStories from "../components/ImpactStories";
import TopNav from "../components/TopNav";

const activityCategories = [
  {
    label: "Orphan Care",
    title: "Support for Orphans and Vulnerable Children",
    description:
      "We support children who need shelter, school access, nutrition, guidance, and daily care so they can grow in safety and dignity.",
    points: ["School fees, uniforms, and learning materials", "Mentorship, tutoring, and life-skills support"],
    icon: "school",
  },
  {
    label: "Widows Support",
    title: "Widows Empowerment and Family Stability",
    description:
      "We work with widows through practical support, skills training, and income-building opportunities that strengthen families.",
    points: ["Savings groups and vocational training", "Starter support for small income activities"],
    icon: "groups",
  },
  {
    label: "Elderly Care",
    title: "Care for Elderly People in Need",
    description:
      "We serve elderly people facing isolation or hardship through visits, care support, food assistance, and connection to available services.",
    points: ["Home visits and basic care assistance", "Community support and dignity-centered follow-up"],
    icon: "volunteer_activism",
  },
  {
    label: "Emergency Relief",
    title: "Immediate Help for Families in Crisis",
    description:
      "We respond to urgent family needs with practical relief for households facing food insecurity, poor shelter, or sudden hardship.",
    points: ["Food, clothing, and hygiene support", "Short-term family support during crisis periods"],
    icon: "emergency_home",
  },
  {
    label: "Education Support",
    title: "Education and Skills Development",
    description:
      "We help children and vulnerable families access education, training, and personal development that builds long-term independence.",
    points: ["Education support for children in vulnerable homes", "Skills training for self-reliance and growth"],
    icon: "menu_book",
  },
  {
    label: "Community Partnerships",
    title: "Working With Communities and Local Partners",
    description:
      "We collaborate with churches, schools, health centers, and local leaders so the support we give is practical, trusted, and sustainable.",
    points: ["Local partnerships for outreach and referral", "Shared responsibility for stronger community care"],
    icon: "handshake",
  },
];

const impactHighlights = [
  { value: "200+", label: "orphans and vulnerable children in focus" },
  { value: "150", label: "widows targeted through support programs" },
  { value: "100", label: "elderly people planned for direct assistance" },
  { value: "Kigali", label: "and nearby districts in our current reach" },
];

const Activities = () => {
  return (
    <>
      <TopNav />

      <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="container pt-24 pb-32 md:pb-24">
          <section className="py-12 md:py-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-tertiary">Current Activities</p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-primary md:text-7xl">
                  Serving People With Care, Dignity, and Action.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant">
                  Our activities focus on real needs in Rwanda. We support orphans, widows, elderly people, and needy
                  families through care, education, empowerment, relief, and community partnership.
                </p>
              </div>

              <div className="rounded-[28px] border border-surface-container bg-primary-container p-8 text-white">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">
                  Our Direction
                </p>
                <p className="text-lg leading-8 text-white/80">
                  We are not only responding to urgent needs. We are also building stability, restoring dignity, and
                  helping families move toward self-reliance.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-6 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                  >
                    Support This Project
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 py-4 font-bold uppercase tracking-[0.12em] text-white"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-16 md:pb-20">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {impactHighlights.map((item) => (
                <div key={item.label} className="rounded-[24px] bg-primary-container px-8 py-8 text-center text-white">
                  <p className="text-4xl font-black tracking-tight text-tertiary-container">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pb-16 md:pb-20">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">What We Are Doing</p>
              <h2 className="text-4xl font-black tracking-tight text-primary md:text-5xl">Categories of Our Activities</h2>
              <p className="mt-4 text-lg leading-8 text-on-surface-variant">
                These are the main areas where I Am Group is actively working to support vulnerable people and families.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {activityCategories.map((category) => (
                <article
                  key={category.title}
                  className="rounded-[28px] border border-surface-container bg-white p-8 shadow-sm"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-tertiary">{category.label}</p>
                      <h3 className="mt-3 text-2xl font-bold leading-tight text-primary">{category.title}</h3>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-tertiary">{category.icon}</span>
                  </div>

                  <p className="text-base leading-8 text-on-surface-variant">{category.description}</p>

                  <div className="mt-6 space-y-3">
                    {category.points.map((point) => (
                      <div key={point} className="flex gap-3 rounded-2xl bg-surface-container-low px-4 py-4">
                        <span className="material-symbols-outlined mt-1 text-tertiary">check_circle</span>
                        <p className="text-sm leading-7 text-on-surface-variant">{point}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pb-16 md:pb-20">
            <div className="rounded-[32px] border border-surface-container bg-surface-container-low p-8 md:p-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Why These Activities Matter</p>
                  <h2 className="text-3xl font-black tracking-tight text-primary md:text-4xl">
                    Every activity is designed to answer a real need.
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-on-surface-variant">
                    We believe support should be compassionate, practical, and sustainable. That is why our work combines
                    direct assistance with guidance, education, and empowerment.
                  </p>
                </div>

                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </section>

          <ImpactStories />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Activities;
