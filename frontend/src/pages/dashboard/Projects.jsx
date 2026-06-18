import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../../services/adminServices";

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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectService.list({ limit: 100, search, status });
      setProjects(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        [project.title, project.location, project.category, project.short_description]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      const matchesStatus = !status || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);



  const handleDelete = async (project) => {
    const confirmed = window.confirm(`Delete "${project.title}"?`);
    if (!confirmed) return;

    try {
      await projectService.remove(project.id);
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-5 pb-28 sm:pb-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[2rem] font-extrabold leading-tight text-[#07142D] sm:text-3xl">Support Cases</h1>
        <Link
          to="/admin/projects/new"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#B98F1E] sm:w-auto"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Support Case
        </Link>
      </div>

      <section className="rounded-lg border border-[#E2E6EE] bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <label className="relative flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">
              search
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
              placeholder="Search support cases..."
            />
          </label>
          <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 sm:flex sm:gap-3">
            <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center text-[22px] text-[#687083]">filter_list</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-11 min-w-0 rounded-lg border border-[#DDE2EA] bg-white px-3 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4] sm:px-4"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <button
              type="button"
              onClick={loadProjects}
              className="h-11 rounded-lg border border-[#DDE2EA] px-3 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E] sm:px-4"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
          {error}
        </div>
      ) : null}

      <section className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {filteredProjects.map((project) => {
          const progress = Math.min(Number(project.progress || 0), 100);

          return (
            <article key={project.id} className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold leading-7 text-[#07142D] sm:text-lg">{project.title}</h3>
                  <p className="mt-1 text-sm font-semibold leading-5 text-[#687083]">
                    {categoryLabels[project.category] || "Project"} {project.location ? `- ${project.location}` : ""}
                  </p>
                </div>
                <span className={["shrink-0 rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[project.status] || statusStyles.draft].join(" ")}>
                  {project.status || "draft"}
                </span>
              </div>

              <p className="mt-3 line-clamp-3 min-h-0 overflow-hidden text-sm font-semibold leading-6 text-[#687083] sm:mt-4 sm:min-h-[44px]">
                {project.short_description || "No project description has been added yet."}
              </p>

              <div className="mt-4 sm:mt-5">
                <div className="mb-2 flex items-start justify-between gap-3 text-sm">
                  <span className="font-semibold text-[#687083]">Funding Progress</span>
                  <span className="shrink-0 text-right font-extrabold text-[#07142D]">
                    {formatMoney(project.raised_amount)} / {formatMoney(project.target_amount)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#E5E8EE]">
                  <div className="h-2 rounded-full bg-[#D0A733] transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs font-bold text-[#687083]">{Math.round(progress)}% funded</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#EEF1F5] pt-4 sm:mt-5">
                <p className="text-sm font-semibold text-[#687083]">{Number(project.updates_count || 0)} updates</p>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/projects/${project.id}`}
                    title="View project"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-[#E8F1FF] hover:text-[#2369B4]"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </Link>
                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    title="Edit project"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-[#E5F6EA] hover:text-[#2E7D42]"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </Link>
                  <button
                    type="button"
                    title="Delete project"
                    onClick={() => handleDelete(project)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {!filteredProjects.length && !isLoading ? (
          <div className="flex min-h-36 items-center justify-center rounded-xl border border-dashed border-[#DDE2EA] bg-white p-6 text-center lg:col-span-2">
            <p className="text-sm font-bold text-[#687083]">
              {search || status ? "No matching support cases." : "No support cases yet."}
            </p>
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex min-h-36 items-center justify-center rounded-xl border border-[#E2E6EE] bg-white p-6 text-center lg:col-span-2">
            <p className="text-sm font-bold text-[#687083]">Loading...</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Projects;
