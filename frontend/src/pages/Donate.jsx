import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import helpNeeds from "../data/helpNeeds";

const presetAmounts = ["10,000", "25,000", "50,000", "100,000"];

const Donate = () => {
  const [searchParams] = useSearchParams();
  const campaignSlug = searchParams.get("campaign");
  const amount = searchParams.get("amount");
  const campaign = helpNeeds.find((item) => item.slug === campaignSlug) ?? null;

  return (
    <>
      <TopNav />

      <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
        <main className="pt-24 pb-32 md:pb-24">
          <section className="py-12 md:py-16">
            <div className="container">
              <div className="mb-8 flex items-center justify-between gap-4">
                <Link to={campaign ? `/needs/${campaign.slug}` : "/"} className="text-sm font-semibold uppercase tracking-[0.18em] text-tertiary">
                  {campaign ? "Back to Family" : "Back to Home"}
                </Link>
                <p className="text-sm text-on-surface-variant">Secure donation form</p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[32px] border border-surface-container bg-white p-8 shadow-sm md:p-10">
                  <div className="mb-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-tertiary">Donate</p>
                    <h1 className="text-4xl font-black tracking-tight text-primary md:text-5xl">
                      Complete your donation
                    </h1>
                  </div>

                  <form className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Donation Type</label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="flex items-center gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4">
                          <input type="radio" name="donation-type" defaultChecked className="accent-[#C9A84C]" />
                          <span className="font-semibold text-primary">One-time gift</span>
                        </label>
                        <label className="flex items-center gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4">
                          <input type="radio" name="donation-type" className="accent-[#C9A84C]" />
                          <span className="font-semibold text-primary">Monthly giving</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Choose Amount</label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {presetAmounts.map((item) => {
                          const isSelected = amount === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              className={`rounded-2xl border px-4 py-4 text-center font-bold transition ${
                                isSelected
                                  ? "border-[#C9A84C] bg-[#C9A84C]/15 text-primary"
                                  : "border-surface-container bg-surface-container-low text-primary"
                              }`}
                            >
                              {item} RWF
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="text"
                        defaultValue={amount ? `${amount} RWF` : ""}
                        placeholder="Custom amount in RWF"
                        className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Email Address</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Phone Number</label>
                        <input
                          type="text"
                          placeholder="+250 ..."
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Giving For</label>
                        <input
                          type="text"
                          defaultValue={campaign ? campaign.title : "General support"}
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Payment Method</label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <label className="flex items-center gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4">
                          <input type="radio" name="payment-method" defaultChecked className="accent-[#C9A84C]" />
                          <span className="font-semibold text-primary">Card</span>
                        </label>
                        <label className="flex items-center gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4">
                          <input type="radio" name="payment-method" className="accent-[#C9A84C]" />
                          <span className="font-semibold text-primary">Mobile Money</span>
                        </label>
                        <label className="flex items-center gap-3 rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4">
                          <input type="radio" name="payment-method" className="accent-[#C9A84C]" />
                          <span className="font-semibold text-primary">Bank Transfer</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Card Number</label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-outline">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full rounded-2xl border border-surface-container bg-surface-container-low px-5 py-4 text-on-surface outline-none transition focus:border-tertiary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#C9822C] px-8 py-5 font-bold uppercase tracking-[0.14em] text-white"
                    >
                      Donate Now
                    </button>
                  </form>
                </div>

                <div className="space-y-6">
                  <div className="overflow-hidden rounded-[32px] border border-surface-container bg-white shadow-sm">
                    {campaign ? (
                      <>
                        <div className="relative h-64">
                          <img src={campaign.image} alt={campaign.title} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{campaign.region}</p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight">{campaign.title}</h2>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-sm font-bold uppercase tracking-[0.2em] text-tertiary">Selected Cause</p>
                          <p className="mt-3 text-lg font-semibold text-primary">{campaign.family}</p>
                          <p className="mt-2 leading-7 text-on-surface-variant">{campaign.summary}</p>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 md:p-10">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-tertiary">General Donation</p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight text-primary">Support I Am Group</h2>
                        <p className="mt-4 leading-8 text-on-surface-variant">
                          Your donation supports urgent family needs, community care, education, shelter, and direct
                          assistance for vulnerable people in Rwanda.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-[32px] border border-surface-container bg-primary-container p-8 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-tertiary-container">Donation Summary</p>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-white/70">Giving type</span>
                        <span className="font-semibold">One-time</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-white/70">Cause</span>
                        <span className="max-w-[16rem] text-right font-semibold">{campaign ? campaign.title : "General support"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Suggested amount</span>
                        <span className="text-2xl font-black text-tertiary-container">
                          {amount ? `${amount} RWF` : "50,000 RWF"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Donate;
