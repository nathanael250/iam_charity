import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { aboutImpactService, homeImpactService, homeTestimonialService, impactPageHeroService, impactPageStatisticService, impactStatisticService } from "../../services/adminServices";
import { getAssetUrl } from "../../services/clientService";

const homeStatisticKeys = ["families_supported", "completed_cases", "families_housed", "stable_housing"];

const cmsPages = [
  {
    id: "home",
    label: "Home Page",
    description: "Hero text, welcome sections, featured support cases, and homepage calls to action.",
    icon: "home",
    sections: ["Hero section", "Welcome message", "Featured support cases", "Impact preview", "Call to action"],
  },
  {
    id: "about",
    label: "About Us",
    description: "Organization story, mission, values, leadership text, and impact introduction.",
    icon: "info",
    sections: ["About introduction", "Mission and vision", "Core values", "Team or leadership", "Impact summary"],
  },
  {
    id: "support",
    label: "People to Support",
    description: "Manage public support-case content and donation-facing project details.",
    icon: "campaign",
    action: { label: "Open Support Cases", to: "/admin/projects" },
    sections: ["Support case cards", "Project story", "Donation targets", "Project gallery", "Visibility status"],
  },
  {
    id: "impact",
    label: "Our Impact",
    description: "Completed support stories and gallery images shown on the public impact page.",
    icon: "published_with_changes",
    action: { label: "Open Impact Updates", to: "/admin/impact-updates" },
    sections: ["Impact headline", "Completed support", "Impact gallery", "Impact statistics", "Final call to action"],
  },
];

const cmsSections = {
  home: [
    { id: "statistics", label: "Homepage Statistics", icon: "monitoring" },
    { id: "impact", label: "Impact Images & Badge", icon: "photo_library" },
    { id: "testimonials", label: "Supporter Testimonials", icon: "format_quote" },
  ],
  about: [
    { id: "numbers", label: "Impact Numbers", icon: "monitoring" },
    { id: "image", label: "Impact Image", icon: "image" },
  ],
  support: [
    { id: "cases", label: "Support Cases", icon: "campaign", action: { label: "Open Support Cases", to: "/admin/projects" } },
  ],
  impact: [
    { id: "hero", label: "Hero Images", icon: "wallpaper" },
    { id: "numbers", label: "Impact Numbers", icon: "monitoring" },
    { id: "stories", label: "Completed Support", icon: "task_alt", action: { label: "Open Completed Support", to: "/admin/impact-updates" } },
    { id: "gallery", label: "Gallery", icon: "photo_library", action: { label: "Open Gallery", to: "/admin/impact-updates" } },
  ],
};

const ImpactStatisticsEditor = ({ title = "Impact Statistics", description = "These four values power the impact-number cards." }) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await impactStatisticService.list({ include_hidden: true });
      setStats((data || []).filter((stat) => homeStatisticKeys.includes(stat.statistic_key)));
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const updateLocal = (id, field, value) => {
    setStats((current) => current.map((stat) => (stat.id === id ? { ...stat, [field]: value } : stat)));
  };

  const saveStat = async (stat) => {
    setSavingId(stat.id);
    setMessage("");
    setError("");
    try {
      await impactStatisticService.update(stat.id, {
        label: stat.label,
        value: stat.value || "0",
        description: stat.description,
        icon: stat.icon,
        display_order: Number(stat.display_order || 0),
        is_visible: Boolean(stat.is_visible),
      });
      setMessage("Impact statistic saved.");
      await loadStats();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-[#E7EAF0] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#07142D]">{title}</h2>
          <p className="mt-1 text-sm font-semibold text-[#687083]">{description}</p>
        </div>
        <button type="button" onClick={loadStats} className="h-10 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">Refresh</button>
      </div>

      {message ? <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div> : null}
      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}

      {isLoading ? (
        <div className="py-10 text-center text-sm font-semibold text-[#687083]">Loading impact statistics...</div>
      ) : (
        <div className="mt-5 grid gap-4">
          {stats.map((stat) => (
            <article key={stat.id} className="rounded-lg border border-[#E7EAF0] bg-[#F8FAFD] p-4">
              <div className="grid gap-3 lg:grid-cols-[90px_1fr_1fr_1fr_110px]">
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">
                  Value
                  <input value={stat.value || ""} onChange={(event) => updateLocal(stat.id, "value", event.target.value)} placeholder="0" className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" />
                </label>
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">
                  Label
                  <input value={stat.label || ""} onChange={(event) => updateLocal(stat.id, "label", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" />
                </label>
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">
                  Small Text
                  <input value={stat.description || ""} onChange={(event) => updateLocal(stat.id, "description", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" />
                </label>
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">
                  Icon
                  <input value={stat.icon || ""} onChange={(event) => updateLocal(stat.id, "icon", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" />
                </label>
                <button type="button" onClick={() => saveStat(stat)} disabled={savingId === stat.id} className="self-end rounded-lg bg-[#D0A733] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-60">
                  {savingId === stat.id ? "Saving..." : "Save"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

const AboutImpactImageEditor = () => {
  const [section, setSection] = useState({ impact_image_url: "" });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSection = async () => {
    setIsLoading(true);
    try {
      setSection(await aboutImpactService.get() || { impact_image_url: "" });
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSection();
  }, []);

  const saveImage = async (event) => {
    event.preventDefault();
    if (!image) {
      setError("Please choose an image before saving.");
      return;
    }
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      setSection(await aboutImpactService.update(image));
      setImage(null);
      setMessage("About impact image saved.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
      <div className="border-b border-[#E7EAF0] pb-4">
        <h2 className="text-xl font-extrabold text-[#07142D]">About Impact Image</h2>
        <p className="mt-1 text-sm font-semibold text-[#687083]">Controls only the image beside “Our Impact in Numbers”. The heading and layout stay fixed.</p>
      </div>

      {message ? <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div> : null}
      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}

      {isLoading ? (
        <div className="py-10 text-center text-sm font-semibold text-[#687083]">Loading about impact image...</div>
      ) : (
        <form onSubmit={saveImage} className="mt-5 space-y-5">
          <div className="overflow-hidden rounded-lg border border-[#E7EAF0] bg-[#F8FAFD]">
            <div className="aspect-[16/7] bg-[#EEF1F5]">
              {image || section.impact_image_url ? (
                <img src={image ? URL.createObjectURL(image) : getAssetUrl(section.impact_image_url)} alt="About impact preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-bold text-[#8A93A3]">No image selected</div>
              )}
            </div>
            <div className="p-4">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#C9D1DE] bg-white px-4 py-3 text-sm font-extrabold text-[#07142D] hover:border-[#D0A733]">
                <span className="material-symbols-outlined text-[19px]">upload</span>
                Upload About Impact Image
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImage(event.target.files?.[0] || null)} className="sr-only" />
              </label>
            </div>
          </div>

          <div className="flex justify-end border-t border-[#E7EAF0] pt-5">
            <button type="submit" disabled={isSaving} className="rounded-lg bg-[#D0A733] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">{isSaving ? "Saving..." : "Save Image"}</button>
          </div>
        </form>
      )}
    </section>
  );
};

const ImpactPageHeroEditor = () => {
  const [section, setSection] = useState({ before_image_url: "", after_image_url: "" });
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSection = async () => {
    setIsLoading(true);
    try {
      setSection(await impactPageHeroService.get() || { before_image_url: "", after_image_url: "" });
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSection();
  }, []);

  const save = async (event) => {
    event.preventDefault();
    if (!beforeFile && !afterFile) {
      setError("Please choose at least one image before saving.");
      return;
    }
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      setSection(await impactPageHeroService.update(beforeFile, afterFile));
      setBeforeFile(null);
      setAfterFile(null);
      setMessage("Impact hero images saved.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
      <div className="border-b border-[#E7EAF0] pb-4">
        <h2 className="text-xl font-extrabold text-[#07142D]">Impact Hero Images</h2>
        <p className="mt-1 text-sm font-semibold text-[#687083]">Controls only the before and after images in the Our Impact page hero. Text and layout stay fixed.</p>
      </div>
      {message ? <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div> : null}
      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}
      {isLoading ? <div className="py-10 text-center text-sm font-semibold text-[#687083]">Loading impact hero images...</div> : (
        <form onSubmit={save} className="mt-5 space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              ["Before Image", section.before_image_url, beforeFile, setBeforeFile],
              ["After Image", section.after_image_url, afterFile, setAfterFile],
            ].map(([title, url, file, setter]) => (
              <div key={title} className="rounded-lg border border-[#E7EAF0] bg-[#F8FAFD] p-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-[#EEF1F5]">
                  {file || url ? <img src={file ? URL.createObjectURL(file) : getAssetUrl(url)} alt={`${title} preview`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm font-bold text-[#8A93A3]">No image selected</div>}
                </div>
                <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#C9D1DE] bg-white px-4 py-3 text-sm font-extrabold text-[#07142D] hover:border-[#D0A733]">
                  <span className="material-symbols-outlined text-[19px]">upload</span>
                  Upload {title}
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setter(event.target.files?.[0] || null)} className="sr-only" />
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end border-t border-[#E7EAF0] pt-5">
            <button type="submit" disabled={isSaving} className="rounded-lg bg-[#D0A733] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">{isSaving ? "Saving..." : "Save Hero Images"}</button>
          </div>
        </form>
      )}
    </section>
  );
};

const ImpactPageStatisticsEditor = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadStats = async () => {
    setIsLoading(true);
    try {
      setStats(await impactPageStatisticService.list({ include_hidden: true }) || []);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const updateLocal = (id, field, value) => setStats((current) => current.map((stat) => (stat.id === id ? { ...stat, [field]: value } : stat)));

  const save = async (stat) => {
    setSavingId(stat.id);
    setMessage("");
    setError("");
    try {
      await impactPageStatisticService.update(stat.id, {
        label: stat.label,
        value: stat.value || "0",
        icon: stat.icon,
        display_order: Number(stat.display_order || 0),
        is_visible: Boolean(stat.is_visible),
      });
      setMessage("Impact page statistic saved.");
      await loadStats();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
      <div className="border-b border-[#E7EAF0] pb-4">
        <h2 className="text-xl font-extrabold text-[#07142D]">Impact Page Numbers</h2>
        <p className="mt-1 text-sm font-semibold text-[#687083]">Controls the four number cards on the public Our Impact page.</p>
      </div>
      {message ? <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div> : null}
      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}
      {isLoading ? <div className="py-10 text-center text-sm font-semibold text-[#687083]">Loading impact page numbers...</div> : (
        <div className="mt-5 grid gap-4">
          {stats.map((stat) => (
            <article key={stat.id} className="rounded-lg border border-[#E7EAF0] bg-[#F8FAFD] p-4">
              <div className="grid gap-3 lg:grid-cols-[120px_1fr_1fr_110px]">
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Value<input value={stat.value || ""} onChange={(event) => updateLocal(stat.id, "value", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" /></label>
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Label<input value={stat.label || ""} onChange={(event) => updateLocal(stat.id, "label", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" /></label>
                <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Icon<input value={stat.icon || ""} onChange={(event) => updateLocal(stat.id, "icon", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]" /></label>
                <button type="button" onClick={() => save(stat)} disabled={savingId === stat.id} className="self-end rounded-lg bg-[#D0A733] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-60">{savingId === stat.id ? "Saving..." : "Save"}</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

const defaultHomeImpact = {
  eyebrow: "Our Impact",
  title: "Real Change.\nReal People.",
  description: "We do not just build houses, we build stronger communities and brighter futures.",
  button_label: "See More Stories",
  button_url: "/impact-stories",
  before_label: "Before",
  before_image_url: "",
  after_label: "After",
  after_image_url: "",
  badge_icon: "home",
  badge_value: "0",
  badge_label: "Homes Completed",
};

const HomeImpactEditor = () => {
  const [form, setForm] = useState(defaultHomeImpact);
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSection = async () => {
    setIsLoading(true);
    try {
      const data = await homeImpactService.get();
      setForm({ ...defaultHomeImpact, ...(data || {}) });
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSection();
  }, []);

  const saveSection = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      const saved = await homeImpactService.update({ badge_value: form.badge_value || "0" }, beforeFile, afterFile);
      setForm({ ...defaultHomeImpact, ...(saved || {}) });
      setBeforeFile(null);
      setAfterFile(null);
      setMessage("Home impact section saved.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
      <div className="border-b border-[#E7EAF0] pb-4">
        <h2 className="text-xl font-extrabold text-[#07142D]">Home Impact Images & Badge</h2>
        <p className="mt-1 text-sm font-semibold text-[#687083]">Only these three values are editable. The section text, labels, button, and layout stay fixed.</p>
      </div>

      {message ? <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div> : null}
      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}

      {isLoading ? (
        <div className="py-10 text-center text-sm font-semibold text-[#687083]">Loading home impact section...</div>
      ) : (
        <form onSubmit={saveSection} className="mt-5 space-y-5">
          <label className="block max-w-md text-xs font-extrabold uppercase tracking-wide text-[#687083]">
            Badge Number
            <input
              value={form.badge_value || ""}
              onChange={(event) => setForm((current) => ({ ...current, badge_value: event.target.value }))}
              placeholder="0"
              className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]"
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              ["before", "Before Image", form.before_image_url, beforeFile, setBeforeFile],
              ["after", "After Image", form.after_image_url, afterFile, setAfterFile],
            ].map(([key, title, url, file, setter]) => (
              <div key={key} className="rounded-lg border border-[#E7EAF0] bg-[#F8FAFD] p-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-[#EEF1F5]">
                  {file || url ? <img src={file ? URL.createObjectURL(file) : getAssetUrl(url)} alt={`${title} preview`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm font-bold text-[#8A93A3]">No image selected</div>}
                </div>
                <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#C9D1DE] bg-white px-4 py-3 text-sm font-extrabold text-[#07142D] hover:border-[#D0A733]"><span className="material-symbols-outlined text-[19px]">upload</span>Upload {title}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setter(event.target.files?.[0] || null)} className="sr-only" /></label>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-[#E7EAF0] pt-5">
            <button type="submit" disabled={isSaving} className="rounded-lg bg-[#D0A733] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">{isSaving ? "Saving..." : "Save Impact Section"}</button>
          </div>
        </form>
      )}
    </section>
  );
};

const emptyTestimonial = {
  quote: "",
  name: "",
  role: "",
  initials: "",
  display_order: 0,
  is_visible: true,
};

const HomeTestimonialsEditor = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [draft, setDraft] = useState(emptyTestimonial);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadTestimonials = async () => {
    setIsLoading(true);
    try {
      setTestimonials(await homeTestimonialService.list({ include_hidden: true, limit: 50 }) || []);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const updateLocal = (id, field, value) => {
    setTestimonials((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const save = async (testimonial) => {
    setSavingId(testimonial.id);
    setMessage("");
    setError("");
    try {
      await homeTestimonialService.update(testimonial.id, {
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
        initials: testimonial.initials,
        display_order: Number(testimonial.display_order || 0),
        is_visible: Boolean(testimonial.is_visible),
      });
      setMessage("Testimonial saved.");
      await loadTestimonials();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId(null);
    }
  };

  const create = async (event) => {
    event.preventDefault();
    setSavingId("new");
    setMessage("");
    setError("");
    try {
      await homeTestimonialService.create({
        ...draft,
        display_order: Number(draft.display_order || testimonials.length + 1),
      });
      setDraft(emptyTestimonial);
      setMessage("Testimonial added.");
      await loadTestimonials();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (testimonial) => {
    if (!window.confirm(`Delete testimonial from ${testimonial.name}?`)) return;
    setSavingId(testimonial.id);
    setMessage("");
    setError("");
    try {
      await homeTestimonialService.remove(testimonial.id);
      setMessage("Testimonial deleted.");
      await loadTestimonials();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId(null);
    }
  };

  const inputClass = "mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-bold outline-none focus:border-[#D0A733]";
  const areaClass = `${inputClass} h-auto py-3`;

  return (
    <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
      <div className="border-b border-[#E7EAF0] pb-4">
        <h2 className="text-xl font-extrabold text-[#07142D]">Supporter Testimonials</h2>
        <p className="mt-1 text-sm font-semibold text-[#687083]">Manage the supporter cards. The section title and layout stay fixed.</p>
      </div>

      {message ? <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div> : null}
      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}

      <form onSubmit={create} className="mt-5 rounded-lg border border-[#E7EAF0] bg-[#F8FAFD] p-4">
        <p className="text-sm font-extrabold text-[#07142D]">Add supporter words</p>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_170px_170px_90px]">
          <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Quote<textarea value={draft.quote} onChange={(event) => setDraft((current) => ({ ...current, quote: event.target.value }))} required rows="2" className={areaClass} /></label>
          <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Name<input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} required className={inputClass} /></label>
          <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Role<input value={draft.role} onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value }))} className={inputClass} /></label>
          <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Initials<input value={draft.initials} onChange={(event) => setDraft((current) => ({ ...current, initials: event.target.value.toUpperCase() }))} className={inputClass} /></label>
        </div>
        <button type="submit" disabled={savingId === "new"} className="mt-4 rounded-lg bg-[#D0A733] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">{savingId === "new" ? "Adding..." : "Add Testimonial"}</button>
      </form>

      {isLoading ? <div className="py-10 text-center text-sm font-semibold text-[#687083]">Loading testimonials...</div> : null}

      {!isLoading ? <div className="mt-5 space-y-4">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="rounded-lg border border-[#E7EAF0] bg-white p-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_170px_160px_90px_90px]">
              <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Quote<textarea value={testimonial.quote || ""} onChange={(event) => updateLocal(testimonial.id, "quote", event.target.value)} rows="3" className={areaClass} /></label>
              <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Name<input value={testimonial.name || ""} onChange={(event) => updateLocal(testimonial.id, "name", event.target.value)} className={inputClass} /></label>
              <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Role<input value={testimonial.role || ""} onChange={(event) => updateLocal(testimonial.id, "role", event.target.value)} className={inputClass} /></label>
              <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Initials<input value={testimonial.initials || ""} onChange={(event) => updateLocal(testimonial.id, "initials", event.target.value.toUpperCase())} className={inputClass} /></label>
              <label className="text-xs font-extrabold uppercase tracking-wide text-[#687083]">Order<input type="number" value={testimonial.display_order || 0} onChange={(event) => updateLocal(testimonial.id, "display_order", event.target.value)} className={inputClass} /></label>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm font-extrabold text-[#536078]"><input type="checkbox" checked={Boolean(testimonial.is_visible)} onChange={(event) => updateLocal(testimonial.id, "is_visible", event.target.checked)} className="h-4 w-4 accent-[#D0A733]" />Visible on homepage</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => save(testimonial)} disabled={savingId === testimonial.id} className="rounded-lg bg-[#D0A733] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-60">{savingId === testimonial.id ? "Saving..." : "Save"}</button>
                <button type="button" onClick={() => remove(testimonial)} disabled={savingId === testimonial.id} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-extrabold text-red-600 disabled:opacity-60">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div> : null}
    </section>
  );
};

const Cms = () => {
  const [selectedPageId, setSelectedPageId] = useState(cmsPages[0].id);
  const [selectedSectionId, setSelectedSectionId] = useState(cmsSections[cmsPages[0].id][0].id);
  const selectedPage = useMemo(
    () => cmsPages.find((page) => page.id === selectedPageId) || cmsPages[0],
    [selectedPageId]
  );
  const pageSections = cmsSections[selectedPage.id] || [];
  const selectedSection = pageSections.find((section) => section.id === selectedSectionId) || pageSections[0];

  const handlePageChange = (event) => {
    const nextPageId = event.target.value;
    setSelectedPageId(nextPageId);
    setSelectedSectionId(cmsSections[nextPageId]?.[0]?.id || "");
  };

  const renderEditor = () => {
    if (selectedPage.id === "home") {
      if (selectedSection?.id === "statistics") return <ImpactStatisticsEditor title="Homepage Statistics" description="These four values power the cards under the homepage hero." />;
      if (selectedSection?.id === "impact") return <HomeImpactEditor />;
      if (selectedSection?.id === "testimonials") return <HomeTestimonialsEditor />;
    }

    if (selectedPage.id === "about") {
      if (selectedSection?.id === "numbers") return <ImpactStatisticsEditor title="About Impact Numbers" description="These four values power the “Our Impact in Numbers” cards on the About page." />;
      if (selectedSection?.id === "image") return <AboutImpactImageEditor />;
    }

    if (selectedPage.id === "impact") {
      if (selectedSection?.id === "hero") return <ImpactPageHeroEditor />;
      if (selectedSection?.id === "numbers") return <ImpactPageStatisticsEditor />;
    }

    if (selectedSection?.action) {
      return (
        <article className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
          <span className="material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF2D9] text-[26px] text-[#D0A733]">{selectedSection.icon}</span>
          <h2 className="mt-5 text-xl font-extrabold text-[#07142D]">{selectedSection.label}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#687083]">This content is managed in its dedicated dashboard module.</p>
          <Link to={selectedSection.action.to} className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#071B36] px-5 text-sm font-extrabold text-white transition hover:bg-[#0B2448]">
            <span className="material-symbols-outlined text-[19px]">open_in_new</span>
            {selectedSection.action.label}
          </Link>
        </article>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-[#07142D]">CMS</h1>
        <p className="mt-2 text-sm font-semibold text-[#687083]">
          Select one website area, then manage only the content that belongs to that page.
        </p>
      </header>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
        <label className="block text-sm font-extrabold text-[#07142D]">
          Select page to manage
          <select
            value={selectedPageId}
            onChange={handlePageChange}
            className="mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733]"
          >
            {cmsPages.map((page) => (
              <option key={page.id} value={page.id}>{page.label}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFF2D9] text-[26px] text-[#D0A733]">
              {selectedPage.icon}
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#D0A733]">Selected Page</p>
              <h2 className="mt-1 text-xl font-extrabold text-[#07142D]">{selectedPage.label}</h2>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-[#E7EAF0] pt-4">
            {pageSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setSelectedSectionId(section.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${selectedSection?.id === section.id ? "bg-[#071B36] text-white" : "text-[#536078] hover:bg-[#F6F8FB] hover:text-[#07142D]"}`}
              >
                <span className={`material-symbols-outlined text-[21px] ${selectedSection?.id === section.id ? "text-[#D0A733]" : "text-[#8A93A3]"}`}>{section.icon}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-extrabold">{section.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <div>{renderEditor()}</div>
      </section>
    </div>
  );
};

export default Cms;
