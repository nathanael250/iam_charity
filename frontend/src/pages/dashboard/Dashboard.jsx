import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAssetUrl } from "../../services/clientService";
import { dashboardService } from "../../services/dashboardService";

const metricStyles = [
  { icon: "campaign", tint: "from-[#FFF8EC] to-white", iconBg: "bg-[#FFE5B8]", iconText: "text-[#D0A733]" },
  { icon: "task_alt", tint: "from-[#F5FFF1] to-white", iconBg: "bg-[#D8F3D4]", iconText: "text-[#43A047]" },
  { icon: "volunteer_activism", tint: "from-[#F1F8FF] to-white", iconBg: "bg-[#D8EAFF]", iconText: "text-[#2F7DCE]" },
  { icon: "diversity_3", tint: "from-[#FCF5FF] to-white", iconBg: "bg-[#E9D8FF]", iconText: "text-[#7E57C2]" },
];

const statusClasses = {
  completed: "bg-[#DFF5E2] text-[#2E7D32]",
  pending: "bg-[#FFF2D9] text-[#A86D00]",
  failed: "bg-red-50 text-red-600",
  refunded: "bg-[#EEF1F5] text-[#536078]",
};

const formatMoney = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const getTimestamp = (item) => new Date(item.created_at || 0).getTime();

const MetricCard = ({ item }) => (
  <article className={`flex items-center gap-4 rounded-lg border border-[#E2E6EE] bg-gradient-to-br ${item.tint} p-4 shadow-sm sm:block sm:rounded-xl sm:p-6`}>
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg sm:h-14 sm:w-14 sm:rounded-xl ${item.iconBg} ${item.iconText}`}>
      <span className="material-symbols-outlined text-[28px] sm:text-[32px]">{item.icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-2xl font-extrabold leading-none text-[#07142D] sm:mt-5 sm:text-3xl">{item.value}</p>
      <p className="mt-1 text-sm font-extrabold leading-5 text-[#07142D] sm:mt-2 sm:text-base sm:font-bold">{item.label}</p>
      <p className="mt-1 text-xs font-semibold leading-5 text-[#687083] sm:mt-3 sm:text-sm">{item.detail}</p>
    </div>
  </article>
);

const Card = ({ title, action, children }) => (
  <section className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm sm:rounded-xl sm:p-6">
    <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6 sm:gap-4">
      <h2 className="text-lg font-extrabold text-[#07142D] sm:text-xl">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

const EmptyState = ({ icon = "inbox", title, text }) => (
  <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-[#DDE2EA] bg-[#FAFBFC] px-4 py-6 text-center sm:min-h-40 sm:px-5 sm:py-8">
    <span className="material-symbols-outlined text-[30px] text-[#C49B2E] sm:text-[34px]">{icon}</span>
    <p className="mt-3 font-extrabold text-[#07142D]">{title}</p>
    <p className="mt-1 max-w-sm text-sm font-semibold text-[#687083]">{text}</p>
  </div>
);

const StatusOverview = ({ counts, total }) => {
  const rows = [
    { key: "active", label: "Active", value: counts.active, icon: "campaign", className: "border-[#D6E8FF] bg-[#F3F8FF] text-[#2F7DCE]" },
    { key: "completed", label: "Completed", value: counts.completed, icon: "task_alt", className: "border-[#D8F3D4] bg-[#F4FFF1] text-[#43A047]" },
    { key: "draft", label: "Draft", value: counts.draft, icon: "edit_note", className: "border-[#FFE3A5] bg-[#FFF8EC] text-[#C48609]" },
    { key: "paused", label: "Paused", value: counts.paused, icon: "pause_circle", className: "border-[#E1E5EC] bg-[#F7F9FC] text-[#687083]" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between rounded-lg border border-[#E7EAF0] bg-[#F8FAFD] px-3 py-3 sm:px-4">
        <div>
          <p className="text-sm font-extrabold text-[#07142D]">Total support cases</p>
          <p className="mt-1 text-xs font-semibold text-[#687083]">Current publishing and workflow status</p>
        </div>
        <span className="text-2xl font-extrabold text-[#07142D] sm:text-3xl">{total}</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {rows.map((row) => (
          <Link
            key={row.key}
            to={`/admin/projects?status=${row.key}`}
            className={`flex items-center justify-between rounded-lg border px-3 py-3 transition hover:-translate-y-0.5 hover:shadow-sm sm:px-4 sm:py-4 ${row.className}`}
          >
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">{row.icon}</span>
              <span className="text-sm font-extrabold">{row.label}</span>
            </span>
            <span className="text-xl font-extrabold sm:text-2xl">{row.value}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const EngagementBars = ({ items }) => {
  const maximum = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-4 sm:space-y-5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2 font-bold text-[#536078]">
              <span className="material-symbols-outlined text-[20px] text-[#C49B2E]">{item.icon}</span>
              {item.label}
            </span>
            <span className="font-extrabold text-[#07142D]">{item.value}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[#EEF1F5]">
            <div className="h-full rounded-full bg-[#D0A733]" style={{ width: `${(item.value / maximum) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    projects: [],
    donations: [],
    volunteers: [],
    messages: [],
    subscribers: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const overview = await dashboardService.getOverview();
        if (isMounted) {
          setDashboardData(overview);
          setLoadError("");
        }
      } catch (error) {
        if (isMounted) setLoadError(error.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const computed = useMemo(() => {
    const { projects, donations, volunteers, messages, subscribers } = dashboardData;
    const counts = {
      active: projects.filter((project) => project.status === "active").length,
      completed: projects.filter((project) => project.status === "completed").length,
      draft: projects.filter((project) => project.status === "draft").length,
      paused: projects.filter((project) => project.status === "paused").length,
    };
    const completedDonations = donations.filter((donation) => donation.payment_status === "completed");
    const totalDonations = completedDonations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0);
    const approvedVolunteers = volunteers.filter((volunteer) => volunteer.status === "approved").length;

    const activities = [
      ...donations.map((donation) => ({
        id: `donation-${donation.id}`,
        created_at: donation.created_at,
        icon: "favorite",
        bg: "bg-[#E7F7E8]",
        color: "text-[#43A047]",
        title: `${formatMoney(donation.amount, donation.currency || "USD")} donation received`,
        text: donation.project_title || "General support",
      })),
      ...volunteers.map((volunteer) => ({
        id: `volunteer-${volunteer.id}`,
        created_at: volunteer.created_at,
        icon: "person_add",
        bg: "bg-[#EAF3FF]",
        color: "text-[#2F7DCE]",
        title: "Volunteer registration",
        text: volunteer.full_name || "New volunteer",
      })),
      ...messages.map((message) => ({
        id: `message-${message.id}`,
        created_at: message.created_at,
        icon: "mail",
        bg: "bg-[#FFF2D9]",
        color: "text-[#D0A733]",
        title: "Contact message received",
        text: message.subject || `Message from ${message.full_name}`,
      })),
      ...subscribers.map((subscriber) => ({
        id: `subscriber-${subscriber.id}`,
        created_at: subscriber.created_at,
        icon: "mark_email_read",
        bg: "bg-[#F2E8FF]",
        color: "text-[#7E57C2]",
        title: "Newsletter subscription",
        text: subscriber.email,
      })),
    ]
      .sort((a, b) => getTimestamp(b) - getTimestamp(a))
      .slice(0, 5);

    return {
      metrics: [
        { ...metricStyles[0], value: String(counts.active), label: "Active needs", detail: `${projects.length} total support cases` },
        { ...metricStyles[1], value: String(counts.completed), label: "Completed support", detail: "Cases marked as completed" },
        { ...metricStyles[2], value: formatMoney(totalDonations, completedDonations[0]?.currency || "USD"), label: "Donations received", detail: `${completedDonations.length} completed donations` },
        { ...metricStyles[3], value: String(volunteers.length), label: "Volunteer requests", detail: `${approvedVolunteers} approved` },
      ],
      counts,
      donations: donations.slice(0, 5),
      activities,
      topProjects: projects
        .slice()
        .sort((a, b) => Number(b.progress || 0) - Number(a.progress || 0))
        .slice(0, 4),
      engagement: [
        { icon: "favorite", label: "Donations", value: donations.length },
        { icon: "diversity_3", label: "Volunteer requests", value: volunteers.length },
        { icon: "mail", label: "Contact messages", value: messages.length },
        { icon: "mark_email_read", label: "Newsletter subscribers", value: subscribers.length },
      ],
    };
  }, [dashboardData]);

  return (
    <div className="pb-28 sm:pb-0">
      {loadError ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          The dashboard could not connect to the backend. No sample data is being shown. {loadError}
        </div>
      ) : null}
      {isLoading ? (
        <div className="mb-6 rounded-lg border border-[#DDE2EA] bg-white px-5 py-4 text-sm font-bold text-[#536078]">
          Loading dashboard data...
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {computed.metrics.map((metric) => <MetricCard key={metric.label} item={metric} />)}
      </div>

      <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">
        <Card
          title="Support Case Status"
          action={<Link to="/admin/projects" className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#E7EAF0] px-3 text-xs font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#C48609] sm:text-sm">Manage<span className="hidden sm:inline"> cases</span><span className="material-symbols-outlined text-[17px]">arrow_forward</span></Link>}
        >
          <StatusOverview counts={computed.counts} total={dashboardData.projects.length} />
        </Card>
        <Card title="Community Engagement">
          <EngagementBars items={computed.engagement} />
        </Card>
      </div>

      <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card
          title="Recent Donations"
          action={<Link to="/admin/donations" className="text-sm font-extrabold text-[#C48609]">View all</Link>}
        >
          {computed.donations.length ? (
            <>
            <div className="space-y-3 sm:hidden">
              {computed.donations.map((donation) => (
                <article key={donation.id} className="rounded-lg border border-[#EEF1F5] bg-[#FBFCFE] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-extrabold text-[#07142D]">
                        {donation.is_anonymous ? "Anonymous" : donation.donor_name || "Anonymous"}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#687083]">{formatDate(donation.created_at)}</p>
                    </div>
                    <p className="shrink-0 text-sm font-extrabold text-[#07142D]">
                      {formatMoney(donation.amount, donation.currency || "USD")}
                    </p>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <p className="line-clamp-2 min-w-0 text-sm font-semibold leading-5 text-[#536078]">
                      {donation.project_title || "General support"}
                    </p>
                    <span className={`shrink-0 rounded-md px-3 py-1 text-xs font-extrabold capitalize ${statusClasses[donation.payment_status] || statusClasses.pending}`}>
                      {donation.payment_status || "pending"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E7EAF0] text-[#07142D]">
                    {['Donor', 'Amount', 'Support case', 'Date', 'Status'].map((head) => (
                      <th key={head} className="py-3 pr-4 font-extrabold">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {computed.donations.map((donation) => (
                    <tr key={donation.id} className="border-b border-[#EEF1F5] last:border-0">
                      <td className="py-4 pr-4 font-semibold text-[#536078]">{donation.is_anonymous ? "Anonymous" : donation.donor_name || "Anonymous"}</td>
                      <td className="py-4 pr-4 font-semibold text-[#536078]">{formatMoney(donation.amount, donation.currency || "USD")}</td>
                      <td className="py-4 pr-4 font-semibold text-[#536078]">{donation.project_title || "General support"}</td>
                      <td className="py-4 pr-4 font-semibold text-[#536078]">{formatDate(donation.created_at)}</td>
                      <td className="py-4">
                        <span className={`rounded-md px-3 py-1 text-xs font-extrabold capitalize ${statusClasses[donation.payment_status] || statusClasses.pending}`}>
                          {donation.payment_status || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          ) : (
            <EmptyState icon="volunteer_activism" title="No donations yet" text="Completed and pending donations will appear here." />
          )}
        </Card>

        <Card title="Recent Activity">
          {computed.activities.length ? (
            <div className="space-y-3 sm:space-y-4">
              {computed.activities.map((activity) => (
                <div key={activity.id} className="grid grid-cols-[40px_1fr] gap-3 border-b border-[#EEF1F5] pb-3 last:border-0 last:pb-0 sm:grid-cols-[44px_1fr] sm:gap-4 sm:pb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11 ${activity.bg} ${activity.color}`}>
                    <span className="material-symbols-outlined text-[22px] sm:text-[23px]">{activity.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-[#07142D]">{activity.title}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-[#536078]">{activity.text}</p>
                    <p className="mt-1 text-xs font-semibold text-[#8A92A1]">{formatDate(activity.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No activity yet" text="New donations, volunteers, messages, and subscribers will appear here." />
          )}
        </Card>
      </div>

      <div className="mt-5 sm:mt-6">
        <Card
          title="Support Cases by Progress"
          action={<Link to="/admin/projects" className="text-sm font-extrabold text-[#C48609]">View all</Link>}
        >
          {computed.topProjects.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {computed.topProjects.map((project) => (
                <Link key={project.id} to={`/admin/projects/${project.id}`} className="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-lg border border-[#EEF1F5] p-3 transition hover:border-[#D0A733] sm:grid-cols-[72px_1fr_auto] sm:gap-4">
                  {project.main_image ? (
                    <img src={getAssetUrl(project.main_image)} alt="" className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-[72px]" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#FFF8EC] text-[#C49B2E] sm:h-16 sm:w-[72px]">
                      <span className="material-symbols-outlined text-[24px] sm:text-[28px]">campaign</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-extrabold text-[#07142D]">{project.title}</p>
                    <div className="mt-2 h-2 rounded-full bg-[#E5E8EE]">
                      <div className="h-2 rounded-full bg-[#D0A733]" style={{ width: `${Math.min(Number(project.progress || 0), 100)}%` }} />
                    </div>
                    <p className="mt-2 truncate text-xs font-semibold text-[#536078]">
                      {formatMoney(project.raised_amount)} of {formatMoney(project.target_amount)}
                    </p>
                  </div>
                  <p className="text-sm font-extrabold text-[#07142D] sm:text-base">{Number(project.progress || 0)}%</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState icon="campaign" title="No support cases yet" text="Create the first case to publish a person or family who needs support." />
          )}
        </Card>
      </div>

      <p className="py-8 text-center text-sm font-semibold text-[#7A8190]">I AM Charity Rwanda administration dashboard</p>
    </div>
  );
};

export default Dashboard;
