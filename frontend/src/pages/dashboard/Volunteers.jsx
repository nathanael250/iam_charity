import { Fragment, useEffect, useMemo, useState } from "react";
import { volunteerService } from "../../services/adminServices";
import { getAssetUrl } from "../../services/clientService";

const statusStyles = {
  approved: "bg-[#E5F6EA] text-[#2E7D42]",
  pending: "bg-[#FFF2D9] text-[#A86D00]",
  rejected: "bg-red-50 text-red-600",
  contacted: "bg-blue-50 text-blue-700",
  inactive: "bg-[#EEF1F5] text-[#687083]",
};

const formatVolunteerType = (value) => {
  return String(value || "other").replaceAll("_", " ");
};

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedVolunteerId, setExpandedVolunteerId] = useState(null);

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
  }, [status]);

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
            <option value="contacted">Contacted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="inactive">Inactive</option>
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

      <section className="overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
              <tr>
                <th className="px-5 py-4 font-extrabold">Volunteer</th>
                <th className="px-5 py-4 font-extrabold">Phone</th>
                <th className="px-5 py-4 font-extrabold">Support Type</th>
                <th className="px-5 py-4 font-extrabold">Skills</th>
                <th className="px-5 py-4 font-extrabold">Submitted</th>
                <th className="px-5 py-4 font-extrabold">Status</th>
                <th className="px-5 py-4 text-right font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF1F5]">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-10 text-center font-semibold text-[#687083]">Loading volunteers...</td>
                </tr>
              ) : null}

              {!isLoading && !filtered.length ? (
                <tr>
                  <td colSpan="7" className="px-5 py-10 text-center font-semibold text-[#687083]">No volunteers found.</td>
                </tr>
              ) : null}

              {!isLoading ? filtered.map((volunteer) => (
                <Fragment key={volunteer.id}>
                  <tr className="align-top transition hover:bg-[#FBFCFE]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {volunteer.image_url ? (
                          <img src={getAssetUrl(volunteer.image_url)} alt={volunteer.full_name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        ) : (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF1F5] text-sm font-extrabold text-[#536078]">
                            {volunteer.full_name?.charAt(0)?.toUpperCase() || "V"}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="font-extrabold text-[#07142D]">{volunteer.full_name}</p>
                          <p className="mt-1 max-w-[180px] truncate text-xs font-semibold text-[#687083]">{volunteer.email || "No email"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#536078]">{volunteer.phone || "-"}</td>
                    <td className="px-5 py-4 font-semibold capitalize text-[#536078]">{formatVolunteerType(volunteer.volunteer_type)}</td>
                    <td className="px-5 py-4">
                      <p className="max-w-[220px] line-clamp-2 font-semibold leading-5 text-[#536078]">{volunteer.skills || "Not provided"}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#536078]">
                      {volunteer.created_at ? new Date(volunteer.created_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <span className={["inline-flex rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[volunteer.status] || statusStyles.pending].join(" ")}>
                        {volunteer.status || "pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedVolunteerId((current) => current === volunteer.id ? null : volunteer.id)}
                          title={expandedVolunteerId === volunteer.id ? "Hide details" : "View details"}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#071B36] transition hover:bg-[#F3F6FA]"
                        >
                          <span className="material-symbols-outlined text-[19px]">{expandedVolunteerId === volunteer.id ? "visibility_off" : "visibility"}</span>
                        </button>
                        {volunteer.status === "pending" ? (
                          <>
                            <button
                              type="button"
                              onClick={() => updateStatus(volunteer, "approved")}
                              title="Approve volunteer"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5F6EA] text-[#2E7D42] transition hover:bg-[#D7F0DF]"
                            >
                              <span className="material-symbols-outlined text-[19px]">check</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateStatus(volunteer, "rejected")}
                              title="Reject volunteer"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                            >
                              <span className="material-symbols-outlined text-[19px]">close</span>
                            </button>
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                  {expandedVolunteerId === volunteer.id ? (
                    <tr className="bg-[#FBFCFE]">
                      <td colSpan="7" className="px-5 py-5">
                        <div className="grid gap-5 text-sm md:grid-cols-2 xl:grid-cols-5">
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Photo</p>
                            {volunteer.image_url ? (
                              <img src={getAssetUrl(volunteer.image_url)} alt={volunteer.full_name} className="mt-2 h-24 w-24 rounded-xl object-cover" />
                            ) : (
                              <p className="mt-2 font-semibold text-[#536078]">No photo provided</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Address</p>
                            <p className="mt-2 whitespace-pre-wrap font-semibold text-[#536078]">{volunteer.address || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Availability</p>
                            <p className="mt-2 whitespace-pre-wrap font-semibold leading-6 text-[#536078]">{volunteer.availability || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Contact</p>
                            <p className="mt-2 font-semibold text-[#536078]">{volunteer.email || "No email"}</p>
                            <p className="font-semibold text-[#536078]">{volunteer.phone || "No phone"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Message</p>
                            <p className="mt-2 whitespace-pre-wrap font-semibold leading-6 text-[#536078]">{volunteer.message || "No message provided"}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Volunteers;
