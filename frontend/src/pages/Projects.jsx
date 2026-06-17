import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { projectService } from "../services/adminServices";
import { getAssetUrl } from "../services/clientService";

const categoryLabels = {
  housing: "Housing",
  daily_needs: "Daily Needs",
  education: "Education",
  health: "Health",
  emergency: "Emergency",
  other: "Other",
};

const formatMoney = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const ProjectImage = ({ project, className }) => {
  if (!project.main_image) {
    return (
      <div className={`flex items-center justify-center bg-[#F6F1E5] text-[#C49B2E] ${className}`}>
        <span className="material-symbols-outlined text-[48px]">image</span>
      </div>
    );
  }

  return <img src={getAssetUrl(project.main_image)} alt={project.title} className={className} />;
};

const PeopleToSupport = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    projectService
      .list({ status: "active", limit: 100 })
      .then((data) => {
        if (isMounted) {
          setProjects(data || []);
          setError("");
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setProjects([]);
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProject = projects[0] || null;
  const remainingProjects = useMemo(() => projects.slice(1), [projects]);

  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="bg-white pb-4 pt-6 sm:pb-7 sm:pt-10">
          <div className="container">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#C49B2E] sm:text-xs">People to Support</p>
            <h1 className="mt-1 text-2xl font-extrabold text-[#17142F] sm:mt-2 sm:text-4xl">Choose someone to help</h1>
            <p className="mt-2 max-w-[620px] text-xs font-semibold leading-5 text-[#666276] sm:mt-3 sm:text-sm sm:leading-6">
              Read their need, choose who you want to support, and make a direct difference.
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="container pb-16">
            <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-[#E7DDBE] text-sm font-bold text-[#777386]">
              Loading support cases...
            </div>
          </section>
        ) : null}

        {!isLoading && error ? (
          <section className="container pb-16">
            <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
              We could not load the support cases. {error}
            </div>
          </section>
        ) : null}

        {!isLoading && !error && !featuredProject ? (
          <section className="container pb-16">
            <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-[#E7DDBE] px-6 text-center text-sm font-bold text-[#777386]">
              No active support cases are available right now.
            </div>
          </section>
        ) : null}

        {featuredProject ? (
          <>
            <section className="bg-white pb-6 sm:pb-7">
              <div className="container grid grid-cols-[0.82fr_1.18fr] overflow-hidden rounded-lg border border-[#ECE7D9] bg-white shadow-[0_14px_38px_rgba(17,14,47,0.07)] sm:grid-cols-1 lg:grid-cols-[0.85fr_1fr]">
                <div className="relative min-h-[230px] sm:min-h-[310px]">
                  <ProjectImage project={featuredProject} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-[#17142F] px-2 py-1.5 text-[9px] font-extrabold uppercase text-white sm:left-6 sm:top-6 sm:gap-2 sm:px-3 sm:py-2 sm:text-[11px]">
                    <span className="material-symbols-outlined text-[13px] text-[#C9A84C] sm:text-[17px]">star</span>
                    Featured Need
                  </span>
                </div>
                <div className="flex min-w-0 flex-col justify-center p-3 sm:p-7 lg:p-8">
                  <span className="w-fit rounded-md bg-[#F6F1E5] px-3 py-1.5 text-[10px] font-extrabold text-[#A77E12] sm:text-xs">
                    {categoryLabels[featuredProject.category] || "Support"}
                  </span>
                  <h2 className="mt-3 text-base font-extrabold leading-5 text-[#17142F] sm:text-3xl sm:leading-tight">{featuredProject.title}</h2>
                  <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#6E697B] sm:mt-2 sm:text-sm">
                    <span className="material-symbols-outlined text-[15px] text-[#C9A84C] sm:text-[18px]">location_on</span>
                    {featuredProject.location || "Rwanda"}
                  </p>
                  <p className="mt-2 line-clamp-3 max-w-[560px] text-[10px] font-semibold leading-4 text-[#4F4B60] sm:mt-4 sm:text-sm sm:leading-6">
                    {featuredProject.short_description || "This support case needs practical assistance."}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2 text-[10px] sm:mt-5 sm:gap-4 sm:text-sm">
                    <p className="font-extrabold text-[#17142F]">
                      {formatMoney(featuredProject.raised_amount, featuredProject.currency || "USD")}{" "}
                      <span className="font-semibold text-[#6E697B]">of {formatMoney(featuredProject.target_amount, featuredProject.currency || "USD")}</span>
                    </p>
                    <p className="font-extrabold text-[#17142F]">{Number(featuredProject.progress || 0)}%</p>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E5E2EA] sm:mt-2 sm:h-2">
                    <div className="h-full rounded-full bg-[#D0A733]" style={{ width: `${Math.min(Number(featuredProject.progress || 0), 100)}%` }} />
                  </div>
                  <Link
                    to={`/needs/${featuredProject.id}`}
                    className="mt-3 inline-flex w-fit items-center gap-1 rounded-md bg-[#17142F] px-3 py-2 text-[10px] font-extrabold text-white transition hover:bg-[#25204A] sm:mt-5 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    View their need
                    <span className="material-symbols-outlined text-[14px] sm:text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </section>

            {remainingProjects.length ? (
              <section className="bg-white pb-12 pt-3 sm:pb-16">
                <div className="container">
                  <h2 className="text-2xl font-extrabold text-[#17142F] sm:text-3xl">More people who need help</h2>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-6 lg:grid-cols-3">
                    {remainingProjects.map((project) => {
                      const progress = Math.min(Number(project.progress || 0), 100);

                      return (
                        <article key={project.id} className="overflow-hidden rounded-lg border border-[#EEE9DA] bg-white shadow-[0_14px_38px_rgba(17,14,47,0.07)]">
                          <div className="relative h-32 sm:h-44">
                            <ProjectImage project={project} className="h-full w-full object-cover" />
                            <span className="absolute left-2 top-2 rounded-md bg-[#C9A84C] px-2 py-1 text-[9px] font-extrabold text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
                              {categoryLabels[project.category] || "Support"}
                            </span>
                          </div>
                          <div className="p-3 sm:p-5">
                            <h3 className="text-sm font-extrabold leading-5 text-[#17142F] sm:text-lg sm:leading-6">{project.title}</h3>
                            <p className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#6E697B] sm:text-xs">
                              <span className="material-symbols-outlined text-[15px] text-[#C9A84C]">location_on</span>
                              {project.location || "Rwanda"}
                            </p>
                            <p className="mt-3 line-clamp-2 text-[10px] font-semibold leading-4 text-[#666276] sm:text-xs sm:leading-5">
                              {project.short_description || "This support case needs practical assistance."}
                            </p>
                            <div className="mt-3 flex items-center justify-between gap-2 text-[10px] sm:mt-4 sm:text-xs">
                              <p className="font-extrabold text-[#17142F]">
                                {formatMoney(project.raised_amount, project.currency || "USD")}{" "}
                                <span className="font-semibold text-[#6E697B]">of {formatMoney(project.target_amount, project.currency || "USD")}</span>
                              </p>
                              <p className="font-extrabold">{progress}%</p>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5E2EA]">
                              <div className="h-full rounded-full bg-[#D0A733]" style={{ width: `${progress}%` }} />
                            </div>
                            <Link to={`/needs/${project.id}`} className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#C49B2E] sm:mt-5 sm:text-sm">
                              View their need
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default PeopleToSupport;
