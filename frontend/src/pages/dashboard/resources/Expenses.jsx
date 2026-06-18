import { useEffect, useMemo, useState } from "react";
import { beneficiaryService, expenseCategoryService, expenseService, projectService } from "../../../services/adminServices";

const paymentMethods = ["cash", "mobile_money", "bank_transfer", "card", "other"];

const emptyExpense = {
  project_id: "",
  beneficiary_id: "",
  expense_category_id: "",
  description: "",
  amount: 0,
  currency: "USD",
  expense_date: new Date().toISOString().slice(0, 10),
  paid_to: "",
  payment_method: "cash",
  reference: "",
  notes: "",
};

const inputClass = "h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]";
const textAreaClass = "min-h-24 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 py-3 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]";

const formatLabel = (value) => String(value || "other").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "-");
const toDateInput = (value) => (value ? String(value).slice(0, 10) : "");
const formatMoney = (value, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0));

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyExpense);

  const loadExpenses = async () => {
    setIsLoading(true);
    try {
      const [expenseData, projectData, beneficiaryData, categoryData] = await Promise.all([
        expenseService.list({ limit: 100 }),
        projectService.list({ limit: 100 }),
        beneficiaryService.list({ limit: 100 }),
        expenseCategoryService.list({ limit: 100, is_active: 1 }),
      ]);
      setExpenses(expenseData || []);
      setProjects(projectData || []);
      setBeneficiaries(beneficiaryData || []);
      setExpenseCategories(categoryData || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return expenses.filter((expense) => {
      if (!query) return true;
      return [expense.description, expense.category_name, expense.project_title, expense.beneficiary_name, expense.paid_to, expense.reference]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [expenses, search]);

  const openCreate = () => {
    setError("");
    setForm({ ...emptyExpense, project_id: projects[0]?.id || "", expense_category_id: expenseCategories[0]?.id || "" });
    setModal({ mode: "create", record: null });
  };

  const openEdit = (record) => {
    setError("");
    setForm({ ...emptyExpense, ...record, expense_date: toDateInput(record.expense_date) });
    setModal({ mode: "edit", record });
  };

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const saveExpense = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        project_id: Number(form.project_id),
        beneficiary_id: form.beneficiary_id ? Number(form.beneficiary_id) : null,
        expense_category_id: Number(form.expense_category_id),
        amount: Number(form.amount || 0),
      };
      if (modal?.mode === "edit") await expenseService.update(modal.record.id, payload);
      else await expenseService.create(payload);
      setModal(null);
      await loadExpenses();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteExpense = async (record) => {
    if (!window.confirm(`Delete "${record.description}"?`)) return;
    try {
      await expenseService.remove(record.id);
      await loadExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Resource Management</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#07142D]">Expenses</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Record field expenses like transport, communication, labor, and service fees.</p>
        </div>
        <button type="button" onClick={openCreate} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E]">
          <span className="material-symbols-outlined text-[20px]">add_card</span>
          Record Expense
        </button>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]" placeholder="Search expenses..." />
          </label>
          <button type="button" onClick={loadExpenses} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E]">Refresh</button>
        </div>
      </section>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <div className="grid gap-3 md:hidden">
        {isLoading ? <MobileEmptyCard text="Loading expenses..." /> : null}
        {!isLoading && !filteredExpenses.length ? <MobileEmptyCard text="No expenses found." /> : null}
        {!isLoading ? filteredExpenses.map((expense) => (
          <article key={expense.id} className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="line-clamp-2 text-base font-extrabold text-[#07142D]">{expense.description}</p>
                <p className="mt-1 text-xs font-semibold capitalize text-[#687083]">
                  {formatLabel(expense.payment_method)} {expense.reference ? `- ${expense.reference}` : ""}
                </p>
              </div>
              <p className="shrink-0 text-sm font-extrabold text-[#07142D]">{formatMoney(expense.amount, expense.currency || "USD")}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Support Case</dt>
                <dd className="mt-1 line-clamp-2 font-semibold text-[#536078]">{expense.project_title || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Beneficiary</dt>
                <dd className="mt-1 line-clamp-2 font-semibold text-[#536078]">{expense.beneficiary_name || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Category</dt>
                <dd className="mt-1 font-semibold text-[#536078]">{expense.category_name || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Date</dt>
                <dd className="mt-1 font-semibold text-[#536078]">{formatDate(expense.expense_date)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-end border-t border-[#EEF1F5] pt-3">
              <TableActions label={expense.description} onEdit={() => openEdit(expense)} onDelete={() => deleteExpense(expense)} />
            </div>
          </article>
        )) : null}
      </div>

      <section className="hidden overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
              <tr>{["Expense", "Support Case", "Beneficiary", "Category", "Amount", "Date", "Actions"].map((head) => <th key={head} className="px-5 py-4 font-extrabold text-[#687083]">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[#EEF1F5]">
              {isLoading ? <EmptyRow colSpan="7" text="Loading expenses..." /> : null}
              {!isLoading && !filteredExpenses.length ? <EmptyRow colSpan="7" text="No expenses found." /> : null}
              {!isLoading ? filteredExpenses.map((expense) => (
                <tr key={expense.id} className="align-top transition hover:bg-[#FBFCFE]">
                  <td className="px-5 py-4"><p className="font-extrabold text-[#07142D]">{expense.description}</p><p className="mt-1 text-xs font-semibold capitalize text-[#687083]">{formatLabel(expense.payment_method)} {expense.reference ? `- ${expense.reference}` : ""}</p></td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{expense.project_title || "-"}</td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{expense.beneficiary_name || "-"}</td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{expense.category_name || "-"}</td>
                  <td className="px-5 py-4 font-extrabold text-[#07142D]">{formatMoney(expense.amount, expense.currency || "USD")}</td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{formatDate(expense.expense_date)}</td>
                  <td className="px-5 py-4"><TableActions label={expense.description} onEdit={() => openEdit(expense)} onDelete={() => deleteExpense(expense)} /></td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </div>
      </section>

      {modal ? (
        <Modal eyebrow="Expense" title={`${modal.mode === "edit" ? "Edit" : "Add"} expense record`} onClose={() => !isSaving && setModal(null)}>
          <form onSubmit={saveExpense} className="space-y-6 p-6">
            <ExpenseForm form={form} updateForm={updateForm} projects={projects} beneficiaries={beneficiaries} expenseCategories={expenseCategories} />
            <FormActions isSaving={isSaving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      ) : null}
    </div>
  );
};

const ExpenseForm = ({ form, updateForm, projects, beneficiaries, expenseCategories }) => (
  <div className="grid gap-5 md:grid-cols-2">
    <Field label="Support Case"><select required value={form.project_id} onChange={(event) => updateForm("project_id", event.target.value)} className={inputClass}><option value="">Select support case</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select></Field>
    <Field label="Beneficiary (optional)"><select value={form.beneficiary_id || ""} onChange={(event) => updateForm("beneficiary_id", event.target.value)} className={inputClass}><option value="">No specific beneficiary</option>{beneficiaries.map((beneficiary) => <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.display_name}</option>)}</select></Field>
    <Field label="Category"><select required value={form.expense_category_id} onChange={(event) => updateForm("expense_category_id", event.target.value)} className={inputClass}><option value="">Select category</option>{expenseCategories.map((category) => <option key={category.id} value={category.id}>{category.category_name}</option>)}</select></Field>
    <Field label="Description"><input required value={form.description} onChange={(event) => updateForm("description", event.target.value)} className={inputClass} placeholder="Transport to support field" /></Field>
    <Field label="Amount"><input type="number" min="0" step="0.01" value={form.amount} onChange={(event) => updateForm("amount", event.target.value)} className={inputClass} /></Field>
    <Field label="Currency"><input value={form.currency || "USD"} onChange={(event) => updateForm("currency", event.target.value.toUpperCase())} className={inputClass} /></Field>
    <Field label="Expense Date"><input required type="date" value={toDateInput(form.expense_date)} onChange={(event) => updateForm("expense_date", event.target.value)} className={inputClass} /></Field>
    <Field label="Paid To"><input value={form.paid_to || ""} onChange={(event) => updateForm("paid_to", event.target.value)} className={inputClass} placeholder="Driver, service provider, staff..." /></Field>
    <Field label="Payment Method"><select value={form.payment_method} onChange={(event) => updateForm("payment_method", event.target.value)} className={inputClass}>{paymentMethods.map((method) => <option key={method} value={method}>{formatLabel(method)}</option>)}</select></Field>
    <Field label="Reference" className="md:col-span-2"><input value={form.reference || ""} onChange={(event) => updateForm("reference", event.target.value)} className={inputClass} placeholder="Receipt number or transaction reference" /></Field>
    <Field label="Notes" className="md:col-span-2"><textarea value={form.notes || ""} onChange={(event) => updateForm("notes", event.target.value)} className={textAreaClass} placeholder="Expense notes" /></Field>
  </div>
);

const Field = ({ label, children, className = "" }) => <label className={["block", className].join(" ")}><span className="mb-2 block text-sm font-extrabold text-[#07142D]">{label}</span>{children}</label>;
const EmptyRow = ({ colSpan, text }) => <tr><td colSpan={colSpan} className="px-5 py-10 text-center font-semibold text-[#687083]">{text}</td></tr>;
const MobileEmptyCard = ({ text }) => <div className="rounded-lg border border-dashed border-[#DDE2EA] bg-white p-6 text-center text-sm font-bold text-[#687083]">{text}</div>;

const TableActions = ({ onEdit, onDelete, label }) => (
  <div className="flex justify-end gap-2">
    <button type="button" onClick={onEdit} title={`Edit ${label}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-[#E5F6EA] hover:text-[#2E7D42]"><span className="material-symbols-outlined text-[20px]">edit</span></button>
    <button type="button" onClick={onDelete} title={`Delete ${label}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-red-50 hover:text-red-600"><span className="material-symbols-outlined text-[20px]">delete</span></button>
  </div>
);

const Modal = ({ title, eyebrow, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07142D]/60 p-4" role="dialog" aria-modal="true" onMouseDown={onClose}>
    <section className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
      <header className="flex items-start justify-between gap-4 border-b border-[#E7EAF0] px-6 py-5">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D0A733]">{eyebrow}</p><h2 className="mt-1 text-2xl font-extrabold text-[#07142D]">{title}</h2></div>
        <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078] transition hover:bg-[#F6F8FB]"><span className="material-symbols-outlined text-[20px]">close</span></button>
      </header>
      {children}
    </section>
  </div>
);

const FormActions = ({ isSaving, onCancel }) => (
  <div className="flex justify-end gap-3 border-t border-[#E7EAF0] pt-5">
    <button type="button" onClick={onCancel} className="h-11 rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#536078] transition hover:bg-[#F6F8FB]">Cancel</button>
    <button type="submit" disabled={isSaving} className="h-11 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E] disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Saving..." : "Save Record"}</button>
  </div>
);

export default Expenses;
