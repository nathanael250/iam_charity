import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (authService.isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await authService.login(form);
      navigate(location.state?.from || "/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-5 font-manrope text-[#07142D] sm:px-5 sm:py-6 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100svh-40px)] w-full max-w-5xl items-center lg:min-h-[calc(100svh-64px)]">
        <section className="grid w-full overflow-hidden rounded-xl bg-white shadow-2xl lg:grid-cols-[0.85fr_1fr] 2xl:max-w-6xl">
          <div className="flex flex-col justify-between bg-[#071B36] p-6 text-white sm:p-8 lg:p-8 [@media(max-height:760px)]:p-6">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo} alt="I AM Charity Rwanda" className="h-14 w-14 rounded-lg bg-white object-contain p-1 sm:h-16 sm:w-16 [@media(max-height:760px)]:h-12 [@media(max-height:760px)]:w-12" />
                <div>
                  <p className="text-lg font-extrabold sm:text-xl">I AM Charity</p>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#D0A733]">Rwanda</p>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 lg:mt-14 [@media(max-height:760px)]:mt-8">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Admin Access</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl [@media(max-height:760px)]:text-[30px]">Manage every project with confidence.</h1>
                <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-white/72 [@media(max-height:760px)]:leading-6">
                  Sign in before opening the dashboard, donations, volunteer requests, messages, and settings.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 [@media(max-height:760px)]:mt-6">
              {[
                ["inventory_2", "Projects"],
                ["volunteer_activism", "Donations"],
                ["groups", "Volunteers"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-3 sm:p-4 [@media(max-height:760px)]:p-3">
                  <span className="material-symbols-outlined text-[#D0A733]">{icon}</span>
                  <span className="text-sm font-extrabold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 [@media(max-height:760px)]:p-8">
            <div className="mx-auto max-w-md">
              <h2 className="text-2xl font-extrabold text-[#07142D] sm:text-3xl">Welcome back</h2>
              <p className="mt-2 text-sm font-semibold text-[#687083]">Enter your admin details to continue.</p>

              {error ? (
                <div className="mt-6 rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-4 py-3 text-sm font-bold text-[#8A6400]">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 [@media(max-height:760px)]:mt-5 [@media(max-height:760px)]:space-y-4">
                <label className="block text-sm font-extrabold text-[#07142D]">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4] sm:h-12"
                    placeholder="admin@example.com"
                    required
                  />
                </label>

                <label className="block text-sm font-extrabold text-[#07142D]">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="mt-2 h-11 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4] sm:h-12"
                    placeholder="Enter password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D0A733] text-sm font-extrabold text-white shadow-sm transition hover:bg-[#B98F1E] disabled:cursor-not-allowed disabled:opacity-65 sm:h-12"
                >
                  {isSubmitting ? "Signing in..." : "Login to Dashboard"}
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
