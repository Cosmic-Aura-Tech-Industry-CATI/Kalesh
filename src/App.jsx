import { useEffect, Suspense, lazy, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, useNavigate, Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ScrollbarTop from "./components/ScrollbarTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthService } from "./services/auth.service";

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

import JobsPosting from "./admin/pages/JobsPosting";
import AdminLayout from "./admin/layout/AdminLayout";

// Lazy Public Pages
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});



// ================= MAIN ROUTES =================
function MainRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <ScrollbarTop />

      <main style={{ flex: 1 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {/* PUBLIC ROUTES */}
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

            {/* ADMIN LOGIN (No Layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />

              {/* ADMIN PROTECTED ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="reported-polls" element={<AdminReportedPolls />} />
              <Route path="poll-moderation" element={<AdminPollModeration />} />
              <Route path="users" element={<AdminUsers />} />
              
              {/* ✅ FIXED — NOW INSIDE ADMIN LAYOUT */}
              <Route path="/admin/jobs" element={<JobsPosting />} />
              <Route path="banned-users" element={<AdminBannedUsers />} />
              <Route path="premium" element={<AdminPremium />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="admins" element={<AdminAdmins />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}


// ================= APP ROOT =================
function App() {
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
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} />  */}
      <div className="app-main">
        <MainRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
