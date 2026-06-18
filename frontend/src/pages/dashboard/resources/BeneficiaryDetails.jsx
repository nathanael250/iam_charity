import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { beneficiaryService } from "../../../services/adminServices";

const statusStyles = {
  active: "bg-[#E8F1FF] text-[#2369B4]",
  completed: "bg-[#E5F6EA] text-[#2E7D42]",
  inactive: "bg-[#EEF1F5] text-[#687083]",
};

const formatLabel = (value) =>
  String(value || "-")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const BeneficiaryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [beneficiary, setBeneficiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBeneficiary();
  }, [id]);

  const loadBeneficiary = async () => {
    setLoading(true);
    try {
      const data = await beneficiaryService.get(id);
      setBeneficiary(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <section className="rounded-xl border border-[#E2E6EE] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold text-[#687083]">Loading beneficiary...</p>
      </section>
    );

  if (error)
    return (
      <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">
        {error}
      </div>
    );

  if (!beneficiary)
    return (
      <section className="rounded-xl border border-[#E2E6EE] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold text-[#687083]">Beneficiary not found.</p>
      </section>
    );

  const summary = [
    { label: "Type", value: formatLabel(beneficiary.beneficiary_type), icon: beneficiary.beneficiary_type === "individual" ? "person" : "family_restroom" },
    { label: "People", value: beneficiary.people_count || 1, icon: "groups" },
    { label: "Status", value: formatLabel(beneficiary.status), icon: "verified" },
    { label: "Phone", value: beneficiary.contact_phone || "-", icon: "call" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Beneficiary Details</p>
          <div className="mt-3 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F8F2DF] text-[#B98F1E]">
              <span className="material-symbols-outlined text-[30px]">{beneficiary.beneficiary_type === "individual" ? "person" : "family_restroom"}</span>
            </span>
            <div className="min-w-0">
              <h1 className="break-words text-3xl font-extrabold text-[#07142D]">{beneficiary.display_name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#F3F6FA] px-3 py-1 text-xs font-extrabold text-[#536078]">{beneficiary.beneficiary_code || "No code"}</span>
                <span className={["rounded-full px-3 py-1 text-xs font-extrabold", statusStyles[beneficiary.status] || statusStyles.active].join(" ")}>{formatLabel(beneficiary.status)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#DDE2EA] px-4 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] hover:text-[#B98F1E]"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back
        </button>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <article key={item.label} className="rounded-lg border border-[#E2E6EE] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F8F2DF] text-[#B98F1E]">
                <span className="material-symbols-outlined text-[21px]">{item.icon}</span>
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-extrabold text-[#07142D]">{item.value}</p>
                <p className="truncate text-xs font-bold text-[#687083]">{item.label}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <InfoCard
          title="Basic Information"
          icon="info"
          items={[
            ["Type", formatLabel(beneficiary.beneficiary_type)],
            ["Status", formatLabel(beneficiary.status)],
            ["People Count", beneficiary.people_count],
            ["Location", beneficiary.location],
          ]}
        />

        <InfoCard
          title="Identifier"
          icon="badge"
          items={[
            ["Identifier Type", formatLabel(beneficiary.identifier_type)],
            ["Identifier Value", beneficiary.identifier_value],
          ]}
        />

        <InfoCard
          title="Representative"
          icon="supervisor_account"
          items={[
            ["Name", beneficiary.representative_name],
            ["Role", formatLabel(beneficiary.representative_role)],
            ["Phone", beneficiary.representative_phone],
          ]}
        />

        <InfoCard
          title="Contact"
          icon="contact_phone"
          items={[
            ["Name", beneficiary.contact_name],
            ["Relationship", formatLabel(beneficiary.contact_relationship)],
            ["Phone", beneficiary.contact_phone],
          ]}
        />
      </div>

      {beneficiary.notes && (
        <div className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F8F2DF] text-[#B98F1E]">
              <span className="material-symbols-outlined text-[21px]">notes</span>
            </span>
            <h3 className="text-lg font-extrabold text-[#07142D]">Notes</h3>
          </div>
          <p className="whitespace-pre-wrap text-sm font-semibold leading-6 text-[#687083]">{beneficiary.notes}</p>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ title, icon, items }) => (
  <div className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F8F2DF] text-[#B98F1E]">
        <span className="material-symbols-outlined text-[21px]">{icon}</span>
      </span>
      <h3 className="text-lg font-extrabold text-[#07142D]">{title}</h3>
    </div>

    <div className="divide-y divide-[#EEF1F5]">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-2 py-3 sm:grid-cols-[180px_1fr] sm:items-center"
        >
          <span className="text-sm font-extrabold text-[#687083]">
            {label}
          </span>

          <span className="break-words text-sm font-extrabold text-[#07142D] sm:text-right">
            {value || "-"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default BeneficiaryDetails;
