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
    <main className="min-h-screen bg-white px-5 py-8 font-manrope text-[#07142D]">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center">
        <section className="grid w-full overflow-hidden rounded-2xl bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between bg-[#071B36] p-8 text-white lg:p-10">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo} alt="Hope and Homes Foundation" className="h-16 w-16 rounded-full bg-white object-contain p-1" />
                <div>
                  <p className="text-xl font-extrabold">Hope & Homes</p>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#D0A733]">Foundation</p>
                </div>
              </div>

              <div className="mt-16">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Admin Access</p>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight">Manage every project with confidence.</h1>
                <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-white/72">
                  Sign in before opening the dashboard, donations, volunteer requests, messages, and reports.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["inventory_2", "Projects"],
                ["volunteer_activism", "Donations"],
                ["groups", "Volunteers"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
                  <span className="material-symbols-outlined text-[#D0A733]">{icon}</span>
                  <span className="text-sm font-extrabold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-3xl font-extrabold text-[#07142D]">Welcome back</h2>
              <p className="mt-2 text-sm font-semibold text-[#687083]">Enter your admin details to continue.</p>

              {error ? (
                <div className="mt-6 rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-4 py-3 text-sm font-bold text-[#8A6400]">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block text-sm font-extrabold text-[#07142D]">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
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
                    className="mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none transition focus:border-[#D0A733] focus:ring-2 focus:ring-[#F3E3B4]"
                    placeholder="Enter password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#D0A733] text-sm font-extrabold text-white shadow-sm transition hover:bg-[#B98F1E] disabled:cursor-not-allowed disabled:opacity-65"
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
