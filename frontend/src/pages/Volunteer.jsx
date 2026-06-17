import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { volunteerService } from "../services/adminServices";

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

const volunteerTypeByContribution = {
  "Give my time": "community_work",
  "Give physical help or field support": "construction",
  "Offer a professional skill": "administration",
  "Contribute money or materials": "other",
};

const rwandaDistricts = [
  {
    province: "City of Kigali",
    districts: ["Gasabo", "Kicukiro", "Nyarugenge"],
  },
  {
    province: "Eastern Province",
    districts: ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
  },
  {
    province: "Northern Province",
    districts: ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
  },
  {
    province: "Southern Province",
    districts: ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  },
  {
    province: "Western Province",
    districts: ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"],
  },
];

const initialForm = {
  full_name: "",
  country_code: "+250",
  phone: "",
  email: "",
  address: "",
  contributions: [],
  skills: [],
  availability: [],
  available_from: "",
  preferred_contact: "Phone call",
  message: "",
  consent: false,
};

const Toast = ({ status, onClose }) => {
  if (!status.message) return null;

  const isSuccess = status.type === "success";

  return (
    <div className="fixed right-4 top-24 z-[100] w-[calc(100%-2rem)] max-w-sm sm:right-6" role={isSuccess ? "status" : "alert"} aria-live="polite">
      <div className={[
        "flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl",
        isSuccess ? "border-green-200" : "border-red-200",
      ].join(" ")}>
        <span className={[
          "material-symbols-outlined mt-0.5 text-[22px]",
          isSuccess ? "text-green-600" : "text-red-600",
        ].join(" ")}>
          {isSuccess ? "check_circle" : "error"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-on-surface">{isSuccess ? "Application submitted" : "Unable to continue"}</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-on-surface-variant">{status.message}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close notification" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-outline transition hover:bg-surface-container-low hover:text-on-surface">
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};

const Volunteer = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [image, setImage] = useState(null);
  const [imageInputKey, setImageInputKey] = useState(0);

  useEffect(() => {
    if (!status.message) return undefined;

    const timeout = window.setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, status.type === "success" ? 5000 : 7000);

    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleListValue = (name, value) => {
    setForm((current) => {
      const existing = current[name];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];

      return { ...current, [name]: next };
    });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0] || null;
    if (!selectedImage) {
      setImage(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(selectedImage.type)) {
      setImage(null);
      setImageInputKey((current) => current + 1);
      setStatus({ type: "error", message: "Please choose a JPG, PNG, WEBP, or GIF image." });
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setImage(null);
      setImageInputKey((current) => current + 1);
      setStatus({ type: "error", message: "The profile image must be 5 MB or smaller." });
      return;
    }

    setImage(selectedImage);
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.consent) {
      setStatus({ type: "error", message: "Please agree that we may contact you about volunteer opportunities." });
      return;
    }

    if (!form.contributions.length) {
      setStatus({ type: "error", message: "Please select at least one way you would like to help." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await volunteerService.create({
        full_name: form.full_name,
        phone: `${form.country_code}${form.phone.replace(/^0+/, "")}`,
        email: form.email,
        address: form.address,
        volunteer_type: volunteerTypeByContribution[form.contributions[0]] || "other",
        skills: form.skills.join(", "),
        availability: [
          ...form.availability,
          form.available_from ? `Available from ${form.available_from}` : "",
          `Preferred contact: ${form.preferred_contact}`,
          form.contributions.length ? `Support: ${form.contributions.join(", ")}` : "",
        ].filter(Boolean).join(" | "),
        message: form.message,
      }, image);

      setForm(initialForm);
      setImage(null);
      setImageInputKey((current) => current + 1);
      setStatus({
        type: "success",
        message: "Thank you. Your volunteer application was submitted successfully.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong while submitting your volunteer form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopNav />
      <Toast status={status} onClose={() => setStatus({ type: "", message: "" })} />

      <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pb-12 pt-[78px] sm:pb-16">
          <section className="bg-primary-container py-8 text-white sm:py-10">
            <div className="container grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary-container sm:text-xs">
                  Volunteer With Us
                </p>
                <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  Register to volunteer
                </h1>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/75">
                  Share how you can help, and we will contact you when a suitable charity activity is planned.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:w-[390px]">
                <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">Ways to help</p>
                  <p className="mt-1 text-xs font-bold text-white sm:text-sm">Time, skills, or materials</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">Location</p>
                  <p className="mt-1 text-xs font-bold text-white sm:text-sm">Kigali and nearby</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-7 sm:py-10">
            <div className="container max-w-5xl">
              <div className="rounded-xl border border-surface-container bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="mb-5">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">Volunteer Form</p>
                  <h2 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">Your information</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm text-on-surface outline-none transition focus:border-tertiary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Phone Number</label>
                      <div className="grid grid-cols-[105px_minmax(0,1fr)] gap-2">
                        <select
                          name="country_code"
                          value={form.country_code}
                          onChange={handleChange}
                          aria-label="Country code"
                          className="h-12 rounded-lg border border-surface-container bg-surface-container-low px-3 text-sm font-bold text-on-surface outline-none transition focus:border-tertiary"
                        >
                          <option value="+250">RW +250</option>
                          <option value="+256">UG +256</option>
                          <option value="+255">TZ +255</option>
                          <option value="+254">KE +254</option>
                          <option value="+257">BI +257</option>
                          <option value="+243">CD +243</option>
                        </select>
                        <input
                          type="tel"
                          inputMode="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="788 123 456"
                          aria-label="Phone number"
                          className="h-12 min-w-0 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm text-on-surface outline-none transition focus:border-tertiary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">
                      Profile Photo <span className="normal-case tracking-normal text-outline/70">(optional)</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-surface-container bg-surface-container-low px-4 py-4 transition hover:border-tertiary">
                      <span className="material-symbols-outlined text-3xl text-tertiary">add_photo_alternate</span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-on-surface">
                          {image ? image.name : "Choose a profile image"}
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-outline">JPG, PNG, WEBP, or GIF. Maximum 5 MB.</span>
                      </span>
                      <input
                        key={imageInputKey}
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">District</label>
                      <select
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm text-on-surface outline-none transition focus:border-tertiary"
                        required
                      >
                        <option value="" disabled>Select your district</option>
                        {rwandaDistricts.map((group) => (
                          <optgroup key={group.province} label={group.province}>
                            {group.districts.map((district) => (
                              <option key={district} value={district}>{district}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">How do you want to help?</p>
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                      {contributionTypes.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-2 rounded-lg border border-surface-container bg-surface-container-low px-3 py-3 text-xs sm:text-sm"
                        >
                          <input
                            type="checkbox"
                            name="contributions"
                            checked={form.contributions.includes(item)}
                            onChange={() => toggleListValue("contributions", item)}
                            className="mt-1 accent-[#C9A84C]"
                          />
                          <span className="leading-5 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Skills You Can Offer</p>
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                      {skillOptions.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-2 rounded-lg border border-surface-container bg-surface-container-low px-3 py-3 text-xs sm:text-sm"
                        >
                          <input
                            type="checkbox"
                            name="skills"
                            checked={form.skills.includes(item)}
                            onChange={() => toggleListValue("skills", item)}
                            className="mt-1 accent-[#C9A84C]"
                          />
                          <span className="leading-5 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Availability</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {availabilityOptions.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-2 rounded-lg border border-surface-container bg-surface-container-low px-3 py-3 text-xs sm:text-sm"
                        >
                          <input
                            type="checkbox"
                            name="availability"
                            checked={form.availability.includes(item)}
                            onChange={() => toggleListValue("availability", item)}
                            className="mt-1 accent-[#C9A84C]"
                          />
                          <span className="leading-5 text-on-surface-variant">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Available From</label>
                      <input
                        type="date"
                        name="available_from"
                        value={form.available_from}
                        onChange={handleChange}
                        className="h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Preferred Contact</label>
                      <select
                        name="preferred_contact"
                        value={form.preferred_contact}
                        onChange={handleChange}
                        className="h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm text-on-surface outline-none transition focus:border-tertiary"
                      >
                        <option>Phone call</option>
                        <option>Email</option>
                        <option>WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Short Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows="3"
                      placeholder="Tell us what you can do and when you are available."
                      className="w-full resize-none rounded-lg border border-surface-container bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-tertiary"
                    />
                  </div>

                  <label className="flex items-start gap-3 rounded-lg border border-surface-container bg-surface-container-low px-4 py-3 text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-1 accent-[#C9A84C]"
                    />
                    <span className="leading-5 text-on-surface-variant">
                      I agree that I Am Group may contact me when there is a charity activity or volunteer opportunity.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-md bg-primary-container px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Volunteer Form"}
                  </button>
                </form>
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
