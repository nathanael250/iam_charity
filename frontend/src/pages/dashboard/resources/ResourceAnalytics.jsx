import { useEffect, useMemo, useState } from "react";
import { beneficiaryService, expenseService, materialUsedService, resourceSummaryService } from "../../../services/adminServices";

const formatLabel = (value) => String(value || "other").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatMoney = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0));

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "-");

const ResourceAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [reportType, setReportType] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [beneficiaryFilter, setBeneficiaryFilter] = useState("");
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const [summaryData, beneficiaryData, materialData, expenseData] = await Promise.all([
        resourceSummaryService.get(),
        beneficiaryService.list({ limit: 100 }),
        materialUsedService.list({ limit: 100 }),
        expenseService.list({ limit: 100 }),
      ]);
      setSummary(summaryData || {});
      setBeneficiaries(beneficiaryData || []);
      setMaterials(materialData || []);
      setExpenses(expenseData || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const stats = [
    { label: "Materials Cost", value: formatMoney(summary?.materials_cost), icon: "inventory_2" },
    { label: "Expenses", value: formatMoney(summary?.expenses_cost), icon: "receipt_long" },
    { label: "Total Used", value: formatMoney(summary?.total_money_used), icon: "payments" },
    { label: "Beneficiaries", value: Number(summary?.total_beneficiaries || beneficiaries.length).toLocaleString(), icon: "groups" },
  ];

  const supportCases = useMemo(() => {
    const cases = new Map();
    [...materials, ...expenses].forEach((record) => {
      if (record.project_id && record.project_title) cases.set(String(record.project_id), record.project_title);
    });
    return Array.from(cases, ([id, title]) => ({ id, title })).sort((a, b) => a.title.localeCompare(b.title));
  }, [materials, expenses]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesProject = !projectFilter || String(material.project_id) === projectFilter;
      const matchesBeneficiary = !beneficiaryFilter || String(material.beneficiary_id) === beneficiaryFilter;
      return matchesProject && matchesBeneficiary;
    });
  }, [materials, projectFilter, beneficiaryFilter]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesProject = !projectFilter || String(expense.project_id) === projectFilter;
      const matchesBeneficiary = !beneficiaryFilter || String(expense.beneficiary_id) === beneficiaryFilter;
      return matchesProject && matchesBeneficiary;
    });
  }, [expenses, projectFilter, beneficiaryFilter]);

  const generatedRows = useMemo(() => {
    if (reportType === "materials") return filteredMaterials;
    if (reportType === "expenses") return filteredExpenses;
    if (reportType === "beneficiaries") return beneficiaries.filter((beneficiary) => !beneficiaryFilter || String(beneficiary.id) === beneficiaryFilter);
    if (reportType === "all_usage") {
      return [
        ...filteredMaterials.map((material) => ({ ...material, record_type: "Material", record_name: material.material_name, amount: material.total_cost, date: material.date_used })),
        ...filteredExpenses.map((expense) => ({ ...expense, record_type: "Expense", record_name: expense.description, date: expense.expense_date })),
      ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    return [];
  }, [beneficiaries, beneficiaryFilter, filteredExpenses, filteredMaterials, reportType]);

  const selectedTotal = useMemo(() => {
    if (reportType === "materials") return filteredMaterials.reduce((sum, material) => sum + Number(material.total_cost || 0), 0);
    if (reportType === "expenses") return filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    if (reportType === "all_usage") {
      return filteredMaterials.reduce((sum, material) => sum + Number(material.total_cost || 0), 0) + filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    }
    return 0;
  }, [filteredExpenses, filteredMaterials, reportType]);

  const generateReport = () => {
    if (!reportType) {
      setError("Please select what you need to see before generating the report.");
      setGeneratedReport(null);
      return;
    }

    setGeneratedReport({
      reportType,
      rows: generatedRows,
      selectedTotal,
    });
    setError("");
  };

  const clearReport = () => {
    setReportType("");
    setProjectFilter("");
    setBeneficiaryFilter("");
    setGeneratedReport(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Resource Management</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#07142D]">Usage Analytics</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Choose the report you need, then review the generated details below.</p>
        </div>
        <button type="button" onClick={loadAnalytics} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E]">
          Refresh
        </button>
      </div>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      {isLoading ? (
        <section className="rounded-xl border border-[#E2E6EE] bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-[#687083]">Loading resource analytics...</p>
        </section>
      ) : (
        <>
          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F8F2DF] text-[#B98F1E]">
                    <span className="material-symbols-outlined text-[21px]">{item.icon}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xl font-extrabold text-[#07142D]">{item.value}</p>
                    <p className="truncate text-xs font-bold text-[#687083]">{item.label}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_auto_auto] lg:items-end">
              <Field label="What do you need to see?">
                <select value={reportType} onChange={(event) => setReportType(event.target.value)} className={inputClass}>
                  <option value="">Select report</option>
                  <option value="all_usage">All resource usage</option>
                  <option value="materials">Materials used</option>
                  <option value="expenses">Expenses</option>
                  <option value="beneficiaries">Beneficiaries</option>
                </select>
              </Field>
              <Field label="Support Case">
                <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} className={inputClass} disabled={reportType === "beneficiaries"}>
                  <option value="">All support cases</option>
                  {supportCases.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
                </select>
              </Field>
              <Field label="Beneficiary">
                <select value={beneficiaryFilter} onChange={(event) => setBeneficiaryFilter(event.target.value)} className={inputClass}>
                  <option value="">All beneficiaries</option>
                  {beneficiaries.map((beneficiary) => <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.display_name}</option>)}
                </select>
              </Field>
              <button type="button" onClick={generateReport} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E]">
                <span className="material-symbols-outlined text-[20px]">table_view</span>
                Generate
              </button>
              <button type="button" onClick={clearReport} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E]">
                Clear
              </button>
            </div>
          </section>

          {generatedReport ? (
            <GeneratedReport reportType={generatedReport.reportType} rows={generatedReport.rows} selectedTotal={generatedReport.selectedTotal} />
          ) : (
            <section className="rounded-xl border border-dashed border-[#DDE2EA] bg-white p-10 text-center">
              <span className="material-symbols-outlined text-[36px] text-[#B8C0CE]">table_view</span>
              <p className="mt-3 text-sm font-bold text-[#687083]">Select what you need to see, then click Generate to show the details table.</p>
            </section>
          )}
        </>
      )}
    </div>
  );
};

const GeneratedReport = ({ reportType, rows, selectedTotal }) => {
  const isMoneyReport = ["all_usage", "materials", "expenses"].includes(reportType);
  const headers = reportType === "beneficiaries"
    ? ["Beneficiary", "Type", "People", "Status", "Phone", "Location"]
    : ["Type", "Record", "Support Case", "Beneficiary", "Amount", "Date"];

  return (
    <section className="overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#E7EAF0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#07142D]">{formatLabel(reportType)} Details</h2>
          <p className="mt-1 text-xs font-bold text-[#687083]">{rows.length} records generated</p>
        </div>
        {isMoneyReport ? <span className="rounded-full bg-[#F8F2DF] px-4 py-2 text-sm font-extrabold text-[#B98F1E]">Total: {formatMoney(selectedTotal)}</span> : null}
      </div>
      <div className="grid gap-3 p-4 md:hidden">
        {rows.map((row) => reportType === "beneficiaries" ? (
          <article key={row.id} className="rounded-lg border border-[#E2E6EE] bg-[#FBFCFE] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-extrabold text-[#07142D]">{row.display_name}</p>
                <p className="mt-1 text-xs font-semibold text-[#687083]">{formatLabel(row.beneficiary_type)}</p>
              </div>
              <span className="rounded-full bg-[#F3F6FA] px-3 py-1 text-xs font-extrabold text-[#536078]">{formatLabel(row.status)}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">People</dt><dd className="mt-1 font-semibold text-[#536078]">{row.people_count || 1}</dd></div>
              <div><dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Phone</dt><dd className="mt-1 font-semibold text-[#536078]">{row.contact_phone || "-"}</dd></div>
              <div className="col-span-2"><dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Location</dt><dd className="mt-1 font-semibold text-[#536078]">{row.location || "-"}</dd></div>
            </dl>
          </article>
        ) : (
          <article key={`${row.record_type || reportType}-${row.id}`} className="rounded-lg border border-[#E2E6EE] bg-[#FBFCFE] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="rounded-full bg-[#F3F6FA] px-3 py-1 text-xs font-extrabold text-[#536078]">{row.record_type || (reportType === "materials" ? "Material" : "Expense")}</span>
                <p className="mt-3 line-clamp-2 font-extrabold text-[#07142D]">{row.record_name || row.material_name || row.description}</p>
              </div>
              <p className="shrink-0 text-sm font-extrabold text-[#07142D]">{formatMoney(row.amount ?? row.total_cost, row.currency || "USD")}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Support Case</dt><dd className="mt-1 line-clamp-2 font-semibold text-[#536078]">{row.project_title || "-"}</dd></div>
              <div><dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Beneficiary</dt><dd className="mt-1 line-clamp-2 font-semibold text-[#536078]">{row.beneficiary_name || "-"}</dd></div>
              <div className="col-span-2"><dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Date</dt><dd className="mt-1 font-semibold text-[#536078]">{formatDate(row.date || row.date_used || row.expense_date)}</dd></div>
            </dl>
          </article>
        ))}
        {!rows.length ? <div className="rounded-lg border border-dashed border-[#DDE2EA] p-6 text-center text-sm font-bold text-[#687083]">No records match the selected fields.</div> : null}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
            <tr>{headers.map((head) => <th key={head} className="px-5 py-4 font-extrabold">{head}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[#EEF1F5]">
            {rows.map((row) => reportType === "beneficiaries" ? (
              <tr key={row.id}>
                <td className="px-5 py-4 font-extrabold text-[#07142D]">{row.display_name}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{formatLabel(row.beneficiary_type)}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{row.people_count || 1}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{formatLabel(row.status)}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{row.contact_phone || "-"}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{row.location || "-"}</td>
              </tr>
            ) : (
              <tr key={`${row.record_type || reportType}-${row.id}`}>
                <td className="px-5 py-4"><span className="rounded-full bg-[#F3F6FA] px-3 py-1 text-xs font-extrabold text-[#536078]">{row.record_type || (reportType === "materials" ? "Material" : "Expense")}</span></td>
                <td className="px-5 py-4 font-extrabold text-[#07142D]">{row.record_name || row.material_name || row.description}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{row.project_title || "-"}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{row.beneficiary_name || "-"}</td>
                <td className="px-5 py-4 font-extrabold text-[#07142D]">{formatMoney(row.amount ?? row.total_cost, row.currency || "USD")}</td>
                <td className="px-5 py-4 font-semibold text-[#536078]">{formatDate(row.date || row.date_used || row.expense_date)}</td>
              </tr>
            ))}
            {!rows.length ? <EmptyRow colSpan={headers.length} text="No records match the selected fields." /> : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-extrabold text-[#07142D]">{label}</span>
    {children}
  </label>
);

const inputClass = "h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4] disabled:cursor-not-allowed disabled:bg-[#F3F6FA] disabled:text-[#8A93A3]";

const EmptyRow = ({ colSpan, text }) => (
  <tr><td colSpan={colSpan} className="px-5 py-10 text-center font-semibold text-[#687083]">{text}</td></tr>
);

export default ResourceAnalytics;
