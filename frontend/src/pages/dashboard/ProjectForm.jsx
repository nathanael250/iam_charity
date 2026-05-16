import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { projectImageService, projectService } from "../../services/adminServices";

const emptyForm = {
  title: "",
  slug: "",
  category: "housing",
  location: "",
  target_amount: "",
  raised_amount: "",
  main_image: "",
  status: "draft",
  start_date: "",
  end_date: "",
  short_description: "",
  full_description: "",
};

const makeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const toDateInput = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageForm, setImageForm] = useState({ image_url: "", caption: "", is_main: false });
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      if (!isEditMode) return;

      setIsLoading(true);
      try {
        const [project, images] = await Promise.all([
          projectService.get(id),
          projectImageService.list(id),
        ]);
        setForm({
          title: project?.title || "",
          slug: project?.slug || "",
          category: project?.category || "housing",
          location: project?.location || "",
          target_amount: project?.target_amount || "",
          raised_amount: project?.raised_amount || "",
          main_image: project?.main_image || "",
          status: project?.status || "draft",
          start_date: toDateInput(project?.start_date),
          end_date: toDateInput(project?.end_date),
          short_description: project?.short_description || "",
          full_description: project?.full_description || "",
        });
        setGalleryImages(images || []);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id, isEditMode]);

  const progress = useMemo(() => {
    const target = Number(form.target_amount || 0);
    if (!target) return 0;
    return Math.min(Math.round((Number(form.raised_amount || 0) / target) * 100), 100);
  }, [form.raised_amount, form.target_amount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      if (name === "title" && !isEditMode && (!current.slug || current.slug === makeSlug(current.title))) {
        return { ...current, title: value, slug: makeSlug(value) };
      }

      return { ...current, [name]: value };
    });
  };

  const handleImageChange = (event) => {
    const { name, value, checked, type } = event.target;
    setImageForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const addGalleryImage = () => {
    const imageUrl = imageForm.image_url.trim();
    if (!imageUrl) {
      setError("Please add an image URL before adding it to the gallery.");
      return;
    }

    setGalleryImages((current) => [
      ...current,
      {
        ...imageForm,
        image_url: imageUrl,
        caption: imageForm.caption.trim(),
        is_main: Boolean(imageForm.is_main),
        temporary_id: crypto.randomUUID(),
      },
    ]);
    setImageForm({ image_url: "", caption: "", is_main: false });
    setError("");
  };

  const removeGalleryImage = async (image) => {
    if (!image.id) {
      setGalleryImages((current) => current.filter((item) => item.temporary_id !== image.temporary_id));
      return;
    }

    try {
      await projectImageService.remove(image.id);
      setGalleryImages((current) => current.filter((item) => item.id !== image.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    const payload = {
      ...form,
      slug: form.slug || makeSlug(form.title),
      target_amount: Number(form.target_amount || 0),
      raised_amount: Number(form.raised_amount || 0),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };

    try {
      let savedProject;
      if (isEditMode) {
        savedProject = await projectService.update(id, payload);
      } else {
        savedProject = await projectService.create(payload);
      }

      const projectId = savedProject?.id || id;
      const pendingImages = galleryImages.filter((image) => !image.id);

      await Promise.all(
        pendingImages.map((image) =>
          projectImageService.create({
            project_id: projectId,
            image_url: image.image_url,
            caption: image.caption,
            is_main: image.is_main,
          })
        )
      );

      navigate("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#D0A733]">Projects</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#07142D]">
            {isEditMode ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">
            Build the project record, funding target, public story, and publishing status.
          </p>
        </div>
        <Link
          to="/admin/projects"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#DDE2EA] bg-white px-5 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733]"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Projects
        </Link>
      </div>

      {error ? (
        <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
          {isLoading ? (
            <p className="text-sm font-extrabold text-[#687083]">Loading project...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-2">
              {[
                ["title", "Project Title"],
                ["slug", "Project Slug"],
                ["location", "Location"],
                ["main_image", "Main Image URL"],
                ["target_amount", "Target Amount"],
                ["raised_amount", "Raised Amount"],
              ].map(([name, label]) => (
                <label key={name} className="block text-sm font-extrabold text-[#07142D]">
                  {label}
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                    required={name === "title" || name === "slug"}
                  />
                </label>
              ))}

              <label className="block text-sm font-extrabold text-[#07142D]">
                Category
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                >
                  <option value="housing">Housing</option>
                  <option value="daily_needs">Daily Needs</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="block text-sm font-extrabold text-[#07142D]">
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </label>

              <label className="block text-sm font-extrabold text-[#07142D]">
                Start Date
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                />
              </label>

              <label className="block text-sm font-extrabold text-[#07142D]">
                End Date
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                />
              </label>

              <label className="block text-sm font-extrabold text-[#07142D] lg:col-span-2">
                Short Description
                <textarea
                  name="short_description"
                  value={form.short_description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-2 w-full resize-none rounded-lg border border-[#DDE2EA] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                />
              </label>

              <label className="block text-sm font-extrabold text-[#07142D] lg:col-span-2">
                Full Description
                <textarea
                  name="full_description"
                  value={form.full_description}
                  onChange={handleChange}
                  rows="6"
                  className="mt-2 w-full resize-none rounded-lg border border-[#DDE2EA] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                />
              </label>

              <div className="rounded-xl border border-[#E2E6EE] bg-[#F8FAFD] p-5 lg:col-span-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#07142D]">Project Gallery Images</h2>
                    <p className="mt-1 text-sm font-semibold text-[#687083]">
                      Add multiple images for the project gallery. These are saved in the project images table.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#687083]">
                    {galleryImages.length} images
                  </span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.75fr_auto]">
                  <label className="block text-sm font-extrabold text-[#07142D]">
                    Image URL
                    <input
                      name="image_url"
                      value={imageForm.image_url}
                      onChange={handleImageChange}
                      className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733]"
                      placeholder="https://example.com/project-image.jpg"
                    />
                  </label>

                  <label className="block text-sm font-extrabold text-[#07142D]">
                    Caption
                    <input
                      name="caption"
                      value={imageForm.caption}
                      onChange={handleImageChange}
                      className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733]"
                      placeholder="Before construction"
                    />
                  </label>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#071B36] px-4 text-sm font-extrabold text-white"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                      Add
                    </button>
                  </div>
                </div>

                <label className="mt-4 flex items-center gap-3 text-sm font-extrabold text-[#07142D]">
                  <input
                    type="checkbox"
                    name="is_main"
                    checked={imageForm.is_main}
                    onChange={handleImageChange}
                    className="h-4 w-4 accent-[#D0A733]"
                  />
                  Mark this image as main gallery image
                </label>

                {galleryImages.length ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {galleryImages.map((image) => (
                      <article key={image.id || image.temporary_id} className="overflow-hidden rounded-lg border border-[#E2E6EE] bg-white">
                        <img src={image.image_url} alt={image.caption || "Project gallery"} className="h-32 w-full object-cover" />
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-extrabold text-[#07142D]">{image.caption || "Gallery image"}</p>
                              {image.is_main ? (
                                <span className="mt-2 inline-flex rounded-full bg-[#FFF2D9] px-2 py-1 text-[11px] font-extrabold text-[#A86D00]">
                                  Main
                                </span>
                              ) : null}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(image)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#536078] transition hover:bg-red-50 hover:text-red-600"
                              title="Remove image"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-lg border border-dashed border-[#DDE2EA] bg-white p-6 text-center text-sm font-semibold text-[#687083]">
                    No gallery images added yet.
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 lg:col-span-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E] disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  {isSaving ? "Saving..." : isEditMode ? "Save Changes" : "Create Project"}
                </button>
                <Link
                  to="/admin/projects"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733]"
                >
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </section>

        <aside className="space-y-4">
          <article className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold text-[#687083]">Funding Progress</p>
            <p className="mt-3 text-4xl font-extrabold text-[#07142D]">{progress}%</p>
            <div className="mt-4 h-2 rounded-full bg-[#E5E8EE]">
              <div className="h-2 rounded-full bg-[#D0A733]" style={{ width: `${progress}%` }} />
            </div>
          </article>

          <article className="rounded-xl border border-[#E2E6EE] bg-[#071B36] p-6 text-white shadow-sm">
            <span className="material-symbols-outlined text-[34px] text-[#D0A733]">tips_and_updates</span>
            <h2 className="mt-4 text-xl font-extrabold">Project publishing checklist</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-white/78">
              <p>Use a clear title and location so donors can identify the project quickly.</p>
              <p>Add a realistic target amount and short story before switching to active.</p>
              <p>Keep draft status until the public project content is ready.</p>
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default ProjectForm;
