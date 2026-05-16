import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
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
import Messages from "./pages/dashboard/Messages";
import Newsletter from "./pages/dashboard/Newsletter";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import Login from "./pages/dashboard/Login";
import PageNotFound from "./pages/dashboard/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/needs/:slug" element={<NeedDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/impact-stories" element={<ImpactStoriesPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedAdminRoute><DashboardLayout /></ProtectedAdminRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="projects/:id/edit" element={<ProjectForm />} />
        <Route path="donations" element={<Donations />} />
        <Route path="volunteers" element={<Volunteers />} />
        <Route path="messages" element={<Messages />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
