import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Home } from "./pages/public/Home";
import { About } from "./pages/public/About";
import { Projects } from "./pages/public/Projects";
import { ProjectDetail } from "./pages/public/ProjectDetail";
import { Donate } from "./pages/public/Donate";
import { Volunteer } from "./pages/public/Volunteer";
import { ImpactStories } from "./pages/public/ImpactStories";
import { Contact } from "./pages/public/Contact";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Beneficiaries } from "./pages/admin/Beneficiaries";
import { AdminProjects } from "./pages/admin/AdminProjects";
import { Donations } from "./pages/admin/Donations";
import { Volunteers } from "./pages/admin/Volunteers";
import { Reports } from "./pages/admin/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "donate", Component: Donate },
      { path: "volunteer", Component: Volunteer },
      { path: "impact-stories", Component: ImpactStories },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "beneficiaries", Component: Beneficiaries },
      { path: "projects", Component: AdminProjects },
      { path: "donations", Component: Donations },
      { path: "volunteers", Component: Volunteers },
      { path: "reports", Component: Reports },
    ],
  },
]);
