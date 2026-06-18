import { useEffect, useState } from "react";
import { settingsService } from "../../services/adminServices";
import { authService } from "../../services/authService";

const notificationOptions = [
  {
    key: "donations",
    title: "Donation received",
    description: "Notify the team when someone submits a donation.",
    icon: "volunteer_activism",
  },
  {
    key: "volunteer_applications",
    title: "Volunteer application",
    description: "Notify the team when a new volunteer applies.",
    icon: "groups",
  },
  {
    key: "contact_messages",
    title: "Contact message",
    description: "Notify the team when someone sends a website message.",
    icon: "mail",
  },
  {
    key: "newsletter_signups",
    title: "Newsletter signup",
    description: "Notify the team when someone joins the mailing list.",
    icon: "mark_email_read",
  },
];

const initialNotifications = {
  recipient_email: "",
  triggers: {
    donations: true,
    volunteer_applications: false,
    contact_messages: false,
    newsletter_signups: false,
  },
};

const Toast = ({ toast, onClose }) => {
  if (!toast?.message) return null;

  return (
    <div className="fixed inset-x-4 top-4 z-[80] rounded-lg border border-emerald-200 bg-white p-3 shadow-2xl sm:left-auto sm:right-5 sm:w-[380px] sm:p-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[20px] text-emerald-600 sm:h-9 sm:w-9 sm:text-[21px]">
          check_circle
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-[#07142D]">Saved</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-[#687083]">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#687083] transition hover:bg-[#F3F5F8] hover:text-[#07142D]"
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined text-[19px]">close</span>
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const [profile, setProfile] = useState({ full_name: "", email: "" });
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [toast, setToast] = useState({ message: "" });
  const [error, setError] = useState("");

  const showToast = (message) => {
    setError("");
    setToast({ message });
  };

  const showError = (message) => {
    setToast({ message: "" });
    setError(message);
  };

  useEffect(() => {
    if (!toast.message) return undefined;
    const timeoutId = window.setTimeout(() => setToast({ message: "" }), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast.message]);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      setLoading(true);
      try {
        const [adminProfile, notificationSettings] = await Promise.all([
          settingsService.getProfile(),
          settingsService.getNotifications(),
        ]);

        if (!isMounted) return;

        setProfile({
          full_name: adminProfile?.full_name || "",
          email: adminProfile?.email || "",
        });
        setNotifications({
          ...initialNotifications,
          ...(notificationSettings || {}),
          triggers: {
            ...initialNotifications.triggers,
            ...(notificationSettings?.triggers || {}),
          },
        });
      } catch (loadError) {
        if (isMounted) showError(loadError.message || "Could not load settings.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      const updatedProfile = await settingsService.updateProfile(profile);
      authService.updateSessionUser({
        id: updatedProfile.id,
        name: updatedProfile.full_name,
        email: updatedProfile.email,
        role: updatedProfile.role,
      });
      setProfile({
        full_name: updatedProfile.full_name || "",
        email: updatedProfile.email || "",
      });
      showToast("Admin credentials updated.");
    } catch (saveError) {
      showError(saveError.message || "Could not update admin credentials.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      showError("New password and confirmation do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await settingsService.updatePassword({
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
      showToast("Password changed.");
    } catch (saveError) {
      showError(saveError.message || "Could not change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleNotificationsSubmit = async (event) => {
    event.preventDefault();
    setSavingNotifications(true);
    try {
      const updatedNotifications = await settingsService.updateNotifications(notifications);
      setNotifications({
        ...initialNotifications,
        ...updatedNotifications,
        triggers: {
          ...initialNotifications.triggers,
          ...(updatedNotifications?.triggers || {}),
        },
      });
      showToast("Notification settings saved.");
    } catch (saveError) {
      showError(saveError.message || "Could not save notification settings.");
    } finally {
      setSavingNotifications(false);
    }
  };

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      triggers: {
        ...current.triggers,
        [key]: !current.triggers[key],
      },
    }));
  };

  return (
    <div className="space-y-5 pb-28 sm:space-y-6 sm:pb-0">
      <Toast toast={toast} onClose={() => setToast({ message: "" })} />

      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#C79A21] sm:text-xs sm:tracking-[0.28em]">Administration</p>
          <h1 className="mt-2 text-[2rem] font-extrabold leading-tight text-[#07142D] sm:text-3xl">Site Settings</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#687083]">
            Manage admin credentials and choose which website actions send notifications.
          </p>
        </div>
        <div className="flex min-h-12 w-full items-center gap-2 rounded-lg border border-[#DDE2EA] bg-white px-4 py-3 text-sm font-extrabold text-[#07142D] shadow-sm sm:w-auto">
          <span className="material-symbols-outlined text-[20px] text-[#D0A733]">admin_panel_settings</span>
          Admin controls
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-extrabold text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <section className="rounded-lg border border-[#E2E6EE] bg-white p-6 text-center text-sm font-extrabold text-[#687083] shadow-sm sm:p-8">
          Loading settings...
        </section>
      ) : (
        <div className="grid gap-5 sm:gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-lg border border-[#E2E6EE] bg-white shadow-sm">
            <div className="border-b border-[#E6EAF1] px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-start gap-3 sm:items-center">
                <span className="material-symbols-outlined flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF2D9] text-[22px] text-[#D0A733] sm:h-11 sm:w-11 sm:text-[24px]">
                  badge
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-extrabold leading-tight text-[#07142D] sm:text-xl">Admin Credentials</h2>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#687083]">Update the account name, email, and password.</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-[#07142D]">Admin Name</label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(event) => setProfile((current) => ({ ...current, full_name: event.target.value }))}
                    className="h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-bold text-[#07142D] outline-none transition focus:border-[#D0A733] sm:h-12"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-[#07142D]">Login Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                    className="h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-bold text-[#07142D] outline-none transition focus:border-[#D0A733] sm:h-12"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B78F2B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[19px]">save</span>
                  {savingProfile ? "Saving..." : "Save Credentials"}
                </button>
              </form>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 border-t border-[#E6EAF1] pt-6">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-[#07142D]">Current Password</label>
                  <input
                    type="password"
                    value={passwords.current_password}
                    onChange={(event) => setPasswords((current) => ({ ...current, current_password: event.target.value }))}
                    className="h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-bold text-[#07142D] outline-none transition focus:border-[#D0A733] sm:h-12"
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-[#07142D]">New Password</label>
                    <input
                      type="password"
                      value={passwords.new_password}
                      onChange={(event) => setPasswords((current) => ({ ...current, new_password: event.target.value }))}
                      className="h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-bold text-[#07142D] outline-none transition focus:border-[#D0A733] sm:h-12"
                      minLength={8}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-[#07142D]">Confirm Password</label>
                    <input
                      type="password"
                      value={passwords.confirm_password}
                      onChange={(event) => setPasswords((current) => ({ ...current, confirm_password: event.target.value }))}
                      className="h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-bold text-[#07142D] outline-none transition focus:border-[#D0A733] sm:h-12"
                      minLength={8}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#07142D] transition hover:border-[#D0A733] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[19px]">lock_reset</span>
                  {savingPassword ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </section>

          <section className="rounded-lg border border-[#E2E6EE] bg-white shadow-sm">
            <form onSubmit={handleNotificationsSubmit}>
              <div className="border-b border-[#E6EAF1] px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-start gap-3 sm:items-center">
                  <span className="material-symbols-outlined flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF2D9] text-[22px] text-[#D0A733] sm:h-11 sm:w-11 sm:text-[24px]">
                    notifications_active
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-extrabold leading-tight text-[#07142D] sm:text-xl">Notification Rules</h2>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#687083]">Choose when the admin team should receive an email.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-[#07142D]">Notification Email</label>
                  <input
                    type="email"
                    value={notifications.recipient_email}
                    onChange={(event) => setNotifications((current) => ({ ...current, recipient_email: event.target.value }))}
                    placeholder="admin@example.com"
                    className="h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-bold text-[#07142D] outline-none transition focus:border-[#D0A733] sm:h-12"
                    required
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {notificationOptions.map((option) => {
                    const checked = Boolean(notifications.triggers[option.key]);

                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => toggleNotification(option.key)}
                        className={[
                          "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition sm:gap-4 sm:p-4",
                          checked ? "border-[#D0A733] bg-[#FFF9EA]" : "border-[#E2E6EE] bg-white hover:border-[#C9D1DF]",
                        ].join(" ")}
                      >
                        <span className={[
                          "material-symbols-outlined flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[21px] sm:h-10 sm:w-10 sm:text-[22px]",
                          checked ? "bg-[#D0A733] text-white" : "bg-[#F3F5F8] text-[#687083]",
                        ].join(" ")}>
                          {option.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-extrabold text-[#07142D]">{option.title}</span>
                          <span className="mt-1 block text-xs font-semibold leading-5 text-[#687083]">{option.description}</span>
                        </span>
                        <span className={[
                          "flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition",
                          checked ? "bg-[#D0A733]" : "bg-[#DDE2EA]",
                        ].join(" ")}>
                          <span className={[
                            "h-4 w-4 rounded-full bg-white shadow-sm transition",
                            checked ? "translate-x-5" : "translate-x-0",
                          ].join(" ")} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={savingNotifications}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white transition hover:bg-[#B78F2B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[19px]">mark_email_read</span>
                  {savingNotifications ? "Saving..." : "Save Notifications"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Settings;
