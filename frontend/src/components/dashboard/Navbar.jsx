import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const Navbar = ({ onMenuOpen }) => {
  const navigate = useNavigate();
  const session = authService.getSession();

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E7EAF0] bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onMenuOpen} aria-label="Open dashboard menu" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#E2E6EE] text-[#071B36] lg:hidden">
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#F2F5FA] text-[#07142D] ring-1 ring-[#E2E6EE] sm:flex">
              <span className="material-symbols-outlined text-[24px]">account_circle</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-extrabold text-[#07142D]">{session?.user?.name || "Admin User"}</p>
              <p className="text-xs font-semibold capitalize text-[#7A8190]">{session?.user?.role?.replaceAll("_", " ") || "Administrator"}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E6EE] text-[#07142D] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
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
