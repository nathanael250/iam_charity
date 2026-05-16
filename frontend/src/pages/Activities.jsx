import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import heroImage from "../assets/hello_sec-img.png";
import completedHome from "../assets/family_images/c_img2.png";
import constructionImage from "../assets/family_images/c_img5.png";
import foodImage from "../assets/family_images/c_img3.png";
import itemsImage from "../assets/family_images/c_img4.png";
import schoolImage from "../assets/family_images/c_img6.png";
import galleryImage from "../assets/family_images/c_img1.png";

const activityTypes = [
  { icon: "home", title: "Housing Construction", text: "We build safe and affordable homes for homeless families." },
  { icon: "groups", title: "Food Support", text: "We provide food to families facing hunger and food insecurity." },
  { icon: "inventory_2", title: "Essential Items", text: "We supply mattresses, clothing, kitchen tools, and other essentials." },
  { icon: "menu_book", title: "Education Support", text: "We support children's education and provide learning materials." },
  { icon: "health_and_safety", title: "Healthcare Support", text: "We help families access basic healthcare and medical services." },
  { icon: "diversity_3", title: "Community Outreach", text: "We organize community programs that build hope and unity." },
];

const recentActivities = [
  {
    image: constructionImage,
    title: "House Construction in Kigali, Kabuga",
    date: "May 12, 2024",
    text: "Our team and volunteers worked together to build a new home for a family of 5.",
  },
  {
    image: foodImage,
    title: "Food Distribution in Rulindo",
    date: "May 05, 2024",
    text: "Distributed food packages to 85 vulnerable families in the community.",
  },
  {
    image: itemsImage,
    title: "Essential Items Donation",
    date: "April 28, 2024",
    text: "Provided mattresses, cooking tools, and clothing to 40 families.",
  },
  {
    image: schoolImage,
    title: "School Supplies for Children",
    date: "April 15, 2024",
    text: "Delivered school supplies to 120 children for the new school term.",
  },
];

const upcomingActivities = [
  { day: "25", month: "May 2024", icon: "home", title: "House Building - Gicumbi", text: "We will be building a house for a family of 6.", place: "Gicumbi District", time: "8:00 AM - 5:00 PM" },
  { day: "08", month: "Jun 2024", icon: "groups", title: "Community Food Drive", text: "Food distribution for vulnerable families.", place: "Nyagatare District", time: "9:00 AM - 2:00 PM" },
  { day: "15", month: "Jun 2024", icon: "cleaning_services", title: "Community Clean-Up", text: "Let's clean our community and protect our environment.", place: "Kigali, Kabuga", time: "7:00 AM - 11:00 AM" },
];

const gallery = [completedHome, constructionImage, foodImage, itemsImage, schoolImage];

const Activities = () => {
  return (
    <div className="min-h-screen bg-white text-[#17142F]">
      <TopNav />

      <main className="pt-[78px]">
        <section className="relative overflow-hidden bg-[#14112D] text-white">
          <img src={heroImage} alt="Volunteers building a house" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14112D] via-[#14112D]/86 via-55% to-[#14112D]/12" />
          <div className="container relative z-10 flex min-h-[415px] items-center py-12">
            <div className="max-w-[650px]">
              <p className="text-sm font-bold text-white/85">
                <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
                <span className="mx-2">›</span>
                Activities
              </p>
              <h1 className="mt-8 text-[44px] font-extrabold leading-tight tracking-normal md:text-[58px]">Our Activities</h1>
              <div className="mt-5 h-[3px] w-14 bg-[#C9A84C]" />
              <p className="mt-7 max-w-[560px] text-base font-semibold leading-8 text-white/88">
                We take action every day to bring hope, restore dignity, and build a better future for homeless and vulnerable families.
              </p>
              <Link
                to="/volunteer"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#C9A84C] px-7 py-4 text-sm font-extrabold text-white shadow-md shadow-black/15 transition hover:bg-[#b99737]"
              >
                <span className="material-symbols-outlined text-[18px]">groups</span>
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#17142F]">What We Do</h2>
              <div className="mx-auto mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mx-auto mt-5 max-w-[620px] text-sm font-semibold leading-7 text-[#5D586B]">
                Our activities are designed to meet immediate needs, create lasting solutions, and empower communities to thrive.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {activityTypes.map((item) => (
                <article key={item.title} className="rounded-lg bg-[#FBF8F2] px-5 py-8 text-center shadow-[0_12px_34px_rgba(17,14,47,0.05)]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#C9A84C]">
                    <span className="material-symbols-outlined text-[38px]">{item.icon}</span>
                  </div>
                  <h3 className="mt-6 text-sm font-extrabold text-[#17142F]">{item.title}</h3>
                  <p className="mt-4 text-xs font-semibold leading-6 text-[#5D586B]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAFF] py-12">
          <div className="container grid gap-9 lg:grid-cols-[0.7fr_1.7fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#17142F]">Recent Activities</h2>
              <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mt-5 max-w-[330px] text-sm font-semibold leading-7 text-[#5D586B]">
                Here are some of the activities we have carried out recently in the communities we serve.
              </p>
              <Link
                to="/activities"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#C9A84C] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b99737]"
              >
                View All Activities
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {recentActivities.map((activity) => (
                <article key={activity.title} className="overflow-hidden rounded-lg bg-white shadow-[0_14px_38px_rgba(17,14,47,0.07)]">
                  <img src={activity.image} alt={activity.title} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-base font-extrabold leading-6 text-[#17142F]">{activity.title}</h3>
                    <p className="mt-2 text-xs font-bold text-[#C9A84C]">{activity.date}</p>
                    <p className="mt-4 text-xs font-semibold leading-6 text-[#5D586B]">{activity.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container grid gap-9 lg:grid-cols-[0.7fr_1.7fr]">
            <div>
              <h2 className="text-3xl font-extrabold text-[#17142F]">Upcoming Activities</h2>
              <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mt-5 max-w-[330px] text-sm font-semibold leading-7 text-[#5D586B]">
                Join us in our upcoming events and be part of the change.
              </p>
              <Link
                to="/volunteer"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#C9A84C] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b99737]"
              >
                See All Events
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#EEE9DA] bg-white shadow-[0_12px_34px_rgba(17,14,47,0.05)]">
              {upcomingActivities.map((activity) => (
                <div key={activity.title} className="grid gap-4 border-b border-[#EEE9DA] p-5 last:border-b-0 md:grid-cols-[80px_56px_1fr_210px_110px] md:items-center">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-[#17142F]">{activity.day}</p>
                    <p className="text-[10px] font-bold uppercase text-[#5D586B]">{activity.month}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBF7EA] text-[#C9A84C]">
                    <span className="material-symbols-outlined text-[28px]">{activity.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#17142F]">{activity.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-[#5D586B]">{activity.text}</p>
                  </div>
                  <div className="text-sm font-semibold text-[#5D586B]">
                    <p>{activity.place}</p>
                    <p>{activity.time}</p>
                  </div>
                  <Link to="/volunteer" className="inline-flex justify-center rounded-md border border-[#C9A84C] px-5 py-3 text-sm font-extrabold text-[#C49B2E] hover:bg-[#C9A84C] hover:text-white">
                    Join Us
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FBFAFF] py-12">
          <div className="container grid gap-9 lg:grid-cols-[0.7fr_1.7fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#17142F]">Our Work in Pictures</h2>
              <div className="mt-3 h-[3px] w-12 bg-[#C9A84C]" />
              <p className="mt-5 max-w-[330px] text-sm font-semibold leading-7 text-[#5D586B]">
                A glimpse of the love, hard work, and impact happening on the ground.
              </p>
            </div>

            <div>
              <div className="grid gap-3 md:grid-cols-2">
                <img src={gallery[0]} alt="Completed home activity" className="h-[310px] w-full rounded-lg object-cover md:row-span-2" />
                <div className="grid grid-cols-2 gap-3">
                  {gallery.slice(1).map((image, index) => (
                    <img key={image} src={image} alt={`Activity gallery ${index + 1}`} className="h-[148px] w-full rounded-lg object-cover" />
                  ))}
                </div>
              </div>
              <div className="mt-5 text-center">
                <Link to="/activities" className="inline-flex items-center gap-2 rounded-md border border-[#C9A84C] px-7 py-3 text-sm font-extrabold text-[#C49B2E]">
                  View Full Gallery
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container">
            <div className="rounded-lg bg-[#17142F] px-8 py-8 text-white shadow-[0_16px_44px_rgba(17,14,47,0.14)]">
              <div className="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]">
                  <span className="material-symbols-outlined text-[38px]">volunteer_activism</span>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">Be Part of Our Mission</h2>
                  <p className="mt-2 text-sm font-semibold text-white/75">Your time, skills, or support can transform lives.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-8 py-4 text-sm font-extrabold text-white transition hover:bg-[#b99737]">
                    Donate Now
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </Link>
                  <Link to="/volunteer" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white/10">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
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

export default Activities;
