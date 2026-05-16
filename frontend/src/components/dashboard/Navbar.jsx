import { useNavigate } from "react-router-dom";
import adminAvatar from "../../assets/family_images/c_img4.png";
import { authService } from "../../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const session = authService.getSession();

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E7EAF0] bg-white/95 backdrop-blur">
      <div className="flex h-[98px] items-center justify-between gap-6 px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-md text-[#071B36]">
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-[#07142D]">Dashboard</h1>
            <p className="mt-1 text-sm font-semibold text-[#7A8190]">
              Welcome back, Admin! Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <label className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-[#788193]">search</span>
            <input
              className="h-12 w-[210px] rounded-lg border border-[#DDE2EA] bg-white pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#D0A733] focus:ring-[#D0A733]"
              placeholder="Search anything..."
            />
          </label>
          <button type="button" className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#07142D]">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D0A733] text-[11px] font-extrabold text-white">
              3
            </span>
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={adminAvatar} alt="Admin user" className="h-12 w-12 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#3CB85C]" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#07142D]">{session?.name || "Admin User"}</p>
              <p className="text-xs font-semibold text-[#7A8190]">{session?.role || "Administrator"}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#07142D] transition hover:bg-red-50 hover:text-red-600"
            >
              <span className="material-symbols-outlined text-[22px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
