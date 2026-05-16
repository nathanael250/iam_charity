import beforeImg from "../assets/imact stories/before.png";
import afterImg from "../assets/imact stories/after.png";

const stories = [
  {
    initials: "MF",
    name: "Mukamana family",
    location: "Gasabo District, Kigali",
    year: "Housed in 2023",
    quote:
      "We were eight people in two rooms with a leaking roof. Today my children have their own beds, a study corner, and they are doing better in school. I never imagined this was possible for us.",
    beforeImage: beforeImg,
    afterImage: afterImg,
    beforeDesc: "A leaking two-room structure with poor sanitation and no privacy for the children.",
    afterDesc: "A stable four-room home with safety, dignity, and enough space for the family to live well.",
    story:
      "The Mukamana family had lived for years in a cramped shelter that could not protect them from rain or illness. Support from I Am Group made it possible to rebuild their home and restore a sense of safety for every child in the family.",
    turningPoint:
      "The rebuilding process gave the family more than walls and roofing. It gave them structure, confidence, and a place where school, rest, and daily life could happen with dignity.",
    stats: [
      { label: "Rooms before to after", val: "2 to 4" },
      { label: "Family members supported", val: "8 people" },
      { label: "Construction time", val: "11 weeks" },
      { label: "Stability score", val: "94%", bar: 94 },
    ],
  },
  {
    initials: "UF",
    name: "Uwimana family",
    location: "Kicukiro District, Kigali",
    year: "Housed in 2024",
    quote:
      "My husband passed away and I was left with four children and no shelter. I Am Group rebuilt our home and also helped me find work. We are not just surviving. We are living.",
    beforeImage: beforeImg,
    afterImage: afterImg,
    beforeDesc: "An unstable mud house on flood-prone ground with no electricity and no secure living conditions.",
    afterDesc: "A stronger family home with improved safety, better structure, and new daily stability.",
    story:
      "After the loss of her husband, the Uwimana family faced both grief and homelessness. The situation had become dangerous for the children, and every day was defined by uncertainty.",
    turningPoint:
      "Housing support, practical follow-up, and help toward income created a new direction for the family. The home became the base from which recovery and stability could begin.",
    stats: [
      { label: "Children in the household", val: "4 children" },
      { label: "Housing condition before", val: "Unsafe shelter" },
      { label: "Support added", val: "Housing plus work guidance" },
      { label: "Stability score", val: "97%", bar: 97 },
    ],
  },
  {
    initials: "HF",
    name: "Habimana family",
    location: "Huye District, Southern Province",
    year: "Housed in 2022",
    quote:
      "Three years later, my son just started university. That would have been unthinkable before we had a stable place to live. A home is the beginning of everything.",
    beforeImage: beforeImg,
    afterImage: afterImg,
    beforeDesc: "One rented room shared in overcrowded conditions without privacy or long-term security.",
    afterDesc: "An independent family home with space for study, rest, and a healthier future for the children.",
    story:
      "The Habimana family spent years moving through unstable living arrangements. Privacy was limited, schooling was difficult, and long-term planning was nearly impossible.",
    turningPoint:
      "A secure home changed the family’s direction. The children gained a stable place to learn, and the household was able to look beyond survival toward growth and opportunity.",
    stats: [
      { label: "Years in unstable housing", val: "6 years" },
      { label: "Children now in school", val: "3 of 3" },
      { label: "Time in stable housing", val: "3+ years" },
      { label: "Stability score", val: "99%", bar: 99 },
    ],
  },
];

const ImpactStories = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="mb-14 max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-tertiary">Impact Stories</p>
          <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-primary md:text-6xl">
            Stories that show what changes when help becomes personal.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-on-surface-variant">
            These are not just project updates. Each story shows what life looked like before support, what changed
            during intervention, and what stability now means for a real family in Rwanda.
          </p>
        </div>

        <div className="space-y-12">
          {stories.map((story, index) => (
            <article
              key={story.name}
              className="overflow-hidden rounded-[32px] border border-surface-container bg-white shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative overflow-hidden bg-primary-container px-8 py-10 text-white md:px-10 md:py-12">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-tertiary-container blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-white blur-3xl" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8 flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-tertiary-container">
                          Story {index + 1}
                        </p>
                        <h3 className="mt-3 text-3xl font-black tracking-tight">{story.name}</h3>
                        <p className="mt-2 text-base text-white/70">{story.location}</p>
                      </div>
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg font-bold text-tertiary-container">
                        {story.initials}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/10 p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Their Voice</p>
                      <p className="mt-4 text-xl font-semibold leading-9 text-white md:text-[2rem] md:leading-[2.6rem]">
                        &quot;{story.quote}&quot;
                      </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Status</p>
                        <p className="mt-2 text-lg font-semibold text-white">{story.year}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Outcome</p>
                        <p className="mt-2 text-lg font-semibold text-white">Family stability restored</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-10 md:px-10 md:py-12">
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="overflow-hidden rounded-[30px] border border-surface-container bg-surface-container-low">
                      <div className="relative h-[25rem] md:h-[30rem]">
                        <img className="h-full w-full object-cover" src={story.beforeImage} alt={`${story.name} before`} />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 py-6">
                          <span className="inline-flex rounded-full bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                            Before
                          </span>
                          <p className="mt-4 max-w-md text-base leading-7 text-white/90">{story.beforeDesc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[30px] border border-surface-container bg-surface-container-low">
                      <div className="relative h-[25rem] md:h-[30rem]">
                        <img className="h-full w-full object-cover" src={story.afterImage} alt={`${story.name} after`} />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 py-6">
                          <span className="inline-flex rounded-full bg-tertiary-container px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B0E3D]">
                            After
                          </span>
                          <p className="mt-4 max-w-md text-base leading-7 text-white/90">{story.afterDesc}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="rounded-[28px] border border-surface-container bg-surface-container-low p-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Chapter 1</p>
                      <h4 className="text-2xl font-bold tracking-tight text-primary">Before support</h4>
                      <p className="mt-3 leading-8 text-on-surface-variant">{story.story}</p>
                    </div>

                    <div className="rounded-[28px] border border-tertiary-container/40 bg-[#faf5e8] p-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Chapter 2</p>
                      <h4 className="text-2xl font-bold tracking-tight text-primary">What changed</h4>
                      <p className="mt-3 leading-8 text-on-surface-variant">{story.turningPoint}</p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[28px] border border-surface-container bg-[#f8f8f6] p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Story Evidence</p>
                        <h4 className="mt-2 text-2xl font-bold tracking-tight text-primary">What this impact looks like</h4>
                      </div>
                      <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant md:block">
                        Measurable change
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {story.stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-surface-container bg-white px-5 py-4">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-sm leading-6 text-on-surface-variant">{stat.label}</p>
                            <p className="text-lg font-bold text-primary">{stat.val}</p>
                          </div>
                          {stat.bar ? (
                            <div className="mt-4 h-2 rounded-full bg-surface-container-high">
                              <div
                                className="h-2 rounded-full bg-tertiary-container"
                                style={{ width: `${stat.bar}%` }}
                              />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;
