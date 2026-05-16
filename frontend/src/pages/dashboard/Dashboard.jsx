import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "../../services/dashboardService";
import projectOne from "../../assets/imact stories/before.png";
import projectTwo from "../../assets/family_images/c_img3.png";
import projectThree from "../../assets/family_images/c_img2.png";
import projectFour from "../../assets/family_images/c_img5.png";

const fallbackMetrics = [
  { icon: "home", value: "28", label: "Active Projects", trend: "12% this month", tint: "from-[#FFF8EC] to-white", iconBg: "bg-[#FFE5B8]", iconText: "text-[#D0A733]" },
  { icon: "groups", value: "1,245", label: "Families Helped", trend: "18% this month", tint: "from-[#F5FFF1] to-white", iconBg: "bg-[#D8F3D4]", iconText: "text-[#43A047]" },
  { icon: "volunteer_activism", value: "$58,450", label: "Total Donations", trend: "25% this month", tint: "from-[#F1F8FF] to-white", iconBg: "bg-[#D8EAFF]", iconText: "text-[#2F7DCE]" },
  { icon: "diversity_3", value: "342", label: "Volunteers", trend: "15% this month", tint: "from-[#FCF5FF] to-white", iconBg: "bg-[#E9D8FF]", iconText: "text-[#7E57C2]" },
];

const fallbackDonations = [
  ["Sarah Johnson", "$500", "Build Home for Families", "May 31, 2024"],
  ["Michael Brown", "$250", "School Supplies Program", "May 31, 2024"],
  ["Anonymous", "$100", "Emergency Relief", "May 30, 2024"],
  ["David Wilson", "$750", "Community Health Center", "May 29, 2024"],
  ["Emma Davis", "$300", "Clean Water Initiative", "May 29, 2024"],
];

const fallbackActivities = [
  { icon: "favorite", bg: "bg-[#E7F7E8]", color: "text-[#43A047]", title: "New donation of $500", text: "for Build Home for Families", time: "2 minutes ago" },
  { icon: "person_add", bg: "bg-[#EAF3FF]", color: "text-[#2F7DCE]", title: "New volunteer registered", text: "John Doe joined as a volunteer", time: "1 hour ago" },
  { icon: "inventory_2", bg: "bg-[#FFF2D9]", color: "text-[#D0A733]", title: 'Project "School Supplies Program" updated', text: "Budget has been updated", time: "3 hours ago" },
  { icon: "article", bg: "bg-[#F2E8FF]", color: "text-[#7E57C2]", title: "New impact story added", text: '"A Brighter Future for Amina"', time: "5 hours ago" },
  { icon: "check_circle", bg: "bg-[#E7F7E8]", color: "text-[#43A047]", title: 'Project "Community Health Center" completed', text: "Congratulations!", time: "1 day ago" },
];

const fallbackTopProjects = [
  { image: projectOne, title: "Build Home for Families", detail: "$18,750 raised of $25,000", progress: 75 },
  { image: projectTwo, title: "School Supplies Program", detail: "$6,400 raised of $10,000", progress: 64 },
  { image: projectThree, title: "Community Health Center", detail: "$4,800 raised of $8,750", progress: 55 },
  { image: projectFour, title: "Clean Water Initiative", detail: "$2,100 raised of $5,000", progress: 40 },
];

const fallbackProjectStatus = [
  ["Completed", "8 (28.6%)", "bg-[#4CAF60]"],
  ["In Progress", "14 (50.0%)", "bg-[#4A90E2]"],
  ["Planned", "4 (14.3%)", "bg-[#F5B739]"],
  ["On Hold", "2 (7.1%)", "bg-[#C9CDD4]"],
];

const projectImages = [projectOne, projectTwo, projectThree, projectFour];

const beneficiaryData = [
  ["Jan", 450, 780],
  ["Feb", 520, 860],
  ["Mar", 610, 920],
  ["Apr", 540, 810],
  ["May", 680, 950],
  ["Jun", 720, 1020],
];

const MetricCard = ({ item }) => (
  <article className={`rounded-xl border border-[#E2E6EE] bg-gradient-to-br ${item.tint} p-6 shadow-sm`}>
    <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${item.iconBg} ${item.iconText}`}>
      <span className="material-symbols-outlined text-[38px]">{item.icon}</span>
    </div>
    <p className="mt-6 text-3xl font-extrabold text-[#07142D]">{item.value}</p>
    <p className="mt-2 text-lg font-bold text-[#07142D]">{item.label}</p>
    <p className="mt-4 flex items-center gap-1 text-sm font-bold text-[#24A148]">
      <span className="material-symbols-outlined text-[18px]">north</span>
      {item.trend}
    </p>
  </article>
);

const Card = ({ title, action, children }) => (
  <section className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-xl font-extrabold text-[#07142D]">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

const DonationChart = () => (
  <div>
    <svg viewBox="0 0 620 260" className="h-[260px] w-full">
      {[0, 1, 2, 3].map((line) => (
        <line key={line} x1="50" x2="600" y1={45 + line * 52} y2={45 + line * 52} stroke="#ECEFF5" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((line) => (
        <line key={line} x1={80 + line * 100} x2={80 + line * 100} y1="35" y2="205" stroke="#F2E6C8" strokeDasharray="3 4" />
      ))}
      <text x="12" y="202" fontSize="12" fill="#536078">$0</text>
      <text x="8" y="150" fontSize="12" fill="#536078">$10k</text>
      <text x="8" y="98" fontSize="12" fill="#536078">$30k</text>
      <text x="8" y="46" fontSize="12" fill="#536078">$40k</text>
      <polyline points="55,198 105,184 155,160 205,158 255,130 305,132 355,110 405,105 455,78 505,72 555,52 600,36" fill="none" stroke="#D0A733" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="55,200 105,192 155,178 205,178 255,168 305,170 355,166 405,164 455,140 505,118 555,95 600,75" fill="none" stroke="#C8CFDA" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
      <circle cx="600" cy="36" r="5" fill="#D0A733" />
      <foreignObject x="520" y="22" width="78" height="52">
        <div className="rounded-lg border border-[#F2D99A] bg-white p-2 text-xs shadow-md">
          <p className="text-[#7A8190]">May 31</p>
          <p className="font-extrabold text-[#07142D]">$58,450</p>
        </div>
      </foreignObject>
      {["May 1", "May 8", "May 15", "May 22", "May 29"].map((label, index) => (
        <text key={label} x={55 + index * 125} y="238" fontSize="12" fill="#536078">{label}</text>
      ))}
    </svg>
    <div className="mt-1 flex gap-8 text-sm font-semibold text-[#536078]">
      <span className="flex items-center gap-2"><i className="h-[2px] w-8 bg-[#D0A733]" />This Month</span>
      <span className="flex items-center gap-2"><i className="h-[2px] w-8 border-t-2 border-dashed border-[#C8CFDA]" />Last Month</span>
    </div>
  </div>
);

const formatMoney = (amount, currency = "RWF") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const percent = (part, total) => {
  if (!total) {
    return "0.0";
  }

  return ((part / total) * 100).toFixed(1);
};

const StatusDonut = ({ projectStatus, totalProjects }) => (
  <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
    <div className="relative mx-auto aspect-square h-[220px] w-[220px] max-w-[220px] shrink-0 rounded-full bg-[conic-gradient(#4CAF60_0_28.6%,#4A90E2_28.6%_78.6%,#F5B739_78.6%_92.9%,#D8DDE5_92.9%_100%)]">
      <div className="absolute inset-12 rounded-full bg-white" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-extrabold text-[#07142D]">{totalProjects}</p>
        <p className="text-sm font-semibold text-[#7A8190]">Total Projects</p>
      </div>
    </div>
    <div className="space-y-5">
      {projectStatus.map(([label, value, dot]) => (
        <div key={label} className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-3 font-semibold text-[#536078]"><i className={`h-3 w-3 rounded-full ${dot}`} />{label}</span>
          <span className="font-extrabold text-[#07142D]">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const BeneficiaryBars = () => (
  <div>
    <div className="mb-6 flex gap-5 text-sm font-semibold">
      <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-[#D0A733]" />Families</span>
      <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-[#071B36]" />Individuals</span>
    </div>
    <div className="flex h-[240px] items-end justify-between gap-4 border-b border-l border-[#E7EAF0] px-3 pb-6">
      {beneficiaryData.map(([month, families, individuals]) => (
        <div key={month} className="flex flex-1 flex-col items-center">
          <div className="mb-2 flex h-[180px] items-end gap-2">
            <div className="relative w-5 rounded-t bg-[#D0A733]" style={{ height: `${families / 6}px` }}>
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#536078]">{families}</span>
            </div>
            <div className="relative w-5 rounded-t bg-[#071B36]" style={{ height: `${individuals / 6}px` }}>
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#536078]">{individuals.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs font-semibold text-[#536078]">{month}</p>
        </div>
      ))}
    </div>
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm font-semibold text-[#536078]">More families and individuals reached this month.</p>
      <span className="rounded-lg bg-[#DFF5E2] px-4 py-2 text-sm font-extrabold text-[#24A148]">+ 18%</span>
    </div>
  </div>
);

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
        if (isMounted) {
          setLoadError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const computed = useMemo(() => {
    const { projects, donations, volunteers, messages, subscribers } = dashboardData;
    const hasBackendData = projects.length || donations.length || volunteers.length || messages.length || subscribers.length;

    if (!hasBackendData) {
      return {
        metrics: fallbackMetrics,
        donations: fallbackDonations,
        activities: fallbackActivities,
        topProjects: fallbackTopProjects,
        projectStatus: fallbackProjectStatus,
        totalProjects: 28,
      };
    }

    const activeProjects = projects.filter((project) => project.status === "active").length;
    const completedProjects = projects.filter((project) => project.status === "completed").length;
    const plannedProjects = projects.filter((project) => project.status === "draft").length;
    const pausedProjects = projects.filter((project) => project.status === "paused").length;
    const totalProjects = projects.length;
    const completedDonations = donations.filter((donation) => donation.payment_status === "completed");
    const totalDonations = completedDonations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0);

    return {
      metrics: [
        { ...fallbackMetrics[0], value: String(activeProjects), trend: `${totalProjects} total projects` },
        { ...fallbackMetrics[1], value: String(projects.length), label: "Families Helped", trend: "Based on project records" },
        { ...fallbackMetrics[2], value: formatMoney(totalDonations, completedDonations[0]?.currency || "RWF"), trend: `${completedDonations.length} completed gifts` },
        { ...fallbackMetrics[3], value: String(volunteers.length), trend: `${volunteers.filter((volunteer) => volunteer.status === "approved").length} approved` },
      ],
      donations: donations.slice(0, 5).map((donation) => [
        donation.is_anonymous ? "Anonymous" : donation.donor_name || "Anonymous",
        formatMoney(donation.amount, donation.currency || "RWF"),
        donation.project_title || "General Fund",
        formatDate(donation.created_at),
        donation.payment_status || "pending",
      ]),
      activities: [
        ...donations.slice(0, 2).map((donation) => ({
          icon: "favorite",
          bg: "bg-[#E7F7E8]",
          color: "text-[#43A047]",
          title: `New donation of ${formatMoney(donation.amount, donation.currency || "RWF")}`,
          text: `for ${donation.project_title || "General Fund"}`,
          time: formatDate(donation.created_at),
        })),
        ...volunteers.slice(0, 2).map((volunteer) => ({
          icon: "person_add",
          bg: "bg-[#EAF3FF]",
          color: "text-[#2F7DCE]",
          title: "New volunteer registered",
          text: `${volunteer.full_name} submitted a volunteer request`,
          time: formatDate(volunteer.created_at),
        })),
        ...messages.slice(0, 1).map((message) => ({
          icon: "mail",
          bg: "bg-[#FFF2D9]",
          color: "text-[#D0A733]",
          title: "New contact message",
          text: message.subject || `Message from ${message.full_name}`,
          time: formatDate(message.created_at),
        })),
      ].slice(0, 5),
      topProjects: projects
        .slice()
        .sort((a, b) => Number(b.progress || 0) - Number(a.progress || 0))
        .slice(0, 4)
        .map((project, index) => ({
          image: projectImages[index % projectImages.length],
          title: project.title,
          detail: `${formatMoney(project.raised_amount || 0, "RWF")} raised of ${formatMoney(project.target_amount || 0, "RWF")}`,
          progress: Number(project.progress || 0),
        })),
      projectStatus: [
        ["Completed", `${completedProjects} (${percent(completedProjects, totalProjects)}%)`, "bg-[#4CAF60]"],
        ["In Progress", `${activeProjects} (${percent(activeProjects, totalProjects)}%)`, "bg-[#4A90E2]"],
        ["Planned", `${plannedProjects} (${percent(plannedProjects, totalProjects)}%)`, "bg-[#F5B739]"],
        ["On Hold", `${pausedProjects} (${percent(pausedProjects, totalProjects)}%)`, "bg-[#C9CDD4]"],
      ],
      totalProjects,
    };
  }, [dashboardData]);

  return (
    <>
          {loadError ? (
            <div className="mb-6 rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
              Backend data is unavailable, showing fallback dashboard data. {loadError}
            </div>
          ) : null}
          {isLoading ? (
            <div className="mb-6 rounded-lg border border-[#DDE2EA] bg-white px-5 py-4 text-sm font-bold text-[#536078]">
              Loading dashboard data...
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {computed.metrics.map((metric) => <MetricCard key={metric.label} item={metric} />)}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.95fr]">
            <Card
              title="Donation Overview"
              action={<button className="rounded-lg border border-[#DDE2EA] px-4 py-2 text-sm font-bold">This Month <span className="material-symbols-outlined align-middle text-[18px]">expand_more</span></button>}
            >
              <DonationChart />
            </Card>
            <Card title="Project Status">
              <StatusDonut projectStatus={computed.projectStatus} totalProjects={computed.totalProjects} />
              <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C48609]">
                View All Projects
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.95fr]">
            <Card title="Recent Donations" action={<a href="#" className="text-sm font-extrabold text-[#C48609]">View All <span className="material-symbols-outlined align-middle text-[18px]">arrow_forward</span></a>}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="text-[#07142D]">
                    <tr className="border-b border-[#E7EAF0]">
                      {["Donor Name", "Amount", "Project", "Date", "Status"].map((head) => (
                        <th key={head} className="py-3 font-extrabold">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {computed.donations.map(([name, amount, project, date, status]) => (
                      <tr key={`${name}-${date}`} className="border-b border-[#EEF1F5] last:border-0">
                        <td className="py-4 font-semibold text-[#536078]">{name}</td>
                        <td className="py-4 font-semibold text-[#536078]">{amount}</td>
                        <td className="py-4 font-semibold text-[#536078]">{project}</td>
                        <td className="py-4 font-semibold text-[#536078]">{date}</td>
                        <td className="py-4"><span className="rounded-md bg-[#DFF5E2] px-3 py-1 text-xs font-extrabold text-[#2E7D32]">{status || "Completed"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Recent Activities" action={<a href="#" className="text-sm font-extrabold text-[#C48609]">View All <span className="material-symbols-outlined align-middle text-[18px]">arrow_forward</span></a>}>
              <div className="space-y-4">
                {computed.activities.map((activity) => (
                  <div key={activity.title} className="grid grid-cols-[44px_1fr_auto] gap-4 border-b border-[#EEF1F5] pb-4 last:border-0 last:pb-0">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${activity.bg} ${activity.color}`}>
                      <span className="material-symbols-outlined text-[24px]">{activity.icon}</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#07142D]">{activity.title}</p>
                      <p className="mt-1 text-sm font-semibold text-[#536078]">{activity.text}</p>
                    </div>
                    <p className="whitespace-nowrap text-sm font-semibold text-[#536078]">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.95fr]">
            <Card title="Top Projects by Progress" action={<Link to="/projects" className="text-sm font-extrabold text-[#C48609]">View All <span className="material-symbols-outlined align-middle text-[18px]">arrow_forward</span></Link>}>
              <div className="space-y-5">
                {computed.topProjects.map((project) => (
                  <div key={project.title} className="grid grid-cols-[90px_1fr_auto] items-center gap-5">
                    <img src={project.image} alt={project.title} className="h-16 w-20 rounded-lg object-cover" />
                    <div>
                      <p className="font-extrabold">{project.title}</p>
                      <div className="mt-3 h-2 rounded-full bg-[#E5E8EE]">
                        <div className="h-2 rounded-full bg-[#D0A733]" style={{ width: `${project.progress}%` }} />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#536078]">{project.detail}</p>
                    </div>
                    <p className="font-extrabold">{project.progress}%</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Beneficiaries Overview" action={<a href="#" className="text-sm font-extrabold text-[#C48609]">View Report <span className="material-symbols-outlined align-middle text-[18px]">arrow_forward</span></a>}>
              <BeneficiaryBars />
            </Card>
          </div>

          <p className="py-10 text-center text-sm font-semibold text-[#7A8190]">(c) 2024 Hope & Homes Foundation. All rights reserved.</p>
    </>
  );
};

export default Dashboard;
