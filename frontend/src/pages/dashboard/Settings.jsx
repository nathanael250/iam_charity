const settings = [
  {
    title: "Organization Profile",
    description: "Manage foundation name, contact email, phone number, and address.",
    icon: "domain",
  },
  {
    title: "Users & Roles",
    description: "Invite administrators and control access to sensitive dashboard actions.",
    icon: "admin_panel_settings",
  },
  {
    title: "Website Preferences",
    description: "Tune public site defaults, donation labels, and project visibility behavior.",
    icon: "tune",
  },
  {
    title: "System Logs",
    description: "Review backend events, imports, exports, and recent administrative activity.",
    icon: "receipt_long",
  },
];

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#07142D]">Settings</h1>
        <p className="mt-2 text-sm font-semibold text-[#687083]">Control dashboard preferences and administration tools.</p>
      </div>

      <section className="grid gap-5 md:grid-cols-2">
        {settings.map((item) => (
          <article key={item.title} className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF2D9] text-[26px] text-[#D0A733]">{item.icon}</span>
              <div>
                <h2 className="text-lg font-extrabold text-[#07142D]">{item.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#687083]">{item.description}</p>
                <button className="mt-4 rounded-lg border border-[#DDE2EA] px-4 py-2 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733]">
                  Open Settings
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[#E2E6EE] bg-[#071B36] p-6 text-white shadow-sm">
        <h2 className="text-xl font-extrabold">Backend Connection</h2>
        <p className="mt-2 text-sm font-semibold text-white/72">
          Admin pages use request-header commands against the Node backend. Keep the backend running on the configured URL before managing live data.
        </p>
      </section>
    </div>
  );
};

export default Settings;
