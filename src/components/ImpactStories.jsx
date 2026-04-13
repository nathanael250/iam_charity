const stories = [
  {
    initials: "MF",
    name: "Mensah family",
    location: "Accra, Ghana",
    year: "Housed in 2023",
    quote:
      "We were eight people in two rooms with a leaking roof. Today my children have their own beds, a study corner, and they're doing better in school. I never imagined this was possible for us.",
    beforeImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5v9x8teeQbmY2RqUqoQgVkf_FrbsofIFNUEi5UdKxHQCHvGjdqpcIfb2WOg1HiWLnizC_XYZCDODgma42HVb0pmPZWYjC7cueIFvAM_8E1SGvjYF9cAYrOrZFdo73vlH6Vu5h42S0M9ITn-HHSZ0LUXt4MaVIdzYg67zOqNkPdY1Lxt3KmeXmmOX-wWuJ5mfUVFCz7P0vKxDkpiCGWMI8ugQb-V-ADuu6HphD728nDjiY1_4kU6BbAxaNB99JVYk8stCZitAu2Vq9",
    afterImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhtl7y7spToOK2UMfdX9XlFiNiF-PECVfB68M47FuZOiMDddrkqLaFGgnIpwBiYEgjROcbZBu-pDeZX3bemeK_SOqJVnKhb-c1-NkXtZ0heR508tE4zpWBpmD8HuhvaRYClNYptcBoIDCzeqslc3zcQJMaqWYgmZxsqdJG8926WtymPtV9JpbTNv-tF-5ut46061HJkLXy4aGaM9dgKxr2mwhOz01DFgDzLH78xGSRb6uK9SC41gO5_VAZcKbMhqpCHbPla-ZFNO-4",
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
    location: "Kigali, Rwanda",
    year: "Housed in 2024",
    quote:
      "My husband passed away and I was left with four children and no shelter. iam charity rebuilt our home and also helped me find work. We are not just surviving — we are living.",
    beforeImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhFlSiotiZTVG6dsGRJdgDzfDhc__zxAHhnTGWnNWvhA4CX7AmgepUL_U6Zj8M-y1j17d--O5FmGJTHDhkbB1dSQl7RuQH6l3DnkBtffWl0MEnXaNjEnEETs8jyZe60VWMkKCrK5t4xGqtlVakn94QUm0D5Z3Wi0aJ72Odlkykcda3vjV8mhQcNskS3vn6GNgk1NwCOqWFmjvlddF7rnpBazu5Zdakbjfy4kwy9ie2J2BL95TP-QKfrs4DlYeMuJErF0216IeK89d-",
    afterImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTnA2y1HNBCKZ7A6KTK_viPLx5jd4qPebd_BMrXLBcbVUjAbChN4qZ01mQHL3KnLp8a1mCzr6fVE3pyTdSWLyGCIlpiQVBvjtTPtEKLBMdKKtLD37isMYUbOERAgNKI3GRBxfPdBtJXIKQAMUBbSI8jve7tTHWe_22DDw2xDPhJZHZgcMYSsrRtyak41UFh5PnBV34eogGZsDne8bjcL_jyURXh-kNRIhwM4d4Qfk388cbED-1nxhjFOPZmZaeUYNon_CmoTMiKW6p",
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
    name: "Osei family",
    location: "Kumasi, Ghana",
    year: "Housed in 2022",
    quote:
      "Three years later, my son just started university. That would have been unthinkable before we had a stable place to live. A home is everything. It is the beginning of all things.",
    beforeImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9I8ksrZ8G8VbJbyXtSJXaqo5uEVOUuXhWN4wJ9F9hs-WIJtuv2gI-5xX7IoQBTXle-t-DjR1OkrqMsRNuAsWa862hFClRUcpqUljEiAEYWWzj-cAQl2UbxUn1ueSI3tT5mBGy-SwiS-3Qr_jfXblSRWZquJ6nadTrpbj1kteQQk6dk4VfpDl2QSjrd4T8yqzsAF3ivPjB7mglys0szwlkXB8O5ZXcRSpSB563I4f3zCRcxC6G4sT8TO3BEOit412ATAuY1ClSy-ru",
    afterImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAy4GXAI787v1HuECZt_a44UKUFQjXYa5f6Rue6I4HT-ICD93UWK6hBS-RcwjOqFtTU0k8DLWpuj2tgdq6NLfbHAmxT7M4V6H-ppb94i-tOfssAz3zJn53DN9H1wJg_Kd64xUSRcPYqR16I7v1aHH4aeatnVnI8RePLHdXDU0QFM6JTFS7LXBH4cvv3Ob6DYEJW4n7V6bWIMzUVf0GL80J7gLa_Z2k6NbsWjnPymPFdWLMxQrSS7x75L4lE3AjYYuf11ZLvH5D0Ev3E",
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
    <section className="impact-stories section">
      <div className="container">
        <div className="section-top">
          <div className="badge">OUR IMPACT</div>
          <h2 className="section-title">Impact Stories</h2>
          <p className="section-sub">
            Real families, real transformations. Your support builds safe homes and lasting stability.
          </p>
        </div>

        {stories.map((story) => (
          <div key={story.name} className="story-card">
            <div className="before-after">
              <div className="img-panel" style={{ background: "#f0ebe3" }}>
                <div className="img-panel-label label-before">BEFORE</div>
                <img className="img-panel-img" src={story.beforeImage} alt={`${story.name} before`} />
                <div className="img-panel-desc">{story.beforeDesc}</div>
              </div>
              <div className="divider-bar">
                <div className="divider-icon">
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
              <div className="img-panel" style={{ background: "#e8f0e8" }}>
                <div className="img-panel-label label-after">AFTER</div>
                <img className="img-panel-img" src={story.afterImage} alt={`${story.name} after`} />
                <div className="img-panel-desc">{story.afterDesc}</div>
              </div>
            </div>

            <div className="story-body">
              <div>
                <div className="story-family">
                  <div className="family-avatar">{story.initials}</div>
                  <div>
                    <div className="family-name">{story.name}</div>
                    <div className="family-location">{story.location}</div>
                    <div className="year-badge">{story.year}</div>
                  </div>
                </div>
                <div className="stars">★★★★★</div>
                <div className="quote-block">
                  <p className="quote-text">"{story.quote}"</p>
                </div>
              </div>
              <div className="story-stats">
                {story.stats.map((stat) => (
                  <div key={stat.label} className="stat-row">
                    <div>
                      <div className="stat-label-s">{stat.label}</div>
                      {stat.bar ? (
                        <div className="progress-bg">
                          <div
                            className="progress-fill"
                            style={{ width: `${stat.bar}%`, background: stat.gold ? "#b8962e" : "#1a1a3e" }}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className={`stat-val ${stat.gold ? "gold" : ""}`}>{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="impact-footer">
              <p className="footer-quote-small">
                Every story here represents a real family whose life changed permanently. Your donation makes the next
                story possible.
              </p>
              <button className="footer-cta" type="button">
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
