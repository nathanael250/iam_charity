import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ImpactStoriesPage from "./pages/ImpactStoriesPage";
import Contact from "./pages/Contact";
import NeedDetail from "./pages/NeedDetail";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProtectedAdminRoute from "./components/dashboard/ProtectedAdminRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminProjects from "./pages/dashboard/Projects";
import ProjectDetail from "./pages/dashboard/ProjectDetail";
import ProjectForm from "./pages/dashboard/ProjectForm";
import Donations from "./pages/dashboard/Donations";
import Volunteers from "./pages/dashboard/Volunteers";
import ImpactUpdates from "./pages/dashboard/ImpactUpdates";
import ResourceAnalytics from "./pages/dashboard/resources/ResourceAnalytics";
import Beneficiaries from "./pages/dashboard/resources/Beneficiaries";
import MaterialsUsed from "./pages/dashboard/resources/MaterialsUsed";
import Expenses from "./pages/dashboard/resources/Expenses";
import Messages from "./pages/dashboard/Messages";
import Newsletter from "./pages/dashboard/Newsletter";
import Cms from "./pages/dashboard/Cms";
import Settings from "./pages/dashboard/Settings";
import Login from "./pages/dashboard/Login";
import PageNotFound from "./pages/dashboard/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import BeneficiaryDetails from "./pages/dashboard/resources/BeneficiaryDetails";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/needs/:slug" element={<NeedDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/activities"
          element={<Navigate to="/impact-stories" replace />}
        />
        <Route path="/impact-stories" element={<ImpactStoriesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
          <Route path="donations" element={<Donations />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="impact-updates" element={<ImpactUpdates />} />
          
          <Route path="resources/analytics" element={<ResourceAnalytics />} />
          <Route path="resources/beneficiaries" element={<Beneficiaries />} />
          <Route path="resources/beneficiaries/:id" element={<BeneficiaryDetails />} />
          <Route path="resources/materials" element={<MaterialsUsed />} />
          <Route path="resources/expenses" element={<Expenses />} />
          <Route path="messages" element={<Messages />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="cms" element={<Cms />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
