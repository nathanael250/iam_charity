import beforeImg from "../assets/imact stories/before.png";
import afterImg from "../assets/imact stories/after.png";

const stories = [
  {
    initials: "MF",
    name: "Mukamana family",
    location: "Gasabo District, Kigali",
    year: "Housed in 2023",
    quote:
      "We were eight people in two rooms with a leaking roof. Today my children have their own beds, a study corner, and they're doing better in school. I never imagined this was possible for us.",
    beforeImage: beforeImg,
    afterImage: afterImg,
    beforeColor: "#5a4a3a",
    afterColor: "#3a5a7a",
    beforeDesc: "Dilapidated 2-room structure, cracked walls, no sanitation",
    afterDesc: "4-room permanent home, full plumbing, safe roof",
    stats: [
      { label: "Rooms before → after", val: "2 → 4", gold: false },
      { label: "Family members", val: "8 people", gold: false },
      { label: "Construction time", val: "11 weeks", gold: true },
      { label: "Stability score", val: "94%", bar: 94, gold: true }
    ]
  },
  {
    initials: "UF",
    name: "Uwimana family",
    location: "Kicukiro District, Kigali",
    year: "Housed in 2024",
    quote:
      "My husband passed away and I was left with four children and no shelter. iam charity rebuilt our home and also helped me find work. We are not just surviving — we are living.",
    beforeImage: beforeImg,
    afterImage: afterImg,
    beforeColor: "#6b4a2a",
    afterColor: "#2a5a4a",
    beforeDesc: "Condemned mud structure, no electricity, flood-prone land",
    afterDesc: "Elevated concrete home, solar power, rainwater system",
    stats: [
      { label: "Structure type before", val: "Mud/clay", gold: false },
      { label: "Structure type after", val: "Concrete", gold: true },
      { label: "New amenities added", val: "Solar + water", gold: true },
      { label: "Stability score", val: "97%", bar: 97, gold: true }
    ]
  },
  {
    initials: "OF",
    name: "Habimana family",
    location: "Huye District, Southern Province",
    year: "Housed in 2022",
    quote:
      "Three years later, my son just started university. That would have been unthinkable before we had a stable place to live. A home is everything. It is the beginning of all things.",
    beforeImage: beforeImg,
    afterImage: afterImg,
    beforeColor: "#4a3a5a",
    afterColor: "#3a6a5a",
    beforeDesc: "Rented single room shared with two other families, no privacy",
    afterDesc: "Independent 3-bedroom home with yard for the children",
    stats: [
      { label: "Years in instability", val: "6 years", gold: false },
      { label: "Children in school now", val: "3 of 3", gold: true },
      { label: "Time housed", val: "3+ years", gold: true },
      { label: "Stability score", val: "99%", bar: 99, gold: true }
    ]
  }
];

const ImpactStories = () => {
  return (
    <section className="bg-[#f8f8f6] py-20">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#f0e8c8] text-[#7a5e10] text-[11px] font-semibold tracking-[0.15em] px-3.5 py-1 rounded border border-[#d4af37] mb-4">
            OUR IMPACT
          </div>
          <h2 className="text-[38px] font-bold text-[#1a1a3e] mb-3 leading-tight">Impact Stories</h2>
          <p className="text-base text-[#666] max-w-[480px] mx-auto leading-[1.7]">
            Real families, real transformations. Your support builds safe homes and lasting stability.
          </p>
        </div>

        {stories.map((story) => (
          <div key={story.name} className="bg-white rounded-2xl border border-[#e0d9c8] overflow-hidden w-full mb-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4px_1fr]">
              <div className="relative h-80 overflow-hidden bg-[#f0ebe3]">
                <div className="absolute top-3.5 left-3.5 z-10 text-[11px] font-bold tracking-[0.15em] px-3 py-1 rounded-full bg-[#1a1a3e] text-white">
                  BEFORE
                </div>
                <img className="w-full h-full object-cover block" src={story.beforeImage} alt={`${story.name} before`} />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-[#666] leading-snug">
                  {story.beforeDesc}
                </div>
              </div>
              <div className="hidden md:flex w-1 bg-[#b8962e] relative z-10 items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#b8962e] border-[3px] border-white flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 6h6M6 3l3 3-3 3"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative h-80 overflow-hidden bg-[#e8f0e8]">
                <div className="absolute top-3.5 left-3.5 z-10 text-[11px] font-bold tracking-[0.15em] px-3 py-1 rounded-full bg-[#b8962e] text-white">
                  AFTER
                </div>
                <img className="w-full h-full object-cover block" src={story.afterImage} alt={`${story.name} after`} />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-[#666] leading-snug">
                  {story.afterDesc}
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a3e] flex items-center justify-center text-[15px] font-bold text-[#d4af37] shrink-0">
                    {story.initials}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-[#1a1a3e]">{story.name}</div>
                    <div className="text-xs text-[#999]">{story.location}</div>
                    <div className="inline-block mt-1 bg-[#f0e8c8] text-[#7a5e10] text-[11px] px-2 py-0.5 rounded font-semibold">
                      {story.year}
                    </div>
                  </div>
                </div>
                <div className="text-[#b8962e] text-sm tracking-[0.2em] mb-2">★★★★★</div>
                <div className="border-l-[3px] border-[#b8962e] pl-4 mb-5">
                  <p className="text-[15px] text-[#333] leading-relaxed italic">"{story.quote}"</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {story.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#f8f8f6] rounded-lg px-4 py-3.5 flex justify-between items-center border border-[#e8e0cc] gap-4"
                  >
                    <div className="flex-1">
                      <div className="text-xs text-[#888]">{stat.label}</div>
                      {stat.bar ? (
                        <div className="bg-[#eee] rounded-full h-1.5 mt-1.5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${stat.bar}%`, background: stat.gold ? "#b8962e" : "#1a1a3e" }}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className={`text-[15px] font-bold ${stat.gold ? "text-[#b8962e]" : "text-[#1a1a3e]"}`}>
                      {stat.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#ECE7EB] px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-[13px] text-[#aaa] max-w-[520px] leading-snug">
                Every story here represents a real family whose life changed permanently. Your donation makes the next
                story possible.
              </p>
              <button className="bg-[#b8962e] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold whitespace-nowrap" type="button">
                View More ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStories;
