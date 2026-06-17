import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { projectImageService, projectService } from "../services/adminServices";
import { getAssetUrl } from "../services/clientService";

const formatMoney = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const NeedDetail = () => {
  const { slug: projectId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([projectService.get(projectId), projectImageService.list(projectId)])
      .then(([project, images]) => {
        setCampaign(project);
        setGallery(images || []);
        setError("");
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, [projectId]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-sm font-bold text-[#666276]">Loading support case...</div>;
  }

  if (error || !campaign) {
    return <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"><p className="font-bold text-[#666276]">{error || "Support case not found."}</p><Link to="/projects" className="font-extrabold text-[#C49B2E]">Back to People to Support</Link></div>;
  }

  const progress = Math.min(Number(campaign.progress || 0), 100);
  const mainImage = campaign.main_image || gallery.find((image) => image.is_main)?.image_url || gallery[0]?.image_url;

  return (
    <>
      <TopNav />

      <div className="bg-surface text-on-surface selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pb-14 pt-20 sm:pb-20 sm:pt-24">
          <section className="container">
            <div className="mb-4 sm:mb-7">
              <Link className="text-xs font-bold uppercase tracking-[0.14em] text-[#C9A84C] sm:text-sm" to="/projects">
                Back to People to Support
              </Link>
            </div>

            <div className="grid grid-cols-1 items-start gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-surface-container-low sm:min-h-[440px] sm:rounded-[28px] lg:min-h-[520px]">
                  {mainImage ? <img className="absolute inset-0 h-full w-full object-cover" src={getAssetUrl(mainImage)} alt={campaign.title} /> : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8 sm:right-8">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 sm:mb-3 sm:text-xs sm:tracking-[0.24em]">{campaign.location || "Rwanda"}</p>
                    <h1 className="mb-3 text-3xl font-black leading-[1.08] tracking-tight sm:mb-4 sm:text-4xl md:text-5xl">{campaign.title}</h1>
                    <p className="max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7 md:text-lg">{campaign.short_description}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-surface-container bg-white p-5 shadow-[0_24px_80px_rgba(27,14,61,0.08)] sm:rounded-[28px] sm:p-8">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] sm:mb-3 sm:text-xs sm:tracking-[0.22em]">Current Need</p>
                  <h2 className="mb-2 text-2xl font-black tracking-tight text-primary sm:mb-3 sm:text-3xl">Support this need</h2>
                  <p className="mb-5 text-sm leading-6 text-on-surface-variant sm:mb-6 sm:text-base">{campaign.location}</p>

                  <div className="mb-6 space-y-4 sm:mb-8 sm:space-y-5">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-on-surface-variant">Raised so far</p>
                        <p className="text-2xl font-black text-primary sm:text-3xl">{formatMoney(campaign.raised_amount, campaign.currency || "USD")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-on-surface-variant">Goal</p>
                        <p className="text-lg font-bold text-primary sm:text-xl">{formatMoney(campaign.target_amount, campaign.currency || "USD")}</p>
                      </div>
                    </div>

                    <div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-surface-container sm:h-3">
                        <div className="h-full bg-[#C9A84C]" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#C9A84C]">{progress}% funded</p>
                    </div>
                  </div>

                  <Link
                    to={`/donate?campaign=${campaign.slug}`}
                    className="block w-full rounded-md bg-[#C9822C] px-5 py-3.5 text-center text-sm font-bold tracking-[0.12em] text-white sm:px-6 sm:py-4 sm:tracking-[0.2em]"
                  >
                    Donate to This Family
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="container mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-surface-container bg-white p-5 sm:rounded-[28px] sm:p-8 lg:col-span-7">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] sm:text-xs sm:tracking-[0.22em]">Their Story</p>
              <p className="text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">{campaign.full_description || campaign.short_description}</p>
            </div>

            <div className="rounded-2xl border border-surface-container bg-white p-5 sm:rounded-[28px] sm:p-8 lg:col-span-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] sm:mb-5 sm:text-xs sm:tracking-[0.22em]">Support Information</p>
              <p className="text-sm leading-6 text-on-surface-variant sm:text-base sm:leading-7">Your contribution helps this support case move toward its funding goal.</p>
            </div>
          </section>

          {gallery.length > 0 ? <section className="container mt-8 sm:mt-12">
            <div className="rounded-2xl border border-surface-container bg-white p-5 sm:rounded-[28px] sm:p-8">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] sm:mb-6 sm:text-xs sm:tracking-[0.22em]">More Images</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
                {gallery.map((image) => (
                  <div key={image.id} className="h-36 overflow-hidden rounded-xl bg-surface-container-low sm:h-64 sm:rounded-3xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      src={getAssetUrl(image.image_url)}
                      alt={image.caption || campaign.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section> : null}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NeedDetail;
