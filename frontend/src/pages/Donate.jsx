import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { donationService, projectService } from "../services/adminServices";
import { getAssetUrl } from "../services/clientService";

const presetAmounts = [10, 25, 50, 100];

const initialForm = {
  amount: "50",
  donor_name: "",
  donor_email: "",
  donor_phone: "",
  payment_method: "card",
  message: "",
  is_anonymous: false,
  card_number: "",
  expiry: "",
  cvv: "",
  momo_phone: "",
};

const Toast = ({ status, onClose }) => {
  if (!status.message) return null;
  const success = status.type === "success";
  return (
    <div className="fixed right-4 top-24 z-[100] w-[calc(100%-2rem)] max-w-sm sm:right-6" role={success ? "status" : "alert"}>
      <div className={["flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl", success ? "border-green-200" : "border-red-200"].join(" ")}>
        <span className={["material-symbols-outlined text-[22px]", success ? "text-green-600" : "text-red-600"].join(" ")}>{success ? "check_circle" : "error"}</span>
        <p className="min-w-0 flex-1 text-sm font-bold leading-5 text-on-surface">{status.message}</p>
        <button type="button" onClick={onClose} aria-label="Close notification" className="text-outline"><span className="material-symbols-outlined text-[18px]">close</span></button>
      </div>
    </div>
  );
};

const Donate = () => {
  const [searchParams] = useSearchParams();
  const campaignSlug = searchParams.get("campaign");
  const requestedAmount = searchParams.get("amount");
  const [form, setForm] = useState({ ...initialForm, amount: requestedAmount || initialForm.amount });
  const [projects, setProjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    projectService.list({ limit: 100, status: "active" })
      .then((data) => setProjects(data || []))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    if (!status.message) return undefined;
    const timeout = window.setTimeout(() => setStatus({ type: "", message: "" }), 6000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const campaign = useMemo(
    () => projects.find((project) => project.slug === campaignSlug) || null,
    [campaignSlug, projects]
  );

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const validateMockPayment = () => {
    if (Number(form.amount) <= 0) return "Enter a donation amount greater than zero.";
    if (!form.is_anonymous && !form.donor_name.trim()) return "Enter your name or choose anonymous donation.";
    if (form.payment_method === "card") {
      if (form.card_number.replace(/\D/g, "").length !== 16) return "Use a 16-digit mock card number.";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) return "Enter card expiry as MM/YY.";
      if (!/^\d{3,4}$/.test(form.cvv)) return "Enter a valid mock CVV.";
    }
    if (form.payment_method === "momo" && form.momo_phone.replace(/\D/g, "").length < 9) {
      return "Enter a valid Mobile Money phone number.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateMockPayment();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const donation = await donationService.create({
        project_id: campaign?.id || null,
        donor_name: form.is_anonymous ? null : form.donor_name.trim(),
        donor_email: form.donor_email.trim(),
        donor_phone: form.payment_method === "momo" ? form.momo_phone.trim() : form.donor_phone.trim(),
        amount: Number(form.amount),
        payment_method: form.payment_method,
        message: form.message.trim(),
        is_anonymous: form.is_anonymous,
      });
      setReceipt(donation);
      setStatus({ type: "success", message: "Mock payment completed. Your donation is now visible in the dashboard." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "The mock payment could not be completed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <>
        <TopNav />
        <Toast status={status} onClose={() => setStatus({ type: "", message: "" })} />
        <main className="bg-white pt-[78px] text-[#17142F]">
          <section className="relative isolate overflow-hidden bg-[#F8F4ED]">
            <div className="absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-[#C9A84C]/12 blur-3xl" />
            <div className="container flex min-h-[180px] items-center py-7 sm:min-h-[210px] sm:py-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <span className="material-symbols-outlined text-[19px]">check</span>
                  </span>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C49B2E] sm:text-xs">Donation received</p>
                </div>
                <div className="mt-3 h-0.5 w-8 bg-[#C9A84C]" />
                <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">Thank you for choosing to help.</h1>
                <p className="mt-3 max-w-lg text-sm font-semibold leading-6 text-[#4F4B60]">
                  Your mock donation has been recorded and is now visible to the I Am Group administration team.
                </p>
              </div>
            </div>
          </section>

          <section className="py-8 sm:py-12">
            <div className="container grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
              <article className="overflow-hidden rounded-2xl border border-[#E5E3E7] bg-[#14112D] text-white shadow-[0_18px_45px_rgba(20,17,45,0.14)]">
                {campaign?.main_image ? (
                  <div className="relative h-56 sm:h-64">
                    <img src={getAssetUrl(campaign.main_image)} alt={campaign.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14112D] via-[#14112D]/20 to-transparent" />
                  </div>
                ) : (
                  <div className="flex h-44 items-center justify-center bg-[#211D40]">
                    <span className="material-symbols-outlined text-6xl text-[#C9A84C]">volunteer_activism</span>
                  </div>
                )}
                <div className="p-6 sm:p-7">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#C9A84C]">Your support</p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-tight">{receipt.project_title || "General community support"}</h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
                    {campaign?.short_description || "This contribution helps I Am Group respond to urgent needs and provide practical support across Rwanda."}
                  </p>
                  <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C9A84C]">
                    Explore people to support
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </article>

              <article className="rounded-2xl border border-[#E5E3E7] bg-white p-5 shadow-[0_12px_34px_rgba(17,14,47,0.07)] sm:p-8">
                <div className="flex flex-col gap-4 border-b border-[#ECE9EE] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#C49B2E]">Donation receipt</p>
                    <h2 className="mt-2 text-2xl font-extrabold">Payment summary</h2>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-extrabold capitalize text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    {receipt.payment_status}
                  </span>
                </div>

                <div className="divide-y divide-[#ECE9EE]">
                  <div className="flex items-end justify-between gap-5 py-5">
                    <span className="text-sm font-semibold text-[#676374]">Amount donated</span>
                    <strong className="text-3xl font-extrabold text-[#17142F]">${Number(receipt.amount).toFixed(2)}</strong>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-5">
                    <span className="text-sm font-semibold text-[#777386]">Supporting</span>
                    <strong className="text-sm sm:text-right">{receipt.project_title || "General support"}</strong>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-5">
                    <span className="text-sm font-semibold text-[#777386]">Payment method</span>
                    <strong className="text-sm capitalize sm:text-right">{String(receipt.payment_method || "mock payment").replaceAll("_", " ")}</strong>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-5">
                    <span className="text-sm font-semibold text-[#777386]">Reference</span>
                    <strong className="break-all text-sm sm:text-right">{receipt.transaction_reference}</strong>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#E8D8A7] bg-[#FFF9E9] p-4">
                  <span className="material-symbols-outlined text-[21px] text-[#A87800]">science</span>
                  <p className="text-xs font-semibold leading-5 text-[#705B22]">
                    This is a mock payment for testing. No money was charged and no card information was stored.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link to="/" className="inline-flex h-12 items-center justify-center rounded-lg border border-[#DDDDE3] px-5 text-sm font-extrabold text-[#17142F] transition hover:border-[#C9A84C]">Return home</Link>
                  <button type="button" onClick={() => { setReceipt(null); setForm(initialForm); }} className="inline-flex h-12 items-center justify-center rounded-lg bg-[#C9822C] px-5 text-sm font-extrabold text-white transition hover:bg-[#B87425]">Make another donation</button>
                </div>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNav />
      <Toast status={status} onClose={() => setStatus({ type: "", message: "" })} />
      <div className="bg-background text-on-background">
        <main className="pb-20 pt-24">
          <section className="container py-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <Link to={campaign ? `/needs/${campaign.id}` : "/"} className="text-sm font-bold uppercase tracking-[0.14em] text-tertiary">Back</Link>
              <span className="rounded-full bg-[#FFF2D9] px-4 py-2 text-xs font-bold text-[#A86D00]">Mock payment mode</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-surface-container bg-white p-6 shadow-sm sm:p-9">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-tertiary">Donate</p>
                  <h1 className="mt-2 text-3xl font-black text-primary sm:text-4xl">Complete a mock donation</h1>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">Test the complete donation flow. No real payment will be processed.</p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Amount in USD</label>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {presetAmounts.map((amount) => (
                      <button key={amount} type="button" onClick={() => setForm((current) => ({ ...current, amount: String(amount) }))} className={["rounded-lg border px-3 py-3 font-bold", Number(form.amount) === amount ? "border-[#C9A84C] bg-[#C9A84C]/15 text-primary" : "border-surface-container bg-surface-container-low"].join(" ")}>${amount}</button>
                    ))}
                  </div>
                  <input type="number" min="1" step="0.01" name="amount" value={form.amount} onChange={handleChange} className="mt-3 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 outline-none focus:border-tertiary" required />
                </div>

                <label className="flex items-center gap-3 rounded-lg border border-surface-container bg-surface-container-low px-4 py-3 text-sm font-semibold">
                  <input type="checkbox" name="is_anonymous" checked={form.is_anonymous} onChange={handleChange} className="accent-[#C9A84C]" /> Donate anonymously
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Full Name
                    <input type="text" name="donor_name" value={form.donor_name} onChange={handleChange} disabled={form.is_anonymous} placeholder="Your full name" className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none disabled:opacity-50" />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Email
                    <input type="email" name="donor_email" value={form.donor_email} onChange={handleChange} placeholder="your@email.com" className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none" />
                  </label>
                </div>

                <label className="block text-xs font-bold uppercase tracking-[0.18em] text-outline">Phone Number
                  <input type="tel" name="donor_phone" value={form.donor_phone} onChange={handleChange} placeholder="+250 ..." className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none" />
                </label>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Payment Method</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {[["card", "credit_card", "Card"], ["momo", "smartphone", "Mobile Money"], ["bank_transfer", "account_balance", "Bank Transfer"]].map(([value, icon, label]) => (
                      <label key={value} className={["flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-3 text-sm font-bold", form.payment_method === value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-surface-container bg-surface-container-low"].join(" ")}>
                        <input type="radio" name="payment_method" value={value} checked={form.payment_method === value} onChange={handleChange} className="accent-[#C9A84C]" />
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>{label}
                      </label>
                    ))}
                  </div>
                </div>

                {form.payment_method === "card" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="sm:col-span-2 text-xs font-bold uppercase tracking-[0.18em] text-outline">Mock Card Number
                      <input name="card_number" value={form.card_number} onChange={handleChange} inputMode="numeric" placeholder="4242 4242 4242 4242" className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none" required />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Expiry
                      <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="12/30" className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none" required />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-outline">CVV
                      <input name="cvv" value={form.cvv} onChange={handleChange} inputMode="numeric" placeholder="123" className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none" required />
                    </label>
                  </div>
                ) : null}

                {form.payment_method === "momo" ? (
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-outline">Mobile Money Number
                    <input type="tel" name="momo_phone" value={form.momo_phone} onChange={handleChange} placeholder="+250 788 123 456" className="mt-2 h-12 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 text-sm normal-case tracking-normal outline-none" required />
                  </label>
                ) : null}

                {form.payment_method === "bank_transfer" ? (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-800">Mock bank transfer will be confirmed instantly for testing.</div>
                ) : null}

                <label className="block text-xs font-bold uppercase tracking-[0.18em] text-outline">Message (optional)
                  <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="mt-2 w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-3 text-sm normal-case tracking-normal outline-none" />
                </label>

                <button type="submit" disabled={isSubmitting} className="flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#C9822C] px-6 py-4 font-bold text-white disabled:opacity-60">
                  <span className="material-symbols-outlined">lock</span>{isSubmitting ? "Processing mock payment..." : `Donate $${Number(form.amount || 0).toFixed(2)}`}
                </button>
              </form>

              <aside className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-surface-container bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tertiary">Giving For</p>
                  <div className="mt-4 flex items-start gap-4">
                    {campaign?.main_image ? (
                      <img src={getAssetUrl(campaign.main_image)} alt={campaign.title} className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24" />
                    ) : (
                      <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F4EFE4] text-[#C49B2E] sm:h-24 sm:w-24">
                        <span className="material-symbols-outlined text-4xl">volunteer_activism</span>
                      </span>
                    )}
                    <div className="min-w-0">
                      <h2 className="text-lg font-black leading-6 text-primary sm:text-xl">{campaign?.title || "General support"}</h2>
                      <p className="mt-2 line-clamp-3 text-sm font-semibold leading-5 text-on-surface-variant">
                        {campaign?.short_description || "Your donation supports urgent needs and community assistance across Rwanda."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-primary-container p-5 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tertiary-container">Mock Checkout</p>
                      <p className="mt-1 text-xs font-semibold text-white/65">No real money will be charged.</p>
                    </div>
                    <strong className="text-2xl text-tertiary-container">${Number(form.amount || 0).toFixed(2)}</strong>
                  </div>
                  {form.payment_method === "card" ? (
                    <p className="mt-4 border-t border-white/10 pt-4 text-xs font-semibold leading-5 text-white/70">
                      Test card: <strong className="text-white">4242 4242 4242 4242</strong>, expiry <strong className="text-white">12/30</strong>, CVV <strong className="text-white">123</strong>.
                    </p>
                  ) : null}
                </div>
              </aside>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Donate;
