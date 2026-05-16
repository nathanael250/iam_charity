import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import heroImage from "../assets/hello_sec-img_1.png";

const contactCards = [
  {
    icon: "location_on",
    title: "Our Location",
    lines: ["KG 15 Ave, Nyarugenge", "P.O. Box 1234 Kigali", "Rwanda"],
    action: "View on Google Maps",
  },
  {
    icon: "call",
    title: "Call Us",
    lines: ["+250 788 123 456", "+250 789 987 654", "", "Mon - Fri: 8:00 AM - 5:00 PM", "Saturday: 8:00 AM - 1:00 PM"],
  },
  {
    icon: "mail",
    title: "Email Us",
    lines: ["info@hopeandhomes.org", "support@hopeandhomes.org", "", "We aim to reply within", "24 hours."],
  },
  {
    icon: "schedule",
    title: "Office Hours",
    lines: ["Monday - Friday", "8:00 AM - 5:00 PM", "Saturday", "8:00 AM - 1:00 PM", "Sunday: Closed"],
  },
];

const socials = [
  { icon: "facebook", label: "Facebook", color: "text-[#1877F2]" },
  { icon: "photo_camera", label: "Instagram", color: "text-[#E4405F]" },
  { icon: "flutter_dash", label: "Twitter", color: "text-[#1DA1F2]" },
  { icon: "smart_display", label: "YouTube", color: "text-[#FF0000]" },
  { icon: "business_center", label: "LinkedIn", color: "text-[#0A66C2]" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="relative overflow-hidden bg-[#17142F] text-white">
          {/* <img
            src={heroImage}
            alt="Volunteer smiling with a child"
            className="absolute inset-y-0 right-0 hidden h-full w-[58%] object-cover object-center opacity-90 md:block"
          /> */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#17142F] via-[#17142F]/92 via-50% to-[#17142F]/10 md:block" />
          <div className="container relative z-10 grid min-h-[430px] items-center py-12 md:grid-cols-[0.92fr_1fr]">
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#C9A84C]">Get in Touch</p>
              <h1 className="mt-5 max-w-[560px] text-[42px] font-extrabold leading-tight tracking-normal text-white md:text-[58px]">
                We’d Love to Hear From You
              </h1>
              <div className="mt-4 h-[3px] w-14 bg-[#C9A84C]" />
              <p className="mt-5 max-w-[430px] text-base font-semibold leading-8 text-white/82">
                Have a question, want to partner with us, or need more information? We’re here to help. Your message can create real change.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#message-form"
                  className="inline-flex items-center justify-center gap-3 rounded-md bg-[#C9A84C] px-7 py-4 text-sm font-extrabold text-white shadow-md shadow-black/15"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Send a Message
                </a>
                <a
                  href="tel:+250788123456"
                  className="inline-flex items-center justify-center gap-3 rounded-md border border-[#C9A84C] bg-white/5 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </section>

        

        <section className="bg-white pt-8 pb-8">
          <div className="container grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article id="message-form" className="rounded-lg border border-[#EEE9DA] bg-white p-8 shadow-[0_14px_38px_rgba(17,14,47,0.06)]">
              <h2 className="text-3xl font-extrabold">Send Us a Message</h2>
              <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mt-5 text-sm font-semibold text-[#4F4B60]">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              <form className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-extrabold">
                    Full Name <span className="text-red-500">*</span>
                    <input className="mt-2 h-12 w-full rounded-md border border-[#DCD6C9] px-4 text-sm font-semibold outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C]" placeholder="Enter your full name" />
                  </label>
                  <label className="text-sm font-extrabold">
                    Email Address <span className="text-red-500">*</span>
                    <input type="email" className="mt-2 h-12 w-full rounded-md border border-[#DCD6C9] px-4 text-sm font-semibold outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C]" placeholder="Enter your email" />
                  </label>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-extrabold">
                    Phone Number
                    <input className="mt-2 h-12 w-full rounded-md border border-[#DCD6C9] px-4 text-sm font-semibold outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C]" placeholder="Enter your phone number" />
                  </label>
                  <label className="text-sm font-extrabold">
                    Subject <span className="text-red-500">*</span>
                    <select className="mt-2 h-12 w-full rounded-md border border-[#DCD6C9] px-4 text-sm font-semibold outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C]">
                      <option>Select a subject</option>
                      <option>Donation</option>
                      <option>Volunteer</option>
                      <option>Partnership</option>
                    </select>
                  </label>
                </div>
                <label className="text-sm font-extrabold">
                  Message <span className="text-red-500">*</span>
                  <textarea
                    rows="6"
                    className="mt-2 w-full resize-none rounded-md border border-[#DCD6C9] px-4 py-4 text-sm font-semibold outline-none focus:border-[#C9A84C] focus:ring-[#C9A84C]"
                    placeholder="Type your message here..."
                  />
                </label>
                <button type="button" className="inline-flex w-fit items-center gap-3 rounded-md bg-[#17142F] px-7 py-4 text-sm font-extrabold text-white">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Send Message
                </button>
              </form>
            </article>

            <article className="overflow-hidden rounded-lg border border-[#EEE9DA] bg-white shadow-[0_14px_38px_rgba(17,14,47,0.06)]">
              <div className="p-8">
                <h2 className="text-3xl font-extrabold">Find Us</h2>
              </div>
              <div className="relative h-[455px] overflow-hidden bg-[#EBE5D8]">
                <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(28deg,transparent_46%,rgba(255,255,255,.9)_47%,rgba(255,255,255,.9)_49%,transparent_50%),linear-gradient(118deg,transparent_46%,rgba(255,255,255,.9)_47%,rgba(255,255,255,.9)_49%,transparent_50%),linear-gradient(0deg,rgba(201,168,76,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(20,17,45,.08)_1px,transparent_1px)] [background-size:170px_130px,210px_150px,48px_48px,48px_48px]" />
                <div className="absolute left-1/2 top-[34%] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#17142F] text-white shadow-xl">
                  <span className="material-symbols-outlined text-[40px]">location_on</span>
                </div>
                <div className="absolute bottom-9 left-9 right-9 rounded-lg bg-white p-7 shadow-[0_14px_38px_rgba(17,14,47,0.16)]">
                  <div className="flex gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FBF7EF] text-[#C9A84C]">
                      <span className="material-symbols-outlined text-[38px]">home</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold">Visit Our Office</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#4F4B60]">We welcome visitors by appointment. Come say hello!</p>
                      <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#C49B2E]">
                        Get Directions
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <article key={card.title} className="rounded-lg border border-[#EEE9DA] bg-white p-8 shadow-[0_14px_38px_rgba(17,14,47,0.06)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF7EF] text-[#C9A84C]">
                  <span className="material-symbols-outlined text-[36px]">{card.icon}</span>
                </div>
                <h2 className="mt-7 text-xl font-extrabold">{card.title}</h2>
                <div className="mt-5 space-y-2 text-sm font-semibold leading-6 text-[#4F4B60]">
                  {card.lines.map((line, index) => (line ? <p key={`${card.title}-${index}`}>{line}</p> : <div key={`${card.title}-${index}`} className="h-2" />))}
                </div>
                {card.action ? (
                  <a href="#" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#C49B2E]">
                    {card.action}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>


        <section className="bg-white pb-8">
          <div className="container">
            <div className="rounded-lg bg-[#17142F] px-8 py-8 text-white shadow-[0_16px_44px_rgba(17,14,47,0.14)]">
              <div className="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]">
                  <span className="material-symbols-outlined text-[38px]">volunteer_activism</span>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">Together, we can build better futures.</h2>
                  <p className="mt-2 text-sm font-semibold text-white/75">Your support brings hope and changes lives.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-8 py-4 text-sm font-extrabold text-white">
                    Donate Now
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </Link>
                  <Link to="/volunteer" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 px-8 py-4 text-sm font-extrabold text-white">
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

export default Contact;
