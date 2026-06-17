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

const formatMoney = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDateTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const escapeCsvValue = (value) => {
  const normalized = String(value ?? "");
  return `"${normalized.replaceAll('"', '""')}"`;
};

const DonationDetails = ({ donation, onClose }) => {
  if (!donation) return null;

  const details = [
    ["Donor", donation.is_anonymous ? "Anonymous" : donation.donor_name || "Unknown Donor"],
    ["Email", donation.donor_email || "Not provided"],
    ["Phone", donation.donor_phone || "Not provided"],
    ["Project", donation.project_title || "General Donation"],
    ["Donation type", donation.donation_type || "money"],
    ["Payment method", String(donation.payment_method || "-").replaceAll("_", " ")],
    ["Transaction reference", donation.transaction_reference || "Not provided"],
    ["Submitted", formatDateTime(donation.created_at)],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07142D]/60 p-4" role="dialog" aria-modal="true" aria-labelledby="donation-details-title" onMouseDown={onClose}>
      <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <header className="flex items-start justify-between gap-4 border-b border-[#E7EAF0] px-6 py-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Donation details</p>
            <h2 id="donation-details-title" className="mt-1 text-2xl font-extrabold text-[#07142D]">{formatMoney(donation.amount, donation.currency || "USD")}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close donation details" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078] hover:bg-[#F6F8FB]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        <div className="p-6">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", typeStyles[donation.donation_type] || typeStyles.money].join(" ")}>{donation.donation_type || "money"}</span>
            <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", badgeStyles[donation.payment_status] || badgeStyles.pending].join(" ")}>{donation.payment_status || "pending"}</span>
          </div>

          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">{label}</dt>
                <dd className="mt-1 break-words text-sm font-semibold capitalize text-[#3E495D]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-t border-[#E7EAF0] pt-5">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Donor message</p>
            <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-[#536078]">{donation.message || "No message provided."}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);

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
  }, [type, status]);

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
      { label: "Total Value", value: formatMoney(total, donations[0]?.currency || "USD") },
      { label: "Completed", value: donations.filter((donation) => donation.payment_status === "completed").length },
      { label: "Pending", value: donations.filter((donation) => donation.payment_status === "pending").length },
    ];
  }, [donations]);

  const exportReport = () => {
    if (!filtered.length) {
      setError("There are no donations to export with the current filters.");
      return;
    }

    const headers = [
      "Donor",
      "Email",
      "Phone",
      "Project",
      "Donation Type",
      "Payment Method",
      "Amount",
      "Currency",
      "Status",
      "Transaction Reference",
      "Message",
      "Date",
    ];
    const rows = filtered.map((donation) => [
      donation.is_anonymous ? "Anonymous" : donation.donor_name || "Unknown Donor",
      donation.donor_email || "",
      donation.donor_phone || "",
      donation.project_title || "General Donation",
      donation.donation_type || "money",
      donation.payment_method || "",
      Number(donation.amount || 0).toFixed(2),
      donation.currency || "USD",
      donation.payment_status || "pending",
      donation.transaction_reference || "",
      donation.message || "",
      formatDateTime(donation.created_at),
    ]);
    const csv = [headers, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `donations-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#07142D]">Donations Management</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Track donor activity, payment status, and project support.</p>
        </div>
        <button type="button" onClick={exportReport} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E]">
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
                  <td className="px-6 py-4 font-extrabold text-[#07142D]">{formatMoney(donation.amount, donation.currency || "USD")}</td>
                  <td className="px-6 py-4 font-semibold text-[#536078]">{donation.created_at ? new Date(donation.created_at).toLocaleDateString() : "-"}</td>
                  <td className="px-6 py-4">
                    <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", badgeStyles[donation.payment_status] || badgeStyles.pending].join(" ")}>
                      {donation.payment_status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button type="button" onClick={() => setSelectedDonation(donation)} title="View donation details" aria-label={`View donation from ${donation.donor_name || "anonymous donor"}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] hover:bg-[#E8F1FF] hover:text-[#2369B4]">
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
      <DonationDetails donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
    </div>
  );
};

export default Donations;
