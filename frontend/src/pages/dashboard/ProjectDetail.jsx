import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectImageService, projectService } from "../../services/adminServices";
import { getAssetUrl } from "../../services/clientService";

const statusStyles = {
  active: "bg-[#E8F1FF] text-[#2369B4]",
  completed: "bg-[#E5F6EA] text-[#2E7D42]",
  paused: "bg-[#F2E9FF] text-[#7653B7]",
  draft: "bg-[#FFF2D9] text-[#A86D00]",
};

const categoryLabels = {
  housing: "Housing",
  daily_needs: "Daily Needs",
  education: "Education",
  health: "Health",
  emergency: "Emergency",
  other: "Other",
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (date) => {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setError("Project ID is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [projectData, images] = await Promise.all([
          projectService.get(id),
          projectImageService.list(id),
        ]);
        setProject(projectData);
        setGalleryImages(images || []);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-[#E2E6EE] bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-extrabold text-[#687083]">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-6">
        <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#C48609]">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Projects
        </Link>
        <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
          {error || "Project not found."}
        </div>
      </div>
    );
  }

  const progress = Math.min(Number(project.progress || 0), 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#C48609]">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Projects
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold text-[#07142D]">{project.title}</h1>
            <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[project.status] || statusStyles.draft].join(" ")}>
              {project.status || "draft"}
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-[#687083]">
            {categoryLabels[project.category] || "Project"} - {project.location || "No location"}
          </p>
        </div>

        <Link
          to={`/admin/projects/${project.id}/edit`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
          Edit Project
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Target Amount", formatMoney(project.target_amount)],
          ["Raised Amount", formatMoney(project.raised_amount)],
          ["Progress", `${Math.round(progress)}%`],
          ["Created By", project.created_by_name || "Admin"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-lg border border-[#E2E6EE] bg-white p-5 shadow-sm">
            <p className="text-2xl font-extrabold text-[#07142D]">{value}</p>
            <p className="mt-1 text-sm font-semibold text-[#687083]">{label}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <article className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#07142D]">Project Story</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#536078]">
              {project.full_description || project.short_description || "No project story has been added yet."}
            </p>

            <div className="mt-8">
              <div className="mb-2 flex justify-between gap-4 text-sm">
                <span className="font-semibold text-[#687083]">Funding Progress</span>
                <span className="font-extrabold text-[#07142D]">
                  {formatMoney(project.raised_amount)} / {formatMoney(project.target_amount)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#E5E8EE]">
                <div className="h-3 rounded-full bg-[#D0A733]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#07142D]">Project Gallery</h2>
                <p className="mt-1 text-sm font-semibold text-[#687083]">{galleryImages.length} images attached to this project.</p>
              </div>
              <Link to={`/admin/projects/${project.id}/edit`} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">
                <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                Manage Images
              </Link>
            </div>

            {galleryImages.length ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {galleryImages.map((image) => (
                  <figure key={image.id} className="overflow-hidden rounded-lg border border-[#E2E6EE]">
                    <img src={getAssetUrl(image.image_url)} alt={image.caption || project.title} className="h-52 w-full object-cover" />
                    <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-[#536078]">
                      <span>{image.caption || "Project image"}</span>
                      {image.is_main ? (
                        <span className="rounded-full bg-[#FFF2D9] px-2 py-1 text-[11px] font-extrabold text-[#A86D00]">Main</span>
                      ) : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-dashed border-[#DDE2EA] bg-[#F8FAFD] p-8 text-center text-sm font-semibold text-[#687083]">
                No gallery images have been added yet.
              </div>
            )}
          </article>
        </section>

        <aside className="space-y-4">
          <article className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#07142D]">Project Details</h2>
            <div className="mt-5 space-y-4 text-sm font-semibold text-[#536078]">
              <p><span className="font-extrabold text-[#07142D]">Slug:</span> {project.slug}</p>
              <p><span className="font-extrabold text-[#07142D]">Start Date:</span> {formatDate(project.start_date)}</p>
              <p><span className="font-extrabold text-[#07142D]">End Date:</span> {formatDate(project.end_date)}</p>
              <p><span className="font-extrabold text-[#07142D]">Created:</span> {formatDate(project.created_at)}</p>
            </div>
          </article>

          <article className="rounded-xl border border-[#E2E6EE] bg-[#071B36] p-6 text-white shadow-sm">
            <span className="material-symbols-outlined text-[34px] text-[#D0A733]">visibility</span>
            <h2 className="mt-4 text-xl font-extrabold">Admin project view</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
              Use this page to inspect project content before editing or publishing it.
            </p>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;
