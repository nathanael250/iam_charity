import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import TopNav from "../components/TopNav";
import helpNeeds from "../data/helpNeeds";

const NeedDetail = () => {
  const { slug } = useParams();
  const campaign = helpNeeds.find((item) => item.slug === slug);

  if (!campaign) {
    return <Navigate to="/" replace />;
  }

  const progress = Math.round(
    (parseInt(campaign.raised.replace(/[^0-9]/g, ""), 10) /
      parseInt(campaign.goal.replace(/[^0-9]/g, ""), 10)) *
      100
  );

  return (
    <>
      <TopNav />

      <div className="bg-surface text-on-surface selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pt-24 pb-24">
          <section className="container">
            <div className="mb-8">
              <Link className="text-sm font-semibold tracking-[0.16em] text-[#C9A84C] uppercase" to="/">
                Back to Home
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-[28px] min-h-[420px]">
                  <img className="absolute inset-0 w-full h-full object-cover" src={campaign.image} alt={campaign.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent" />
                  <div className="absolute left-8 right-8 bottom-8 text-white">
                    <p className="text-xs tracking-[0.24em] uppercase text-white/70 font-semibold mb-3">{campaign.region}</p>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">{campaign.title}</h1>
                    <p className="text-lg text-white/80 max-w-2xl leading-relaxed">{campaign.summary}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white rounded-[28px] border border-surface-container p-8 shadow-[0_24px_80px_rgba(27,14,61,0.08)]">
                  <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#C9A84C] mb-3">Current Need</p>
                  <h2 className="text-3xl font-black tracking-tight text-primary mb-3">{campaign.family}</h2>
                  <p className="text-on-surface-variant leading-relaxed mb-6">{campaign.location}</p>

                  <div className="space-y-5 mb-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-on-surface-variant">Raised so far</p>
                        <p className="text-3xl font-black text-primary">{campaign.raised}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-on-surface-variant">Goal</p>
                        <p className="text-xl font-bold text-primary">{campaign.goal}</p>
                      </div>
                    </div>

                    <div>
                      <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A84C]" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#C9A84C]">{progress}% funded</p>
                    </div>
                  </div>

                  <button className="w-full bg-[#C9822C] text-white font-bold tracking-[0.2em] text-sm px-6 py-4 rounded-md">
                    Donate to This Family
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="container mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-[28px] border border-surface-container p-8">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#C9A84C] mb-3">Their Story</p>
              <p className="text-lg leading-8 text-on-surface-variant">{campaign.story}</p>
            </div>

            <div className="lg:col-span-5 bg-white rounded-[28px] border border-surface-container p-8">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#C9A84C] mb-5">Funding Priorities</p>
              <div className="space-y-4">
                {campaign.priorities.map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl bg-surface-container-low px-5 py-4">
                    <span className="font-semibold text-primary">{item}</span>
                    <span className="material-symbols-outlined text-[#C9A84C]">check_circle</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="container mt-16">
            <div className="bg-white rounded-[28px] border border-surface-container p-8">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#C9A84C] mb-6">More Images</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {campaign.gallery.map((image, index) => (
                  <div key={`${campaign.slug}-gallery-${index}`} className="overflow-hidden rounded-3xl h-64 bg-surface-container-low">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      src={image}
                      alt={`${campaign.title} gallery ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </>
  );
};

export default NeedDetail;
