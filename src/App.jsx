import { useEffect, Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import ScrollbarTop from "./components/ScrollbarTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin imports
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminReportedPolls from "./admin/pages/ReportedPolls";
import AdminPollModeration from "./admin/pages/PollModeration";
import AdminUsers from "./admin/pages/Users";
import AdminBannedUsers from "./admin/pages/BannedUsers";
import AdminPremium from "./admin/pages/Premium";
import AdminPayments from "./admin/pages/Payments";
import AdminAdmins from "./admin/pages/Admins";
import AdminLogs from "./admin/pages/Logs";
import AdminSettings from "./admin/pages/Settings";
import AdminSidebar from "./admin/components/Sidebar";
import AdminTopbar from "./admin/components/Topbar";

// Lazy load all page components to reduce initial bundle size and improve load times
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Promotions = lazy(() => import("./pages/Promotions"));
const Careers = lazy(() => import("./pages/Careers"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CommunityGuidelines = lazy(() => import("./pages/CommunityGuidelines"));
const SecurityAdvisory = lazy(() => import("./pages/SecurityAdvisory"));
const FAQ = lazy(() => import("./pages/faq"));
const Blog = lazy(() => import("./pages/Blog"));
const Blogpage1 = lazy(() => import("./pages/Blogpage1"));
const Blogteam = lazy(() => import("./pages/Blogteam"));
const Post1 = lazy(() => import("./pages/Post1"));
const Post2 = lazy(() => import("./pages/Post2"));
const Post3 = lazy(() => import("./pages/Post3"));
const Post4 = lazy(() => import("./pages/Post4"));
const Post5 = lazy(() => import("./pages/Post5"));
const Viewpage = lazy(() => import("./pages/Viewpage"));

// Admin Layout Component
function AdminLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = location.pathname === '/admin/login';

  // Import admin CSS only when admin layout is used
  useEffect(() => {
    import('./admin/style/admin.css');
  }, []);

  if (isLoginPage) {
    return <div className="admin-wrapper">{children}</div>;
  }

  return (
    <div className="admin-wrapper min-h-screen bg-gradient-to-br from-[#0b0b0f] to-[#1a1a2e]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AdminTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main className="lg:ml-64 pt-24 lg:pt-40 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#0b0b0f] to-[#1a1a2e] min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Main Routes Component to handle conditional rendering
function MainRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <ScrollbarTop />

      <main style={{ flex: 1 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/blog1" element={<Blogpage1 />} />
            <Route path="/blog/blogteam" element={<Blogteam />} />
            <Route path="/blog/Post1" element={<Post1 />} />
            <Route path="/blog/Post2" element={<Post2 />} />
            <Route path="/blog/Post3" element={<Post3 />} />
            <Route path="/blog/Post4" element={<Post4 />} />
            <Route path="/blog/Post5" element={<Post5 />} />
            <Route path="/blog/Viewpage" element={<Viewpage />} />
            <Route path="/communityguidelines" element={<CommunityGuidelines />} />
            <Route path="/securityadvisory" element={<SecurityAdvisory />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/reported-polls"
              element={
                <AdminLayout>
                  <AdminReportedPolls />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/poll-moderation"
              element={
                <AdminLayout>
                  <AdminPollModeration />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/banned-users"
              element={
                <AdminLayout>
                  <AdminBannedUsers />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/premium"
              element={
                <AdminLayout>
                  <AdminPremium />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <AdminLayout>
                  <AdminPayments />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/admins"
              element={
                <AdminLayout>
                  <AdminAdmins />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/logs"
              element={
                <AdminLayout>
                  <AdminLogs />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  // 🔥 FIX MOBILE 100vh ISSUE (GLOBAL)
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  return (
    <div className="app-main">
      <MainRoutes />
    </div>
  );
}

export default App;
