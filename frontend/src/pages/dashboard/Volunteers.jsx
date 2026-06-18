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
    <div className="space-y-5 pb-28 sm:space-y-6 sm:pb-0">
      <div>
        <h1 className="text-[2rem] font-extrabold leading-tight text-[#07142D] sm:text-3xl">Volunteer Management</h1>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#687083]">Review volunteer applications, skills, and approval status.</p>
      </div>

      <section className="rounded-lg border border-[#E2E6EE] bg-white p-3 shadow-sm sm:rounded-xl sm:p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto] md:items-center">
          <label className="relative flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#D0A733]"
              placeholder="Search volunteers..."
            />
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold">
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((item, index) => (
          <article key={item.label} className={["rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm sm:p-5", index === 2 ? "col-span-2 sm:col-span-1" : ""].join(" ")}>
            <p className="text-2xl font-extrabold leading-none text-[#07142D]">{item.value}</p>
            <p className="mt-2 text-sm font-semibold text-[#687083] sm:mt-1">{item.label}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-3 md:hidden">
        {isLoading ? <MobileEmptyCard text="Loading volunteers..." /> : null}
        {!isLoading && !filtered.length ? <MobileEmptyCard text="No volunteers found." /> : null}
        {!isLoading ? filtered.map((volunteer) => {
          const isExpanded = expandedVolunteerId === volunteer.id;

          return (
            <article key={volunteer.id} className="max-w-full overflow-hidden rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm">
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                {volunteer.image_url ? (
                  <img src={getAssetUrl(volunteer.image_url)} alt={volunteer.full_name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF1F5] text-sm font-extrabold text-[#536078]">
                    {volunteer.full_name?.charAt(0)?.toUpperCase() || "V"}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-base font-extrabold leading-6 text-[#07142D]">{volunteer.full_name}</p>
                      <p className="mt-1 truncate text-xs font-semibold text-[#687083]">{volunteer.email || "No email"}</p>
                    </div>
                    <span className={["max-w-[96px] shrink-0 truncate rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[volunteer.status] || statusStyles.pending].join(" ")}>
                      {volunteer.status || "pending"}
                    </span>
                  </div>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Phone</dt>
                  <dd className="mt-1 break-words font-semibold text-[#536078]">{volunteer.phone || "-"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Support Type</dt>
                  <dd className="mt-1 line-clamp-2 capitalize font-semibold text-[#536078]">{formatVolunteerType(volunteer.volunteer_type)}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Skills</dt>
                  <dd className="mt-1 line-clamp-2 font-semibold leading-5 text-[#536078]">{volunteer.skills || "Not provided"}</dd>
                </div>
              </dl>

              {isExpanded ? (
                <div className="mt-4 space-y-3 rounded-lg bg-[#FBFCFE] p-3 text-sm">
                  <Detail label="Address" value={volunteer.address || "Not provided"} />
                  <Detail label="Availability" value={volunteer.availability || "Not provided"} />
                  <Detail label="Message" value={volunteer.message || "No message provided"} />
                  <Detail label="Submitted" value={volunteer.created_at ? new Date(volunteer.created_at).toLocaleDateString() : "-"} />
                </div>
              ) : null}

              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 border-t border-[#EEF1F5] pt-3">
                <button
                  type="button"
                  onClick={() => setExpandedVolunteerId((current) => current === volunteer.id ? null : volunteer.id)}
                  title={isExpanded ? "Hide details" : "View details"}
                  className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#DDE2EA] px-3 text-sm font-extrabold text-[#071B36] transition hover:bg-[#F3F6FA]"
                >
                  <span className="material-symbols-outlined text-[19px]">{isExpanded ? "visibility_off" : "visibility"}</span>
                  <span className="truncate">{isExpanded ? "Hide Details" : "View Details"}</span>
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
            </article>
          );
        }) : null}
      </div>

      <section className="hidden overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm md:block">
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

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">{label}</p>
    <p className="mt-1 whitespace-pre-wrap font-semibold leading-5 text-[#536078]">{value}</p>
  </div>
);

const MobileEmptyCard = ({ text }) => (
  <div className="rounded-lg border border-dashed border-[#DDE2EA] bg-white p-6 text-center text-sm font-bold text-[#687083]">
    {text}
  </div>
);

export default Volunteers;
