import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

const focusAreas = [
  "Supporting orphans with care, dignity, and guidance.",
  "Standing with widows through practical and emotional support.",
  "Serving the elderly with compassion, respect, and community care.",
  "Helping needy families move toward stability and self-reliance.",
];

const values = [
  "Faith-led service",
  "Compassion in action",
  "Dignity for every person",
  "Transparency and accountability",
];

const needsWeRespondTo = [
  "Orphans and vulnerable children often lack shelter, nutrition, education, and emotional support.",
  "Widows can face social stigma, property loss, and difficulty providing for their children.",
  "Many elderly people live in isolation without adequate healthcare, food, or family care.",
  "Needy families remain trapped in poverty without access to basic needs, skills, or income opportunities.",
];

const objectives = [
  "Provide immediate relief through food, shelter support, and medical care.",
  "Ensure access to education and skills training for orphans and children of widows.",
  "Offer economic empowerment through vocational training, micro-enterprises, and agriculture support.",
  "Deliver healthcare, nutrition, and psychosocial support to elderly and vulnerable beneficiaries.",
  "Promote community awareness and spiritual encouragement rooted in compassion and service.",
  "Build sustainable systems that help beneficiaries move toward self-reliance.",
];

const programs = [
  {
    title: "Orphan Care Program",
    items: [
      "Support children with shelter, school fees, uniforms, and tutoring.",
      "Provide nutritional meals, health check-ups, and mentorship.",
      "Develop life skills and long-term guidance for vulnerable children.",
    ],
  },
  {
    title: "Widows Empowerment Program",
    items: [
      "Create mutual support and savings groups.",
      "Offer training in tailoring, handicrafts, farming, and small business.",
      "Provide starter support for income-generating activities.",
    ],
  },
  {
    title: "Elderly Support Program",
    items: [
      "Organize home visits with food packages and medical assistance.",
      "Promote social connection through community support activities.",
      "Link elderly beneficiaries to available protection and care systems.",
    ],
  },
  {
    title: "General Support for the Needy",
    items: [
      "Provide emergency relief such as food, clothing, and hygiene kits.",
      "Strengthen families through guidance and practical support.",
      "Connect families to health and legal referral services when needed.",
    ],
  },
];

const supportNeeds = [
  "Support for housing, food, clothing, and essential family care.",
  "School fees, learning materials, and mentorship for children.",
  "Medical support and basic care for elderly and vulnerable people.",
  "Partnerships, volunteers, and in-kind support to strengthen community programs.",
];

const waysToHelp = [
  "Make a donation to support urgent family needs.",
  "Partner with us as a church, school, business, or organization.",
  "Volunteer your time, skills, or professional expertise.",
  "Share our mission with people who can support the work.",
];

const howWeWork = [
  "We work in partnership with local authorities, churches, schools, health centers, and communities.",
  "We begin with identification, listening, and understanding the real needs of beneficiaries.",
  "We combine immediate support with long-term empowerment so families can move toward stability.",
  "We are committed to transparent reporting, accountability, and responsible stewardship.",
];

const sustainability = [
  "Develop strong community partnerships and long-term support systems.",
  "Promote income-generating opportunities within programs where possible.",
  "Train volunteers and local leaders who can continue supporting families.",
  "Encourage lasting dignity, resilience, and contribution within the community.",
];

const About = () => {
  return (
    <>
      <TopNav />

      <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pt-24 pb-32 md:pb-24">
          <section className="bg-primary-container text-white py-20 md:py-28">
            <div className="container">
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.28em] text-tertiary-container">About Us</p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                I Am Group
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-white/80 md:text-2xl">
                “Here am I. Send me.” (Isaiah 6:8)
              </p>
              <p className="mt-6 max-w-4xl text-base leading-8 text-white/80 md:text-lg">
                I Am Group is a faith-based organization in Kigali, Rwanda, committed to serving vulnerable people
                through practical support, spiritual encouragement, and long-term empowerment.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                  to="/donate"
                >
                  Support This Project
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                  to="/activities"
                >
                  View Activities
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container space-y-8">
              <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Who We Are</p>
                <div className="space-y-5 text-lg leading-8 text-on-surface-variant">
                  <p>
                    I Am Group was founded by Mr. Jean Eric HARELIMANA in response to the visible needs of orphans,
                    widows, elderly people, and families facing hardship in Rwanda.
                  </p>
                  <p>
                    Our name reflects a readiness to answer God&apos;s call through service, compassion, and responsibility
                    toward the people who need help most.
                  </p>
                  <p>
                    Our logo, a dove delivering a gift into an open hand, represents peace, guidance, generosity, and
                    hope.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-[28px] border border-surface-container bg-surface-container-low p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Vision</p>
                  <p className="text-lg leading-8 text-on-surface-variant">
                    A society where orphans, widows, the elderly, and the needy experience God&apos;s love through
                    practical support, restored dignity, and empowered lives.
                  </p>
                </div>

                <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Mission</p>
                  <p className="text-lg leading-8 text-on-surface-variant">
                    To heed the biblical call “Here am I. Send me” by delivering compassionate, holistic care and
                    sustainable support to vulnerable groups in Rwanda.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                  <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Our Focus</p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {focusAreas.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-surface-container bg-surface-container-low px-5 py-5"
                      >
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-surface-container bg-primary-container p-8 text-white md:p-10">
                  <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">Core Values</p>
                  <div className="space-y-4">
                    {values.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                        <p className="font-semibold text-white">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Why This Work Matters</p>
                <p className="mb-6 text-lg leading-8 text-on-surface-variant">
                  In Rwanda, many families continue to face hardship caused by poverty, loss, aging, and economic
                  pressure. Without support, these situations can lead to poor health, interrupted education, deepened
                  vulnerability, and long cycles of instability.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {needsWeRespondTo.map((item) => (
                    <div key={item} className="rounded-2xl border border-surface-container bg-surface-container-low px-5 py-5">
                      <p className="leading-7 text-on-surface-variant">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-surface-container bg-surface-container-low p-8 md:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Our Objectives</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {objectives.map((item) => (
                    <div key={item} className="rounded-2xl border border-surface-container bg-white px-5 py-5">
                      <p className="leading-7 text-on-surface-variant">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Programs and Activities</p>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {programs.map((program) => (
                    <div key={program.title} className="rounded-3xl border border-surface-container bg-surface-container-low p-6">
                      <h3 className="mb-4 text-2xl font-bold text-primary">{program.title}</h3>
                      <div className="space-y-3">
                        {program.items.map((item) => (
                          <div key={item} className="flex gap-3">
                            <span className="material-symbols-outlined mt-1 text-tertiary">check_circle</span>
                            <p className="leading-7 text-on-surface-variant">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl bg-primary-container p-6 text-white">
                  <p className="text-lg leading-8 text-white/80">
                    Our work begins in Kigali and nearby districts, with a long-term desire to expand as the organization
                    grows and support increases.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">What We Need</p>
                  <p className="mb-6 text-lg leading-8 text-on-surface-variant">
                    We are looking for people and partners who can help us respond to urgent needs while building
                    long-term support for vulnerable families in Rwanda.
                  </p>
                  <div className="space-y-4">
                    {supportNeeds.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-surface-container bg-surface-container-low px-5 py-5"
                      >
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-surface-container bg-surface-container-low p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">How You Can Help</p>
                  <p className="mb-6 text-lg leading-8 text-on-surface-variant">
                    Every visitor can take part in this mission through direct support, partnership, or practical
                    involvement.
                  </p>
                  <div className="space-y-4">
                    {waysToHelp.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl border border-surface-container bg-white px-5 py-5">
                        <span className="material-symbols-outlined mt-1 text-tertiary">volunteer_activism</span>
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">How We Work</p>
                  <div className="space-y-4">
                    {howWeWork.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-5">
                        <span className="material-symbols-outlined mt-1 text-tertiary">groups</span>
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-surface-container bg-surface-container-low p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Sustainability</p>
                  <div className="space-y-4">
                    {sustainability.map((item) => (
                      <div key={item} className="rounded-2xl border border-surface-container bg-white px-5 py-5">
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-surface-container bg-white p-8 md:p-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Contact</p>
                    <div className="space-y-3 text-lg leading-8 text-on-surface-variant">
                      <p>
                        <span className="font-bold text-primary">Founder:</span> Mr. Jean Eric HARELIMANA
                      </p>
                      <p>
                        <span className="font-bold text-primary">Location:</span> Kigali, Rwanda
                      </p>
                      <p>
                        <span className="font-bold text-primary">Phone:</span> +250 788869973
                      </p>
                      <p>
                        <span className="font-bold text-primary">Email:</span> hareluc@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                    <Link
                      className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                      to="/donate"
                    >
                      Support This Project
                    </Link>
                    <Link
                      className="inline-flex items-center justify-center rounded-md border border-outline px-8 py-4 font-bold uppercase tracking-[0.12em] text-primary"
                      to="/activities"
                    >
                      View Activities
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
