import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { impactGalleryService, impactPageHeroService, impactPageStatisticService, impactUpdateService } from "../services/adminServices";
import { getAssetUrl } from "../services/clientService";
import beforeImage from "../assets/imact stories/before.png";
import afterImage from "../assets/imact stories/after.png";
import familyImage from "../assets/family_images/c_img1.png";
import motherImage from "../assets/family_images/c_img3.png";
import communityImage from "../assets/family_images/c_img4.png";
import schoolImage from "../assets/family_images/c_img6.png";

const defaultStats = [
  { icon: "groups", value: "0", label: "Families Helped" },
  { icon: "volunteer_activism", value: "0", label: "Volunteers Involved" },
  { icon: "favorite", value: "0", label: "Supporters" },
  { icon: "location_on", value: "0", label: "Communities Reached" },
];

const defaultStories = [
  {
    category: "Safe Home",
    title: "The Mukamana Family Has a Safe Home",
    location: "Kigali, Kabuga",
    before: beforeImage,
    after: afterImage,
    text: "The family moved from a temporary shelter into a safe home with room to live and grow.",
    result: "5 family members supported",
  },
  {
    category: "Family Support",
    title: "A More Secure Life for Nyiransabimana",
    location: "Rulindo, Cyinzuzi",
    before: familyImage,
    after: motherImage,
    text: "Practical support helped Nyiransabimana create a safer and more stable life for her children.",
    result: "4 family members supported",
  },
  {
    category: "Education",
    title: "Children Received Learning Materials",
    location: "Gicumbi District",
    before: schoolImage,
    after: schoolImage,
    text: "Children received the materials they needed to return to class and continue learning.",
    result: "120 children supported",
  },
];

const defaultGallery = [
  { image: afterImage, label: "A safe home completed", className: "lg:col-span-2 lg:row-span-2" },
  { image: motherImage, label: "Family support visit", className: "" },
  { image: schoolImage, label: "Education support", className: "" },
  { image: communityImage, label: "Community outreach", className: "" },
];

const resolveImage = (path) => (String(path || "").startsWith("/assets/") ? path : getAssetUrl(path));

const ImpactStoriesPage = () => {
  const [hero, setHero] = useState({ before_image_url: "", after_image_url: "" });
  const [stats, setStats] = useState(defaultStats);
  const [stories, setStories] = useState(defaultStories);
  const [gallery, setGallery] = useState(defaultGallery);

  useEffect(() => {
    let isMounted = true;

    impactPageHeroService.get()
      .then((data) => {
        if (isMounted && data) setHero(data);
      })
      .catch(() => {
        if (isMounted) setHero({ before_image_url: "", after_image_url: "" });
      });

    impactPageStatisticService.list()
      .then((data) => {
        if (isMounted && data?.length) setStats(data);
      })
      .catch(() => {
        if (isMounted) setStats(defaultStats);
      });

    impactUpdateService.list({ status: "published", limit: 12 })
      .then((data) => {
        if (isMounted && data?.length) {
          setStories(data.map((item) => ({
            id: item.id,
            category: item.project_title || "Completed Support",
            title: item.title,
            location: item.project_title || "Rwanda",
            before: item.before_image_url || item.image_url || beforeImage,
            after: item.after_image_url || item.image_url || afterImage,
            text: item.description || item.support_summary || "Support was delivered and lives were changed.",
            result: `${Number(item.people_helped || 0)} people supported`,
          })));
        }
      })
      .catch(() => {
        if (isMounted) setStories(defaultStories);
      });

    impactGalleryService.list({ limit: 4 })
      .then((data) => {
        if (isMounted && data?.length) {
          setGallery(data.slice(0, 4).map((item, index) => {
            const position = Number(item.gallery_position || index + 1);
            return {
            id: item.id,
            image: item.image_url,
            label: item.caption || item.project_title || "Impact gallery photo",
            className: position === 1 ? "lg:col-span-2 lg:row-span-2" : "",
          };
          }));
        }
      })
      .catch(() => {
        if (isMounted) setGallery(defaultGallery);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="bg-[#14112D] text-white">
          <div className="container grid items-center gap-5 py-7 sm:gap-8 sm:py-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#C9A84C] sm:text-xs">Our Impact</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">See what changed</h1>
              <p className="mt-3 max-w-[500px] text-sm font-semibold leading-6 text-white/75 sm:mt-4 sm:leading-7">
                These are people and communities whose lives improved through donations, volunteer service, and practical care.
              </p>
            </div>

            <div className="grid h-48 grid-cols-2 overflow-hidden rounded-lg sm:h-64">
              <div className="relative">
                <img src={hero.before_image_url ? getAssetUrl(hero.before_image_url) : beforeImage} alt="Family living conditions before support" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-3 left-3 rounded bg-[#17142F] px-3 py-1.5 text-[10px] font-extrabold sm:text-xs">Before</span>
              </div>
              <div className="relative border-l border-white/70">
                <img src={hero.after_image_url ? getAssetUrl(hero.after_image_url) : afterImage} alt="Family home after support" className="h-full w-full object-cover" />
                <span className="absolute bottom-3 right-3 rounded bg-[#C9A84C] px-3 py-1.5 text-[10px] font-extrabold sm:text-xs">After</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAFF] py-7 sm:py-10">
          <div className="container">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Impact in numbers</h2>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-[#C9A84C]" />
            <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-lg border border-[#ECE7EF] bg-white shadow-[0_12px_32px_rgba(17,14,47,0.05)] lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={[
                    "px-3 py-5 text-center sm:py-7",
                    index % 2 === 0 ? "border-r border-[#ECE7EF] lg:border-r" : "",
                    index < 2 ? "border-b border-[#ECE7EF] lg:border-b-0" : "",
                    index > 0 ? "lg:border-l lg:border-[#ECE7EF]" : "",
                    index % 2 === 0 ? "lg:border-r-0" : "",
                  ].join(" ")}
                >
                  <span className="material-symbols-outlined text-[25px] text-[#C9A84C] sm:text-[30px]">{stat.icon}</span>
                  <p className="mt-2 text-xl font-extrabold sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#625E72] sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-12">
          <div className="container">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#C49B2E]">Completed Support</p>
                <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Stories of lives changed</h2>
              </div>
              <p className="max-w-[440px] text-xs font-semibold leading-5 text-[#625E72] sm:text-sm sm:leading-6">
                A simple view of the need, the support delivered, and the result.
              </p>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {stories.map((story) => (
                <article key={story.id || story.title} className="overflow-hidden rounded-lg border border-[#EEE9DA] bg-white shadow-[0_12px_34px_rgba(17,14,47,0.07)]">
                  <div className="grid h-40 grid-cols-2 sm:h-48">
                    <div className="relative">
                      <img src={resolveImage(story.before || beforeImage)} alt={`${story.title} before support`} className="h-full w-full object-cover" />
                      <span className="absolute left-2 top-2 rounded bg-[#17142F] px-2 py-1 text-[9px] font-extrabold text-white">Before</span>
                    </div>
                    <div className="relative">
                      <img src={resolveImage(story.after || afterImage)} alt={`${story.title} after support`} className="h-full w-full object-cover" />
                      <span className="absolute right-2 top-2 rounded bg-[#C9A84C] px-2 py-1 text-[9px] font-extrabold text-white">After</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded bg-[#FBF7EA] px-2.5 py-1.5 text-[10px] font-extrabold text-[#B98C18]">{story.category}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#777386]">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {story.location}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-extrabold leading-6">{story.title}</h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-[#5D586B] sm:text-sm sm:leading-6">{story.text}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs font-extrabold text-[#C49B2E]">
                      <span className="material-symbols-outlined text-[17px]">check_circle</span>
                      {story.result}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAFF] py-8 sm:py-12">
          <div className="container">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#C49B2E]">Gallery</p>
                <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Charity work in pictures</h2>
              </div>
              <p className="hidden max-w-[400px] text-sm font-semibold leading-6 text-[#625E72] sm:block">
                Moments from completed support, community visits, and lives changed.
              </p>
            </div>

            <div className="mt-6 grid auto-rows-[135px] grid-cols-2 gap-2 sm:auto-rows-[180px] sm:gap-3 lg:grid-cols-4">
              {gallery.map((item) => (
                <figure
                  key={item.id || item.label}
                  className={["group relative overflow-hidden rounded-lg bg-[#E9E4DC]", item.className].join(" ")}
                >
                  <img
                    src={resolveImage(item.image)}
                    alt={item.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17142F]/75 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-[10px] font-extrabold text-white sm:p-4 sm:text-xs">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-10 sm:pb-14">
          <div className="container">
            <div className="rounded-lg border border-[#E7D8AA] bg-[#FBF6E8] p-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7">
              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl">Help create the next story</h2>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#625E72] sm:text-sm">Choose someone who needs support now or join a future charity activity.</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:shrink-0 sm:gap-3">
                <Link to="/projects" className="inline-flex items-center justify-center rounded-md bg-[#17142F] px-4 py-3 text-xs font-extrabold text-white sm:px-6 sm:text-sm">
                  Support Someone
                </Link>
                <Link to="/volunteer" className="inline-flex items-center justify-center rounded-md border border-[#C9A84C] bg-white px-4 py-3 text-xs font-extrabold text-[#B68A17] sm:px-6 sm:text-sm">
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ImpactStoriesPage;
