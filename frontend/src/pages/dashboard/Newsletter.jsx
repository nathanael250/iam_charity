import { useEffect, useMemo, useState } from "react";
import { newsletterService } from "../../services/adminServices";

const statusStyles = {
  active: "bg-[#E5F6EA] text-[#2E7D42]",
  unsubscribed: "bg-[#EEF1F5] text-[#536078]",
};

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSubscribers = async () => {
    setIsLoading(true);
    try {
      const data = await newsletterService.list({ limit: 100, status });
      setSubscribers(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subscribers.filter((subscriber) => !query || String(subscriber.email || "").toLowerCase().includes(query));
  }, [search, subscribers]);

  const addSubscriber = async (event) => {
    event.preventDefault();
    try {
      await newsletterService.create({ email, status: "active" });
      setEmail("");
      await loadSubscribers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateStatus = async (subscriber, nextStatus) => {
    try {
      await newsletterService.updateStatus(subscriber.id, nextStatus);
      await loadSubscribers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#07142D]">Newsletter</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Manage supporter emails and subscription status.</p>
        </div>
        <form onSubmit={addSubscriber} className="flex flex-col gap-3 sm:flex-row">
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Email address" className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none focus:border-[#D0A733]" />
          <button className="h-11 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white">Add Subscriber</button>
        </form>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search subscribers..." className="h-11 flex-1 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none focus:border-[#D0A733]" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
          <button onClick={loadSubscribers} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">Refresh</button>
        </div>
      </section>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <section className="overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
            <tr>
              <th className="px-6 py-4 font-extrabold">Email</th>
              <th className="px-6 py-4 font-extrabold">Status</th>
              <th className="px-6 py-4 font-extrabold">Joined</th>
              <th className="px-6 py-4 font-extrabold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-[#EEF1F5] last:border-0">
                <td className="px-6 py-4 font-extrabold text-[#07142D]">{subscriber.email}</td>
                <td className="px-6 py-4">
                  <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[subscriber.status] || statusStyles.active].join(" ")}>
                    {subscriber.status || "active"}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-[#687083]">{subscriber.created_at ? new Date(subscriber.created_at).toLocaleDateString() : "-"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => updateStatus(subscriber, subscriber.status === "active" ? "unsubscribed" : "active")}
                    className="rounded-lg border border-[#DDE2EA] px-3 py-2 text-xs font-extrabold text-[#07142D]"
                  >
                    {subscriber.status === "active" ? "Unsubscribe" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && !isLoading ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center font-semibold text-[#687083]">No subscribers found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Newsletter;
