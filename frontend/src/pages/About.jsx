import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import aboutHero from "../assets/hello_sec-img_1.png";
import impactFamily from "../assets/family_images/c_img2.png";
import teamOne from "../assets/family_images/c_img1.png";
import teamTwo from "../assets/family_images/c_img3.png";
import teamThree from "../assets/family_images/c_img4.png";
import teamFour from "../assets/family_images/c_img5.png";

const values = [
  { icon: "volunteer_activism", title: "Compassion", text: "We care deeply about people and act with kindness and empathy." },
  { icon: "verified_user", title: "Integrity", text: "We are honest, transparent, and accountable in everything we do." },
  { icon: "groups", title: "Respect", text: "We value every individual regardless of background, belief, or circumstance." },
  { icon: "favorite", title: "Empowerment", text: "We empower families and communities to build a better future." },
  { icon: "diversity_3", title: "Collaboration", text: "We believe in the power of partnerships and working together for greater impact." },
];

const stats = [
  { icon: "home", value: "1,240+", label: "Families Housed", meta: "Since 2018" },
  { icon: "verified_user", value: "98%", label: "Still in Stable Housing", meta: "After 2 Years" },
  { icon: "groups", value: "34", label: "Communities", meta: "Transformed" },
  { icon: "favorite", value: "2,500+", label: "Generous Donors", meta: "Worldwide" },
];

const team = [
  { name: "Jean Claude N.", role: "Founder & Director", image: teamOne, position: "center 34%" },
  { name: "Aline M.", role: "Programs Manager", image: teamTwo, position: "center 30%" },
  { name: "Emmanuel R.", role: "Operations Manager", image: teamThree, position: "center 32%" },
  { name: "Claudine T.", role: "Partnerships Lead", image: teamFour, position: "center 30%" },
];

const SectionTitle = ({ eyebrow, title, centered = false }) => (
  <div className={centered ? "text-center" : ""}>
    {eyebrow && <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#C9A84C]">{eyebrow}</p>}
    <h2 className="mt-2 text-[30px] font-extrabold leading-tight text-[#17142F] md:text-[34px]">{title}</h2>
    <div className={["mt-3 h-[3px] w-12 bg-[#C9A84C]", centered ? "mx-auto" : ""].join(" ")} />
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="relative overflow-hidden bg-[#14112D] text-white">
          <img
            src={aboutHero}
            alt="Mother and child near a home under construction"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14112D] via-[#14112D]/88 via-58% to-[#14112D]/8" />
          <div className="container relative z-10 flex min-h-[372px] items-center py-12">
            <div className="max-w-[500px]">
              <p className="text-sm font-bold text-white/85">
                <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
                <span className="mx-2">›</span>
                About Us
              </p>
              <h1 className="mt-8 text-[44px] font-extrabold tracking-normal md:text-[56px]">About Us</h1>
              <div className="mt-5 h-[3px] w-14 bg-[#C9A84C]" />
              <p className="mt-7 text-base font-semibold leading-8 text-white/88">
                We are a community of passionate people working together to build homes, restore hope, and transform lives for vulnerable families.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 lg:py-14">
          <div className="container grid gap-7 lg:grid-cols-[1.18fr_1fr_1fr]">
            <div className="pr-0 lg:pr-12">
              <SectionTitle title="Our Story" />
              <div className="mt-7 space-y-6 text-[15px] font-semibold leading-8 text-[#4F4B60]">
                <p>
                  Hope & Homes Foundation was founded with a simple idea: every family deserves a safe place to call home. What started as a small initiative to support a few homeless families has grown into a movement that has impacted thousands of lives.
                </p>
                <p>
                  We work hand-in-hand with local communities, partners, and generous supporters to build more than houses. We build hope, dignity, and a better future.
                </p>
              </div>
              <Link
                to="/projects"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#C9A84C] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#C9A84C]/25 transition hover:bg-[#b99737]"
              >
                Our Impact
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <article className="min-h-[340px] rounded-lg bg-gradient-to-br from-[#FBF8EF] to-[#F7F1E4] p-10 shadow-[0_18px_50px_rgba(17,14,47,0.055)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#C9A84C] shadow-sm">
                <span className="material-symbols-outlined text-[34px]">track_changes</span>
              </div>
              <h3 className="mt-8 text-2xl font-extrabold text-[#17142F]">Our Mission</h3>
              <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mt-6 text-[15px] font-semibold leading-8 text-[#4F4B60]">
                To mobilize resources and build safe, decent, and sustainable homes for homeless and vulnerable families, while providing essential support that improves their quality of life.
              </p>
            </article>

            <article className="min-h-[340px] rounded-lg bg-gradient-to-br from-[#FCF8FD] to-[#F7F1FA] p-10 shadow-[0_18px_50px_rgba(17,14,47,0.055)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#C9A84C] shadow-sm">
                <span className="material-symbols-outlined text-[34px]">visibility</span>
              </div>
              <h3 className="mt-8 text-2xl font-extrabold text-[#17142F]">Our Vision</h3>
              <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mt-6 text-[15px] font-semibold leading-8 text-[#4F4B60]">
                A world where every family has a safe home, every child has hope, and every community can thrive with dignity and opportunity.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-[#FAFAFC] py-11">
          <div className="container">
            <SectionTitle title="Our Core Values" centered />
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
              {values.map((value) => (
                <article key={value.title} className="text-center">
                  <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#E2C66C] bg-white text-[#C9A84C] shadow-sm">
                    <span className="material-symbols-outlined text-[34px]">{value.icon}</span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-extrabold text-[#17142F]">{value.title}</h3>
                  <p className="mx-auto mt-3 max-w-[185px] text-xs font-semibold leading-6 text-[#4F4B60]">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="container grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <SectionTitle title="Our Impact in Numbers" />
              <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className={["px-3 text-center", index !== 0 ? "lg:border-l lg:border-[#EAE5ED]" : ""].join(" ")}>
                    <span className="material-symbols-outlined text-[34px] text-[#C9A84C]">{stat.icon}</span>
                    <p className="mt-4 text-[26px] font-extrabold text-[#17142F]">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold text-[#514E66]">{stat.label}</p>
                    <p className="text-xs font-semibold text-[#777386]">{stat.meta}</p>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={impactFamily}
              alt="Family standing in front of a completed home"
              className="h-[294px] w-full rounded-lg object-cover object-center shadow-[0_16px_44px_rgba(17,14,47,0.1)]"
            />
          </div>
        </section>

        <section className="bg-[#FBFAFF] py-10">
          <div className="container">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-[30px] font-extrabold text-[#17142F]">Our Team</h2>
                <p className="mt-2 max-w-[480px] text-sm font-semibold leading-7 text-[#4F4B60]">
                  A dedicated team of professionals and volunteers committed to making a difference.
                </p>
              </div>
              <Link
                to="/volunteer"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[#C9A84C] px-6 py-3 text-sm font-extrabold text-[#C49B2E] transition hover:bg-[#C9A84C] hover:text-white"
              >
                Join Our Team
                <span className="material-symbols-outlined text-[18px]">group_add</span>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <article key={member.name} className="rounded-lg bg-white p-7 text-center shadow-[0_14px_38px_rgba(17,14,47,0.07)] ring-1 ring-[#F0ECF4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto h-20 w-20 rounded-full object-cover grayscale"
                    style={{ objectPosition: member.position }}
                  />
                  <h3 className="mt-5 text-base font-extrabold text-[#17142F]">{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#777386]">{member.role}</p>
                  <div className="mt-5 flex justify-center gap-5 text-[#17142F]">
                    {["business_center", "public", "mail"].map((icon) => (
                      <span key={`${member.name}-${icon}-${index}`} className="material-symbols-outlined text-[17px] text-[#C9A84C]">
                        {icon}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAFF] pb-3">
          <div className="container">
            <div className="rounded-lg bg-[#17142F] px-8 py-8 text-white shadow-[0_16px_44px_rgba(17,14,47,0.14)]">
              <div className="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]">
                  <span className="material-symbols-outlined text-[38px]">volunteer_activism</span>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold">Be Part of the Change</h2>
                  <p className="mt-2 text-sm font-semibold text-white/75">Your support helps us build homes and transform lives.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-7 py-4 text-sm font-extrabold text-white transition hover:bg-[#b99737]"
                  >
                    Donate Now
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </Link>
                  <Link
                    to="/volunteer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Become a Volunteer
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
