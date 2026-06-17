import { useEffect, useMemo, useState } from "react";
import { donationService, projectService, volunteerService } from "../../services/adminServices";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const Reports = () => {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [projectData, donationData, volunteerData] = await Promise.all([
          projectService.list({ limit: 100 }),
          donationService.list({ limit: 100 }),
          volunteerService.list({ limit: 100 }),
        ]);

        setProjects(projectData || []);
        setDonations(donationData || []);
        setVolunteers(volunteerData || []);
        setError("");
      } catch (err) {
        setError(err.message);
      }
    };

    load();
  }, []);

  const totalDonations = donations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0);
  const completedProjects = projects.filter((project) => project.status === "completed").length;
  const activeVolunteers = volunteers.filter((volunteer) => volunteer.status === "approved").length;

  const projectStatus = useMemo(() => {
    const statuses = ["active", "completed", "paused", "draft"];
    return statuses.map((status) => {
      const count = projects.filter((project) => project.status === status).length;
      return {
        status,
        count,
        percent: projects.length ? Math.round((count / projects.length) * 100) : 0,
      };
    });
  }, [projects]);

  const donationTypes = useMemo(() => {
    const types = ["money", "materials", "food", "clothes", "construction"];
    return types.map((type) => {
      const typeDonations = donations.filter((donation) => donation.donation_type === type);
      return {
        type,
        count: typeDonations.length,
        total: typeDonations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0),
      };
    });
  }, [donations]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#07142D]">Reports & Analytics</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Track donation performance, project movement, and volunteer reach.</p>
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Download Report
        </button>
      </div>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Donations Received", value: formatMoney(totalDonations), icon: "payments" },
          { label: "Total Projects", value: projects.length, icon: "inventory_2" },
          { label: "Completed Projects", value: completedProjects, icon: "task_alt" },
          { label: "Active Volunteers", value: activeVolunteers, icon: "groups" },
        ].map((metric) => (
          <article key={metric.label} className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-extrabold text-[#07142D]">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-[#687083]">{metric.label}</p>
              </div>
              <span className="material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF2D9] text-[26px] text-[#D0A733]">{metric.icon}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#07142D]">Projects by Status</h2>
          <div className="mt-6 space-y-5">
            {projectStatus.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span className="capitalize text-[#536078]">{item.status}</span>
                  <span className="text-[#07142D]">{item.count} ({item.percent}%)</span>
                </div>
                <div className="h-3 rounded-full bg-[#E5E8EE]">
                  <div className="h-3 rounded-full bg-[#D0A733]" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#07142D]">Donation Types Breakdown</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {donationTypes.map((item) => (
              <article key={item.type} className="rounded-lg bg-[#F8FAFD] p-4">
                <p className="text-lg font-extrabold capitalize text-[#07142D]">{item.type}</p>
                <p className="mt-1 text-sm font-semibold text-[#687083]">{item.count} donations</p>
                <p className="mt-3 text-sm font-extrabold text-[#D0A733]">{formatMoney(item.total)}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reports;
