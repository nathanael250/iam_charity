import { useState } from "react";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import heroImage from "../assets/hello_sec-img_1.png";
import { messageService } from "../services/adminServices";

const initialForm = {
  full_name: "",
  email: "",
  country_code: "+250",
  phone: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: "call",
    title: "Call Us",
    content: (
      <>
        <a className="block hover:text-[#C49B2E]" href="tel:+250788123456">+250 788 869 973</a>
        {/* <a className="block hover:text-[#C49B2E]" href="tel:+250789987654">+250 788 869 973</a> */}
      </>
    ),
  },
  {
    icon: "mail",
    title: "Email Us",
    content: (
      <>
        <a className="block break-all hover:text-[#C49B2E]" href="mailto:info@iamgroup.org">info@iamgroup.org</a>
        <span className="mt-2 block text-[#777386]">We aim to reply within 24 hours.</span>
      </>
    ),
  },
  {
    icon: "groups",
    title: "Where We Serve",
    content: (
      <>
        <span className="block">We support vulnerable people and communities across Rwanda.</span>
      </>
    ),
  },
  {
    icon: "schedule",
    title: "Availability",
    content: (
      <>
        <span className="block">Contact us by phone, email, or this form.</span>
        <span className="block text-[#777386]">We will respond as soon as possible.</span>
      </>
    ),
  },
];

const fieldClass =
  "mt-2 w-full rounded-lg border border-[#DDDDE3] bg-white px-4 text-sm font-semibold text-[#17142F] outline-none transition placeholder:text-[#8A8796] focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20";

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await messageService.create({
        ...form,
        phone: form.phone ? `${form.country_code}${form.phone.replace(/^0+/, "")}` : "",
      });
      setForm(initialForm);
      setStatus({ type: "success", message: "Thank you. Your message has been sent successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "We could not send your message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="relative isolate overflow-hidden bg-[#F8F4ED]">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[54%] object-cover object-center opacity-[0.16] md:block"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FBF8F3] via-[#FBF8F3]/95 to-[#FBF8F3]/45" />
          <div className="container flex min-h-[210px] items-center py-8 sm:min-h-[270px] sm:py-10">
            <div className="max-w-[590px]">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#C49B2E] sm:text-[13px]">Contact Us</p>
              <div className="mt-2 h-0.5 w-9 bg-[#C9A84C] sm:mt-4 sm:w-10" />
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-5xl">Let’s Connect</h1>
              <p className="mt-3 max-w-[520px] text-sm font-semibold leading-6 text-[#4F4B60] sm:mt-4 sm:text-base sm:leading-8">
                Ask a question, discuss support, volunteer, or explore a partnership with I AM Charity.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-7 sm:py-9 lg:py-11">
          <div className="container grid gap-4 sm:gap-6 lg:grid-cols-[1.28fr_0.98fr]">
            <article className="rounded-xl border border-[#E5E3E7] bg-white p-4 shadow-[0_12px_34px_rgba(17,14,47,0.07)] sm:p-8">
              <h2 className="text-xl font-extrabold sm:text-2xl">Send Us a Message</h2>
              <div className="mt-3 h-0.5 w-10 bg-[#C9A84C]" />
              <p className="mt-3 text-xs font-semibold leading-5 text-[#5F5B6D] sm:mt-4 sm:text-sm sm:leading-6">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              <form className="mt-5 grid gap-4 sm:mt-7 sm:gap-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <label className="text-xs font-extrabold sm:text-sm">
                    Full Name <span className="text-red-500">*</span>
                    <input name="full_name" value={form.full_name} onChange={updateField} required className={`${fieldClass} h-12`} placeholder="Enter your full name" />
                  </label>
                  <label className="text-xs font-extrabold sm:text-sm">
                    Email Address <span className="text-red-500">*</span>
                    <input name="email" value={form.email} onChange={updateField} required type="email" className={`${fieldClass} h-12`} placeholder="Enter your email" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <label className="text-xs font-extrabold sm:text-sm">
                    Phone Number
                    <div className="mt-2 grid grid-cols-[82px_minmax(0,1fr)] gap-2 sm:grid-cols-[100px_minmax(0,1fr)]">
                      <select name="country_code" value={form.country_code} onChange={updateField} aria-label="Country code" className="h-12 rounded-lg border border-[#DDDDE3] bg-white px-2 text-xs font-bold outline-none focus:border-[#C9A84C]">
                        <option value="+250">RW +250</option>
                        <option value="+256">UG +256</option>
                        <option value="+255">TZ +255</option>
                        <option value="+254">KE +254</option>
                        <option value="+257">BI +257</option>
                        <option value="+243">CD +243</option>
                      </select>
                      <input name="phone" value={form.phone} onChange={updateField} type="tel" inputMode="tel" className="h-12 min-w-0 rounded-lg border border-[#DDDDE3] bg-white px-3 text-xs font-semibold outline-none focus:border-[#C9A84C] sm:text-sm" placeholder="7XXXXXXXX" />
                    </div>
                  </label>
                  <label className="text-xs font-extrabold sm:text-sm">
                    Subject <span className="text-red-500">*</span>
                    <select name="subject" value={form.subject} onChange={updateField} required className={`${fieldClass} h-12`}>
                      <option value="" disabled>Select a subject</option>
                      <option value="General inquiry">General inquiry</option>
                      <option value="Donation">Donation</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <label className="text-xs font-extrabold sm:text-sm">
                  Message <span className="text-red-500">*</span>
                  <textarea name="message" value={form.message} onChange={updateField} required rows="4" className={`${fieldClass} resize-none py-3`} placeholder="Type your message here..." />
                </label>

                {status.message ? (
                  <p className={`rounded-lg px-4 py-3 text-sm font-bold ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`} role="status">
                    {status.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#17142F] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#17142F]/15 transition hover:bg-[#29234F] disabled:cursor-not-allowed disabled:opacity-65 sm:w-fit"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </article>

            <article className="rounded-xl border border-[#E5E3E7] bg-white p-4 shadow-[0_12px_34px_rgba(17,14,47,0.07)] sm:p-8">
              <h2 className="text-xl font-extrabold sm:text-2xl">Contact Information</h2>
              <div className="mt-3 h-0.5 w-10 bg-[#C9A84C]" />
              <p className="mt-3 text-xs font-semibold text-[#5F5B6D] sm:mt-4 sm:text-sm">Choose the easiest way to reach us.</p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-7 sm:grid-cols-1 sm:gap-6">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="flex min-w-0 gap-3 sm:gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FBF6ED] text-[#C99C24] sm:h-14 sm:w-14 sm:rounded-xl">
                      <span className="material-symbols-outlined text-[23px] sm:text-[30px]">{detail.icon}</span>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-xs font-extrabold sm:text-sm">{detail.title}</h3>
                      <div className="mt-1 text-[10px] font-semibold leading-4 text-[#343044] sm:mt-2 sm:text-sm sm:leading-6">{detail.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;
