import { useEffect, useMemo, useState } from "react";
import { beneficiaryService } from "../../../services/adminServices";
import { useNavigate } from "react-router-dom";

const beneficiaryTypes = ["family", "individual"];
const identifierTypes = [
  "none",
  "national_id",
  "passport",
  "refugee_id",
  "village_id",
  "phone",
  "other",
];
const representativeRoles = [
  "self",
  "family_leader",
  "parent",
  "guardian",
  "other",
];
const contactRelationships = [
  "parent",
  "guardian",
  "spouse",
  "child",
  "sibling",
  "relative",
  "neighbor",
  "friend",
  "local_leader",
  "other",
];
const beneficiaryStatuses = ["active", "completed", "inactive"];

const statusStyles = {
  active: "bg-[#E8F1FF] text-[#2369B4]",
  completed: "bg-[#E5F6EA] text-[#2E7D42]",
  inactive: "bg-[#EEF1F5] text-[#687083]",
};

const emptyBeneficiary = {
  beneficiary_type: "family",
  display_name: "",
  identifier_type: "none",
  identifier_value: "",
  representative_name: "",
  representative_role: "family_leader",
  representative_phone: "",
  contact_name: "",
  contact_relationship: "",
  contact_phone: "",
  location: "",
  people_count: 1,
  status: "active",
  notes: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]";
const textAreaClass =
  "min-h-24 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 py-3 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]";

const formatLabel = (value) =>
  String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyBeneficiary);
  const navigate = useNavigate();

  const loadBeneficiaries = async () => {
    setIsLoading(true);
    try {
      const data = await beneficiaryService.list({ limit: 100 });
      setBeneficiaries(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBeneficiaries();
  }, []);

  const filteredBeneficiaries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return beneficiaries.filter((beneficiary) => {
      const matchesStatus =
        !statusFilter || beneficiary.status === statusFilter;
      const matchesSearch =
        !query ||
        [
          beneficiary.display_name,
          beneficiary.beneficiary_code,
          beneficiary.contact_phone,
          beneficiary.representative_name,
          beneficiary.location,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [beneficiaries, search, statusFilter]);

  const openCreate = () => {
    setError("");
    setForm(emptyBeneficiary);
    setModal({ mode: "create", record: null });
  };

  const openEdit = (record) => {
    setError("");
    setForm({
      ...emptyBeneficiary,
      ...record,
      people_count: record.people_count || 1,
    });
    setModal({ mode: "edit", record });
  };

  const updateForm = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const saveBeneficiary = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        alternate_contact_phone: null,
        people_count: Number(form.people_count || 1),
        representative_role:
          form.beneficiary_type === "family"
            ? form.representative_role
            : "self",
      };
      if (modal?.mode === "edit")
        await beneficiaryService.update(modal.record.id, payload);
      else await beneficiaryService.create(payload);
      setModal(null);
      await loadBeneficiaries();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteBeneficiary = async (record) => {
    if (!window.confirm(`Delete "${record.display_name}"?`)) return;
    try {
      await beneficiaryService.remove(record.id);
      await loadBeneficiaries();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">
            Resource Management
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#07142D]">
            Beneficiaries
          </h1>
          <p className="mt-2 text-sm font-semibold text-[#687083]">
            Record families and individuals helped by the organization.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E]"
        >
          <span className="material-symbols-outlined text-[20px]">
            person_add
          </span>
          Add Beneficiary
        </button>
      </div>

      <section className="rounded-xl border border-[#E2E6EE] bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto] md:items-center">
          <label className="relative w-full">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">
              search
            </span>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#DDE2EA] bg-white pl-10 pr-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
              placeholder="Search beneficiaries..."
            />
          </label>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 w-full rounded-lg border border-[#DDE2EA] bg-white px-4 text-sm font-semibold text-[#07142D] outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
          >
            <option value="">All Status</option>
            {beneficiaryStatuses.map((status) => (
              <option key={status} value={status}>
                {formatLabel(status)}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={loadBeneficiaries}
            className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E]"
          >
            Refresh
          </button>
        </div>
      </section>

      {error ? (
        <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-3 md:hidden">
        {isLoading ? <MobileEmptyCard text="Loading beneficiaries..." /> : null}
        {!isLoading && !filteredBeneficiaries.length ? <MobileEmptyCard text="No beneficiaries found." /> : null}
        {!isLoading
          ? filteredBeneficiaries.map((beneficiary) => (
              <article key={beneficiary.id} className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-extrabold text-[#07142D]">{beneficiary.display_name}</p>
                    <p className="mt-1 text-xs font-semibold text-[#687083]">
                      {beneficiary.beneficiary_code || "No code"} {beneficiary.location ? `- ${beneficiary.location}` : ""}
                    </p>
                  </div>
                  <span className={["shrink-0 rounded-full px-3 py-1 text-xs font-extrabold capitalize", statusStyles[beneficiary.status] || statusStyles.active].join(" ")}>
                    {beneficiary.status || "active"}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Type</dt>
                    <dd className="mt-1 font-semibold text-[#536078]">{formatLabel(beneficiary.beneficiary_type)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">People</dt>
                    <dd className="mt-1 font-extrabold text-[#07142D]">{beneficiary.people_count || 1}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Phone</dt>
                    <dd className="mt-1 font-semibold text-[#536078]">{beneficiary.contact_phone || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Identifier</dt>
                    <dd className="mt-1 truncate font-semibold text-[#536078]">{beneficiary.identifier_value || formatLabel(beneficiary.identifier_type)}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex justify-end border-t border-[#EEF1F5] pt-3">
                  <TableActions
                    label={beneficiary.display_name}
                    onView={() => navigate(`/admin/resources/beneficiaries/${beneficiary.id}`)}
                    onEdit={() => openEdit(beneficiary)}
                    onDelete={() => deleteBeneficiary(beneficiary)}
                  />
                </div>
              </article>
            ))
          : null}
      </div>

      <section className="hidden overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
              <tr>
                {[
                  "Beneficiary",
                  "Type",
                  "Identifier",
                  "Contact",
                  "People",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-5 py-4 font-extrabold text-[#687083]"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF1F5]">
              {isLoading ? (
                <EmptyRow colSpan="7" text="Loading beneficiaries..." />
              ) : null}
              {!isLoading && !filteredBeneficiaries.length ? (
                <EmptyRow colSpan="7" text="No beneficiaries found." />
              ) : null}
              {!isLoading
                ? filteredBeneficiaries.map((beneficiary) => (
                    <tr
                      key={beneficiary.id}
                      className="align-top transition hover:bg-[#FBFCFE]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-extrabold text-[#07142D]">
                          {beneficiary.display_name}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#687083]">
                          {beneficiary.beneficiary_code || "No code"}{" "}
                          {beneficiary.location
                            ? `- ${beneficiary.location}`
                            : ""}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-semibold capitalize text-[#536078]">
                        {formatLabel(beneficiary.beneficiary_type)}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#536078]">
                          {formatLabel(beneficiary.identifier_type)}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#687083]">
                          {beneficiary.identifier_value || "-"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#536078]">
                          {beneficiary.contact_phone}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#687083]">
                          {beneficiary.contact_name ||
                            beneficiary.representative_name ||
                            "No contact name"}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-extrabold text-[#07142D]">
                        {beneficiary.people_count || 1}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={[
                            "inline-flex rounded-full px-3 py-1 text-xs font-extrabold capitalize",
                            statusStyles[beneficiary.status] ||
                              statusStyles.active,
                          ].join(" ")}
                        >
                          {beneficiary.status || "active"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <TableActions
                          label={beneficiary.display_name}
                          onView={() => navigate(`/admin/resources/beneficiaries/${beneficiary.id}`)}
                          onEdit={() => openEdit(beneficiary)}
                          onDelete={() => deleteBeneficiary(beneficiary)}
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </section>

      {modal ? (
        <Modal
          eyebrow="Beneficiary"
          title={`${modal.mode === "edit" ? "Edit" : "Add"} beneficiary`}
          onClose={() => !isSaving && setModal(null)}
        >
          <form onSubmit={saveBeneficiary} className="space-y-6 p-6">
            <BeneficiaryForm form={form} updateForm={updateForm} />
            <FormActions isSaving={isSaving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      ) : null}
    </div>
  );
};

const BeneficiaryForm = ({ form, updateForm }) => (
  <div className="grid gap-5 md:grid-cols-2">
    <Field label="Beneficiary Type">
      <select
        value={form.beneficiary_type}
        onChange={(event) => updateForm("beneficiary_type", event.target.value)}
        className={inputClass}
      >
        {beneficiaryTypes.map((type) => (
          <option key={type} value={type}>
            {formatLabel(type)}
          </option>
        ))}
      </select>
    </Field>
    <Field
      label={
        form.beneficiary_type === "family"
          ? "Family Display Name"
          : "Individual Name"
      }
    >
      <input
        required
        value={form.display_name}
        onChange={(event) => updateForm("display_name", event.target.value)}
        className={inputClass}
        placeholder="Example: Mukamana Family"
      />
    </Field>
    <Field label="Identifier Type">
      <select
        value={form.identifier_type}
        onChange={(event) => updateForm("identifier_type", event.target.value)}
        className={inputClass}
      >
        {identifierTypes.map((type) => (
          <option key={type} value={type}>
            {formatLabel(type)}
          </option>
        ))}
      </select>
    </Field>
    <Field
      label={
        form.beneficiary_type === "family"
          ? "Family Leader Identifier"
          : "Individual Identifier"
      }
    >
      <input
        value={form.identifier_value || ""}
        onChange={(event) => updateForm("identifier_value", event.target.value)}
        className={inputClass}
        placeholder="ID number, phone, or local reference"
      />
    </Field>
    <Field
      label={
        form.beneficiary_type === "family"
          ? "Family Representative"
          : "Contact Person"
      }
    >
      <input
        value={form.representative_name || ""}
        onChange={(event) =>
          updateForm("representative_name", event.target.value)
        }
        className={inputClass}
        placeholder="Full name"
      />
    </Field>
    <Field label="Representative Role">
      <select
        value={form.representative_role}
        onChange={(event) =>
          updateForm("representative_role", event.target.value)
        }
        className={inputClass}
      >
        {representativeRoles.map((role) => (
          <option key={role} value={role}>
            {formatLabel(role)}
          </option>
        ))}
      </select>
    </Field>
    <Field label="Representative Phone">
      <input
        value={form.representative_phone || ""}
        onChange={(event) =>
          updateForm("representative_phone", event.target.value)
        }
        className={inputClass}
        placeholder="+250..."
      />
    </Field>
    <Field label="Phone To Call">
      <input
        required
        value={form.contact_phone || ""}
        onChange={(event) => updateForm("contact_phone", event.target.value)}
        className={inputClass}
        placeholder="+250..."
      />
    </Field>
    <Field label="Contact Name">
      <input
        value={form.contact_name || ""}
        onChange={(event) => updateForm("contact_name", event.target.value)}
        className={inputClass}
        placeholder="Person to call if follow up is needed"
      />
    </Field>
    <Field label="Contact Relationship">
      <select
        value={form.contact_relationship || ""}
        onChange={(event) =>
          updateForm("contact_relationship", event.target.value)
        }
        className={inputClass}
      >
        <option value="">Select relationship</option>
        {contactRelationships.map((relationship) => (
          <option key={relationship} value={relationship}>
            {formatLabel(relationship)}
          </option>
        ))}
      </select>
    </Field>
    <Field label="People Count">
      <input
        type="number"
        min="1"
        value={form.people_count || 1}
        onChange={(event) => updateForm("people_count", event.target.value)}
        className={inputClass}
      />
    </Field>
    <Field label="Location">
      <input
        value={form.location || ""}
        onChange={(event) => updateForm("location", event.target.value)}
        className={inputClass}
        placeholder="District, sector, village"
      />
    </Field>
    <Field label="Status">
      <select
        value={form.status}
        onChange={(event) => updateForm("status", event.target.value)}
        className={inputClass}
      >
        {beneficiaryStatuses.map((status) => (
          <option key={status} value={status}>
            {formatLabel(status)}
          </option>
        ))}
      </select>
    </Field>
    <Field label="Notes" className="md:col-span-2">
      <textarea
        value={form.notes || ""}
        onChange={(event) => updateForm("notes", event.target.value)}
        className={textAreaClass}
        placeholder="Important information about this beneficiary"
      />
    </Field>
  </div>
);

const Field = ({ label, children, className = "" }) => (
  <label className={["block", className].join(" ")}>
    <span className="mb-2 block text-sm font-extrabold text-[#07142D]">
      {label}
    </span>
    {children}
  </label>
);

const MobileEmptyCard = ({ text }) => (
  <div className="rounded-lg border border-dashed border-[#DDE2EA] bg-white p-6 text-center text-sm font-bold text-[#687083]">
    {text}
  </div>
);

const Modal = ({ title, eyebrow, children, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#07142D]/60 p-4"
    role="dialog"
    aria-modal="true"
    onMouseDown={onClose}
  >
    <section
      className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <header className="flex items-start justify-between gap-4 border-b border-[#E7EAF0] px-6 py-5">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D0A733]">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#07142D]">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078] transition hover:bg-[#F6F8FB]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </header>
      {children}
    </section>
  </div>
);

const FormActions = ({ isSaving, onCancel }) => (
  <div className="flex justify-end gap-3 border-t border-[#E7EAF0] pt-5">
    <button
      type="button"
      onClick={onCancel}
      className="h-11 rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#536078] transition hover:bg-[#F6F8FB]"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSaving}
      className="h-11 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B98F1E] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSaving ? "Saving..." : "Save Record"}
    </button>
  </div>
);

const TableActions = ({
  onView,
  onEdit,
  onDelete,
  label,
}) => (
  <div className="flex justify-end gap-2">

    <button
      type="button"
      onClick={onView}
      title={`View ${label}`}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-blue-50 hover:text-blue-600"
    >
      <span className="material-symbols-outlined text-[20px]">
        visibility
      </span>
    </button>

    <button
      type="button"
      onClick={onEdit}
      title={`Edit ${label}`}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-[#E5F6EA] hover:text-[#2E7D42]"
    >
      <span className="material-symbols-outlined text-[20px]">
        edit
      </span>
    </button>

    <button
      type="button"
      onClick={onDelete}
      title={`Delete ${label}`}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#536078] transition hover:bg-red-50 hover:text-red-600"
    >
      <span className="material-symbols-outlined text-[20px]">
        delete
      </span>
    </button>

  </div>
);

const EmptyRow = ({ colSpan, text }) => (
  <tr>
    <td
      colSpan={colSpan}
      className="px-5 py-10 text-center font-semibold text-[#687083]"
    >
      {text}
    </td>
  </tr>
);

export default Beneficiaries;
