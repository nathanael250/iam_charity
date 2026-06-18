import { useEffect, useMemo, useState } from "react";
import { beneficiaryService, materialUnitService, materialUsedService, projectService } from "../../../services/adminServices";

const materialCategories = ["food", "education", "housing", "health", "clothing", "hygiene", "construction", "other"];

const emptyMaterial = {
  project_id: "",
  beneficiary_id: "",
  material_name: "",
  category: "food",
  quantity: 1,
  unit_id: "",
  unit_cost: 0,
  currency: "USD",
  date_used: new Date().toISOString().slice(0, 10),
  notes: "",
};

const inputClass = "h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]";
const textAreaClass = "min-h-24 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 py-3 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]";

const formatLabel = (value) => String(value || "other").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "-");
const toDateInput = (value) => (value ? String(value).slice(0, 10) : "");
const formatMoney = (value, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0));

const MaterialsUsed = () => {
  const [materials, setMaterials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [materialUnits, setMaterialUnits] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyMaterial);

  const loadMaterials = async () => {
    setIsLoading(true);
    try {
      const [materialData, projectData, beneficiaryData, unitData] = await Promise.all([
        materialUsedService.list({ limit: 100 }),
        projectService.list({ limit: 100 }),
        beneficiaryService.list({ limit: 100 }),
        materialUnitService.list({ limit: 100, is_active: 1 }),
      ]);
      setMaterials(materialData || []);
      setProjects(projectData || []);
      setBeneficiaries(beneficiaryData || []);
      setMaterialUnits(unitData || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const filteredMaterials = useMemo(() => {
    const query = search.trim().toLowerCase();
    return materials.filter((material) => {
      if (!query) return true;
      return [material.material_name, material.category, material.project_title, material.beneficiary_name, material.notes]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [materials, search]);

  const openCreate = () => {
    setError("");
    setForm({ ...emptyMaterial, project_id: projects[0]?.id || "", unit_id: materialUnits[0]?.id || "" });
    setModal({ mode: "create", record: null });
  };

  const openEdit = (record) => {
    setError("");
    setForm({ ...emptyMaterial, ...record, date_used: toDateInput(record.date_used) });
    setModal({ mode: "edit", record });
  };

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const saveMaterial = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        project_id: Number(form.project_id),
        beneficiary_id: form.beneficiary_id ? Number(form.beneficiary_id) : null,
        unit_id: Number(form.unit_id),
        quantity: Number(form.quantity || 0),
        unit_cost: Number(form.unit_cost || 0),
      };
      if (modal?.mode === "edit") await materialUsedService.update(modal.record.id, payload);
      else await materialUsedService.create(payload);
      setModal(null);
      await loadMaterials();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMaterial = async (record) => {
    if (!window.confirm(`Delete "${record.material_name}"?`)) return;
    try {
      await materialUsedService.remove(record.id);
      await loadMaterials();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Resource Management</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#07142D]">Materials Used</h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">Record materials delivered and calculate their cost from quantity and unit price.</p>
        </div>
        <button type="button" onClick={openCreate} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E]">
          <span className="material-symbols-outlined text-[20px]">add_box</span>
          Record Material
        </button>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]" placeholder="Search materials..." />
          </label>
          <button type="button" onClick={loadMaterials} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E]">Refresh</button>
        </div>
      </section>

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      <div className="grid gap-3 md:hidden">
        {isLoading ? <MobileEmptyCard text="Loading materials..." /> : null}
        {!isLoading && !filteredMaterials.length ? <MobileEmptyCard text="No material records found." /> : null}
        {!isLoading ? filteredMaterials.map((material) => (
          <article key={material.id} className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-extrabold text-[#07142D]">{material.material_name}</p>
                <p className="mt-1 text-xs font-semibold text-[#687083]">{formatLabel(material.category)}</p>
              </div>
              <p className="shrink-0 text-sm font-extrabold text-[#07142D]">{formatMoney(material.total_cost, material.currency || "USD")}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Support Case</dt>
                <dd className="mt-1 line-clamp-2 font-semibold text-[#536078]">{material.project_title || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Beneficiary</dt>
                <dd className="mt-1 line-clamp-2 font-semibold text-[#536078]">{material.beneficiary_name || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Quantity</dt>
                <dd className="mt-1 font-semibold text-[#536078]">{Number(material.quantity || 0).toLocaleString()} {material.unit_code || ""}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Date</dt>
                <dd className="mt-1 font-semibold text-[#536078]">{formatDate(material.date_used)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-end border-t border-[#EEF1F5] pt-3">
              <TableActions label={material.material_name} onEdit={() => openEdit(material)} onDelete={() => deleteMaterial(material)} />
            </div>
          </article>
        )) : null}
      </div>

      <section className="hidden overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
              <tr>{["Material", "Support Case", "Beneficiary", "Quantity", "Total", "Date", "Actions"].map((head) => <th key={head} className="px-5 py-4 font-extrabold text-[#687083]">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[#EEF1F5]">
              {isLoading ? <EmptyRow colSpan="7" text="Loading materials..." /> : null}
              {!isLoading && !filteredMaterials.length ? <EmptyRow colSpan="7" text="No material records found." /> : null}
              {!isLoading ? filteredMaterials.map((material) => (
                <tr key={material.id} className="align-top transition hover:bg-[#FBFCFE]">
                  <td className="px-5 py-4"><p className="font-extrabold text-[#07142D]">{material.material_name}</p><p className="mt-1 text-xs font-semibold text-[#687083]">{formatLabel(material.category)}</p></td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{material.project_title || "-"}</td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{material.beneficiary_name || "-"}</td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{Number(material.quantity || 0).toLocaleString()} {material.unit_code || ""}</td>
                  <td className="px-5 py-4 font-extrabold text-[#07142D]">{formatMoney(material.total_cost, material.currency || "USD")}</td>
                  <td className="px-5 py-4 font-semibold text-[#536078]">{formatDate(material.date_used)}</td>
                  <td className="px-5 py-4"><TableActions label={material.material_name} onEdit={() => openEdit(material)} onDelete={() => deleteMaterial(material)} /></td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </div>
      </section>

      {modal ? (
        <Modal eyebrow="Material used" title={`${modal.mode === "edit" ? "Edit" : "Add"} material record`} onClose={() => !isSaving && setModal(null)}>
          <form onSubmit={saveMaterial} className="space-y-6 p-6">
            <MaterialForm form={form} updateForm={updateForm} projects={projects} beneficiaries={beneficiaries} materialUnits={materialUnits} />
            <FormActions isSaving={isSaving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      ) : null}
    </div>
  );
};

const MaterialForm = ({ form, updateForm, projects, beneficiaries, materialUnits }) => (
  <div className="grid gap-5 md:grid-cols-2">
    <Field label="Support Case"><select required value={form.project_id} onChange={(event) => updateForm("project_id", event.target.value)} className={inputClass}><option value="">Select support case</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select></Field>
    <Field label="Beneficiary (optional)"><select value={form.beneficiary_id || ""} onChange={(event) => updateForm("beneficiary_id", event.target.value)} className={inputClass}><option value="">No specific beneficiary</option>{beneficiaries.map((beneficiary) => <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.display_name}</option>)}</select></Field>
    <Field label="Material Name"><input required value={form.material_name} onChange={(event) => updateForm("material_name", event.target.value)} className={inputClass} placeholder="Rice, school books, roofing sheets..." /></Field>
    <Field label="Category"><select value={form.category} onChange={(event) => updateForm("category", event.target.value)} className={inputClass}>{materialCategories.map((category) => <option key={category} value={category}>{formatLabel(category)}</option>)}</select></Field>
    <Field label="Unit"><select required value={form.unit_id} onChange={(event) => updateForm("unit_id", event.target.value)} className={inputClass}><option value="">Select unit</option>{materialUnits.map((unit) => <option key={unit.id} value={unit.id}>{unit.unit_name} ({unit.unit_code})</option>)}</select></Field>
    <Field label="Quantity"><input type="number" min="0" step="0.01" value={form.quantity} onChange={(event) => updateForm("quantity", event.target.value)} className={inputClass} /></Field>
    <Field label="Unit Cost"><input type="number" min="0" step="0.01" value={form.unit_cost} onChange={(event) => updateForm("unit_cost", event.target.value)} className={inputClass} /></Field>
    <Field label="Currency"><input value={form.currency || "USD"} onChange={(event) => updateForm("currency", event.target.value.toUpperCase())} className={inputClass} /></Field>
    <Field label="Date Used"><input required type="date" value={toDateInput(form.date_used)} onChange={(event) => updateForm("date_used", event.target.value)} className={inputClass} /></Field>
    <Field label="Notes" className="md:col-span-2"><textarea value={form.notes || ""} onChange={(event) => updateForm("notes", event.target.value)} className={textAreaClass} placeholder="Delivery notes, receipt details, or field comments" /></Field>
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

export default MaterialsUsed;
