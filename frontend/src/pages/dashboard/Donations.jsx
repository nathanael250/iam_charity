import { useEffect, useMemo, useState } from "react";
import { donationService } from "../../services/adminServices";

const badgeStyles = {
  completed: "bg-[#E5F6EA] text-[#2E7D42]",
  pending: "bg-[#FFF2D9] text-[#A86D00]",
  failed: "bg-red-50 text-red-600",
  refunded: "bg-[#EEF1F5] text-[#536078]",
};

const typeStyles = {
  money: "bg-[#E5F6EA] text-[#2E7D42]",
  materials: "bg-[#E8F1FF] text-[#2369B4]",
  food: "bg-[#FFF2D9] text-[#A86D00]",
  clothes: "bg-[#F2E9FF] text-[#7653B7]",
  construction: "bg-orange-50 text-orange-700",
};

const formatMoney = (value, currency = "RWF") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDonations = async () => {
    setIsLoading(true);
    try {
      const data = await donationService.list({
        limit: 100,
        donation_type: type,
        payment_status: status,
      });
      setDonations(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return donations.filter((donation) => {
      if (!query) return true;
      return [donation.donor_name, donation.donor_email, donation.project_title, donation.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [donations, search]);

  const stats = useMemo(() => {
    const total = donations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0);
    return [
      { label: "Total Donations", value: donations.length },
      { label: "Total Value", value: formatMoney(total) },
      { label: "Completed", value: donations.filter((donation) => donation.payment_status === "completed").length },
      { label: "Pending", value: donations.filter((donation) => donation.payment_status === "pending").length },
    ];
  }, [donations]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#07142D]">Donations Management</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Track donor activity, payment status, and project support.</p>
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Export Report
        </button>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#D0A733]"
              placeholder="Search by donor or project..."
            />
          </label>
          <select value={type} onChange={(event) => setType(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold">
            <option value="">All Types</option>
            <option value="money">Money</option>
            <option value="materials">Materials</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="construction">Construction</option>
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <button onClick={loadDonations} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">Refresh</button>
        </div>
      </section>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className="rounded-lg border border-[#E2E6EE] bg-white p-5 shadow-sm">
            <p className="text-2xl font-extrabold text-[#07142D]">{item.value}</p>
            <p className="mt-1 text-sm font-semibold text-[#687083]">{item.label}</p>
          </article>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
              <tr>
                {["Donor", "Project", "Type", "Amount", "Date", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-6 py-4 font-extrabold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((donation) => (
                <tr key={donation.id} className="border-b border-[#EEF1F5] last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-[#07142D]">{donation.is_anonymous ? "Anonymous" : donation.donor_name || "Unknown Donor"}</p>
                    <p className="mt-1 text-xs font-semibold text-[#687083]">{donation.donor_email || "No email"}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#536078]">{donation.project_title || "General Donation"}</td>
                  <td className="px-6 py-4">
                    <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", typeStyles[donation.donation_type] || typeStyles.money].join(" ")}>
                      {donation.donation_type || "money"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-[#07142D]">{formatMoney(donation.amount, donation.currency || "RWF")}</td>
                  <td className="px-6 py-4 font-semibold text-[#536078]">{donation.created_at ? new Date(donation.created_at).toLocaleDateString() : "-"}</td>
                  <td className="px-6 py-4">
                    <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", badgeStyles[donation.payment_status] || badgeStyles.pending].join(" ")}>
                      {donation.payment_status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] hover:bg-[#E8F1FF] hover:text-[#2369B4]">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {!filtered.length && !isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center font-semibold text-[#687083]">No donations found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Donations;
