import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

const contributionTypes = [
  "Give my time",
  "Give physical help or field support",
  "Offer a professional skill",
  "Contribute money or materials",
];

const skillOptions = [
  "Construction and site support",
  "Teaching and child mentoring",
  "Health or counseling support",
  "Event organization",
  "Driving and logistics",
  "Media, design, or communication",
];

const availabilityOptions = [
  "Weekdays",
  "Weekends",
  "One-time support",
  "Monthly support",
];

const Volunteer = () => {
  return (
    <>
      <TopNav />

      <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pt-24 pb-32 md:pb-24">
          <section className="bg-primary-container py-20 text-white md:py-24">
            <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-tertiary-container">
                  Volunteer With Us
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  Register to serve in our charity activities.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                  Fill in your information so we can contact you when I Am Group is preparing a charity action and needs
                  volunteers, skills, physical support, or other help.
                </p>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-sm md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">Volunteer Role</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Support Areas</p>
                    <p className="mt-2 text-lg font-semibold text-white">Time, effort, skills, or money</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Location</p>
                    <p className="mt-2 text-lg font-semibold text-white">Kigali and nearby districts</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[32px] border border-surface-container bg-white p-8 shadow-sm md:p-10">
                <div className="mb-8">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Volunteer Form</p>
                  <h2 className="text-4xl font-black tracking-tight text-primary">Your information</h2>
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
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Phone Number</label>
                      <input
                        type="text"
                        placeholder="+250 ..."
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">District / Sector</label>
                      <input
                        type="text"
                        placeholder="Where you are located"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">How do you want to help?</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {contributionTypes.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4"
                        >
                          <input type="checkbox" className="mt-1 accent-[#C9A84C]" />
                          <span className="leading-7 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Skills You Can Offer</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {skillOptions.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4"
                        >
                          <input type="checkbox" className="mt-1 accent-[#C9A84C]" />
                          <span className="leading-7 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Availability</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {availabilityOptions.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4"
                        >
                          <input type="checkbox" className="mt-1 accent-[#C9A84C]" />
                          <span className="leading-7 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Available From</label>
                      <input
                        type="date"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Preferred Contact</label>
                      <select className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary">
                        <option>Phone call</option>
                        <option>Email</option>
                        <option>WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Short Message</label>
                    <textarea
                      rows="5"
                      placeholder="Tell us what you can do and when you are available."
                      className="w-full resize-none rounded-3xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                    />
                  </div>

                  <label className="flex items-start gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4">
                    <input type="checkbox" className="mt-1 accent-[#C9A84C]" />
                    <span className="leading-7 text-on-surface-variant">
                      I agree that I Am Group may contact me when there is a charity activity or volunteer opportunity.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-primary-container px-8 py-5 font-bold uppercase tracking-[0.14em] text-white"
                  >
                    Submit Volunteer Form
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="rounded-[32px] border border-surface-container bg-surface-container-low p-8 md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">What We Need From Volunteers</p>
                  <div className="space-y-4">
                    {contributionTypes.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl border border-surface-container bg-white px-5 py-5">
                        <span className="material-symbols-outlined mt-1 text-tertiary">volunteer_activism</span>
                        <p className="leading-7 text-on-surface-variant">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-surface-container bg-primary-container p-8 text-white md:p-10">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">Next Step</p>
                  <h2 className="text-3xl font-black tracking-tight">We will contact you when an activity is planned.</h2>
                  <p className="mt-4 text-lg leading-8 text-white/80">
                    Once you submit this form, your information will help us call the right people when a charity action,
                    visit, building activity, or support event is being organized.
                  </p>
                  <div className="mt-8 flex flex-col gap-4">
                    <Link
                      to="/activities"
                      className="inline-flex items-center justify-center rounded-md bg-tertiary-container px-8 py-4 font-bold uppercase tracking-[0.12em] text-[#1B0E3D]"
                    >
                      View Activities
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 py-4 font-bold uppercase tracking-[0.12em] text-white"
                    >
                      Back to Contact
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

export default Volunteer;
