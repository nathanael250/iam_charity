import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

const contactWays = [
  {
    title: "Call Us",
    value: "+250 788869973",
    description: "Reach us directly for urgent support, partnership discussions, or general inquiries.",
    icon: "call",
  },
  {
    title: "Email Us",
    value: "hareluc@gmail.com",
    description: "Send project questions, support requests, or partnership information by email.",
    icon: "mail",
  },
  {
    title: "Visit Us",
    value: "Kigali, Rwanda",
    description: "Our work is centered in Kigali and nearby districts where we support vulnerable families.",
    icon: "location_on",
  },
];

const inquiryTypes = [
  "Support a family or project",
  "Volunteer with I Am Group",
  "Partner as a church, school, or organization",
  "Request more information about our work",
];

const Contact = () => {
  return (
    <>
      <TopNav />

      <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pt-24 pb-32 md:pb-24">
          <section className="relative overflow-hidden bg-primary-container py-20 text-white md:py-28">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-tertiary-container blur-3xl" />
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl" />
            </div>

            <div className="container relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-tertiary-container">Contact Us</p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  Let&apos;s talk about how to support lives in Rwanda.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                  Contact I Am Group if you want to support a family, volunteer, partner with our mission, or learn more
                  about the work we are doing for orphans, widows, the elderly, and needy families.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                  >
                    Donate Now
                  </Link>
                  <Link
                    to="/volunteer"
                    className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                  >
                    Become a Volunteer
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                  >
                    Learn About Us
                  </Link>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-sm md:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">
                  Contact Person
                </p>
                <h2 className="text-3xl font-black tracking-tight">Mr. Jean Eric HARELIMANA</h2>
                <p className="mt-3 text-lg text-white/75">Founder, I Am Group</p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Phone</p>
                    <p className="mt-2 text-lg font-semibold text-white">+250 788869973</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Email</p>
                    <p className="mt-2 text-lg font-semibold text-white">hareluc@gmail.com</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Location</p>
                    <p className="mt-2 text-lg font-semibold text-white">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container grid grid-cols-1 gap-6 xl:grid-cols-3">
              {contactWays.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-surface-container bg-white p-8 shadow-sm"
                >
                  <span className="material-symbols-outlined text-4xl text-tertiary">{item.icon}</span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">{item.title}</p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-primary">{item.value}</h2>
                  <p className="mt-4 leading-8 text-on-surface-variant">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="pb-16 md:pb-20">
            <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[32px] border border-surface-container bg-white p-8 md:p-10">
                <div className="mb-8">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Send a Message</p>
                  <h2 className="text-4xl font-black tracking-tight text-primary">Tell us how you want to connect.</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">
                    Use this form for donations, partnerships, volunteering, family support, or general questions.
                  </p>
                </div>

                <form className="space-y-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Phone Number</label>
                      <input
                        type="text"
                        placeholder="+250 ..."
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">I Want To Contact You About</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {inquiryTypes.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4"
                        >
                          <input type="radio" name="contact-topic" className="mt-1 accent-[#C9A84C]" />
                          <span className="leading-7 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Message</label>
                    <textarea
                      rows="6"
                      placeholder="Write your message here..."
                      className="w-full resize-none rounded-3xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-primary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="rounded-[32px] border border-surface-container bg-surface-container-low p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">What You Can Contact Us For</p>
                  <div className="space-y-4">
                    {inquiryTypes.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl border border-surface-container bg-white px-5 py-5">
                        <span className="material-symbols-outlined mt-1 text-tertiary">arrow_forward</span>
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-surface-container bg-primary-container p-8 text-white md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">Support and Partnership</p>
                  <h2 className="text-3xl font-black tracking-tight">Work with I Am Group.</h2>
                  <p className="mt-4 text-lg leading-8 text-white/80">
                    We welcome support from individuals, churches, schools, businesses, and community partners who want
                    to help transform lives in Rwanda.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
                    <Link
                      to="/donate"
                      className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                    >
                      Donate Now
                    </Link>
                    <Link
                      to="/volunteer"
                      className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                    >
                      Volunteer With Us
                    </Link>
                    <Link
                      to="/about"
                      className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                    >
                      Learn About Our Mission
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

export default Contact;
