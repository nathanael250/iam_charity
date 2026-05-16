import { useEffect, useMemo, useState } from "react";
import { messageService } from "../../services/adminServices";

const statusStyles = {
  unread: "bg-[#FFF2D9] text-[#A86D00]",
  read: "bg-[#E8F1FF] text-[#2369B4]",
  replied: "bg-[#E5F6EA] text-[#2E7D42]",
  archived: "bg-[#EEF1F5] text-[#536078]",
};

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const data = await messageService.list({ limit: 100, status });
      setMessages(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return messages.filter((message) => {
      if (!query) return true;
      return [message.full_name, message.email, message.subject, message.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [messages, search]);

  const updateStatus = async (message, nextStatus) => {
    try {
      await messageService.updateStatus(message.id, nextStatus);
      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#07142D]">Messages</h1>
        <p className="mt-2 text-sm font-semibold text-[#687083]">Review contact requests and keep communication moving.</p>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages..." className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#D0A733]" />
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold">
            <option value="">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <button onClick={loadMessages} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">Refresh</button>
        </div>
      </section>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <section className="grid gap-4">
        {filtered.map((message) => (
          <article key={message.id} className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-extrabold text-[#07142D]">{message.subject || "Contact message"}</h2>
                  <span className={["rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[message.status] || statusStyles.unread].join(" ")}>
                    {message.status || "unread"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[#687083]">
                  {message.full_name} - {message.email || "No email"} {message.phone ? `- ${message.phone}` : ""}
                </p>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#536078]">{message.message}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => updateStatus(message, "read")} className="h-10 rounded-lg bg-[#071B36] px-4 text-sm font-extrabold text-white">Mark Read</button>
                <button onClick={() => updateStatus(message, "replied")} className="h-10 rounded-lg bg-[#D0A733] px-4 text-sm font-extrabold text-white">Replied</button>
                <button onClick={() => updateStatus(message, "archived")} className="h-10 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D]">Archive</button>
              </div>
            </div>
          </article>
        ))}

        {!filtered.length && !isLoading ? (
          <div className="rounded-xl border border-dashed border-[#DDE2EA] bg-white p-10 text-center font-semibold text-[#687083]">No messages found.</div>
        ) : null}
      </section>
    </div>
  );
};

export default Messages;
