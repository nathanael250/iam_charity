import { useEffect, useMemo, useState } from "react";
import { volunteerService } from "../../services/adminServices";

const statusStyles = {
  approved: "bg-[#E5F6EA] text-[#2E7D42]",
  pending: "bg-[#FFF2D9] text-[#A86D00]",
  rejected: "bg-red-50 text-red-600",
};

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVolunteers = async () => {
    setIsLoading(true);
    try {
      const data = await volunteerService.list({ limit: 100, status });
      setVolunteers(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return volunteers.filter((volunteer) => {
      if (!query) return true;
      return [volunteer.full_name, volunteer.email, volunteer.phone, volunteer.skills, volunteer.volunteer_type]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [search, volunteers]);

  const stats = useMemo(
    () => [
      { label: "Approved Volunteers", value: volunteers.filter((volunteer) => volunteer.status === "approved").length },
      { label: "Pending Review", value: volunteers.filter((volunteer) => volunteer.status === "pending").length },
      { label: "Total Applications", value: volunteers.length },
    ],
    [volunteers]
  );

  const updateStatus = async (volunteer, nextStatus) => {
    try {
      await volunteerService.updateStatus(volunteer.id, nextStatus);
      await loadVolunteers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#07142D]">Volunteer Management</h1>
        <p className="mt-2 text-sm font-semibold text-[#687083]">Review volunteer applications, skills, and approval status.</p>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#D0A733]"
              placeholder="Search volunteers..."
            />
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={loadVolunteers} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">Refresh</button>
        </div>
      </section>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="rounded-lg border border-[#E2E6EE] bg-white p-5 shadow-sm">
            <p className="text-2xl font-extrabold text-[#07142D]">{item.value}</p>
            <p className="mt-1 text-sm font-semibold text-[#687083]">{item.label}</p>
          </article>
        ))}
      </div>

      <section className="grid gap-4">
        {filtered.map((volunteer) => (
          <article key={volunteer.id} className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#07142D]">{volunteer.full_name}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#687083]">
                      {volunteer.email || "No email"} - {volunteer.phone || "No phone"}
                    </p>
                  </div>
                  <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[volunteer.status] || statusStyles.pending].join(" ")}>
                    {volunteer.status || "pending"}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm font-semibold text-[#536078] md:grid-cols-2">
                  <p><span className="font-extrabold text-[#07142D]">Type:</span> {volunteer.volunteer_type || "other"}</p>
                  <p><span className="font-extrabold text-[#07142D]">Availability:</span> {volunteer.availability || "Not provided"}</p>
                  <p><span className="font-extrabold text-[#07142D]">Skills:</span> {volunteer.skills || "Not provided"}</p>
                  <p><span className="font-extrabold text-[#07142D]">Submitted:</span> {volunteer.created_at ? new Date(volunteer.created_at).toLocaleDateString() : "-"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#071B36] px-4 text-sm font-extrabold text-white">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  View Details
                </button>
                {volunteer.status === "pending" ? (
                  <>
                    <button onClick={() => updateStatus(volunteer, "approved")} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2E7D42] px-4 text-sm font-extrabold text-white">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(volunteer, "rejected")} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-extrabold text-white">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                      Reject
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        {!filtered.length && !isLoading ? (
          <div className="rounded-xl border border-dashed border-[#DDE2EA] bg-white p-10 text-center font-semibold text-[#687083]">No volunteers found.</div>
        ) : null}
      </section>
    </div>
  );
};

export default Volunteers;
