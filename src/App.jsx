import { useEffect, Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import ScrollbarTop from "./components/ScrollbarTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ApplicationDetails from "./pages/ApplicationDetails";
import UnauthorizedModal from "./components/UnauthorizedModal";

// ADMIN IMPORTS
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminReportedPolls from "./admin/pages/ReportedPolls";
import AdminPollModeration from "./admin/pages/PollModeration";
import AdminUsers from "./admin/pages/Users";
import UserDetails from "./admin/pages/UserDetails";
import AdminBannedUsers from "./admin/pages/BannedUsers";
import AdminPremium from "./admin/pages/Premium";
import AdminPayments from "./admin/pages/Payments";
import Admins from "./admin/pages/Admins";
import AdminLogs from "./admin/pages/Logs";
import AdminSettings from "./admin/pages/Settings";

import JobsPosting from "./admin/pages/JobsPosting";
import AdminLayout from "./admin/layout/AdminLayout";

import AdminBlog from "./admin/pages/AdminBlog";
import AdminBlogPage from "./admin/pages/AdminBlogPage";
import AdminEditBlog from "./admin/pages/AdminEditBlog";
import AdminCreateContest from "./admin/pages/AdminCreateContest";
import AdminContestList from "./admin/pages/AdminContestList";

import JobDetails from "./pages/JobDetails";

// LAZY PUBLIC PAGES
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
const Blogteam = lazy(() => import("./pages/Blogteam"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
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
            <Route path="/careers/:jobId" element={<JobDetails />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/viewpage" element={<Viewpage />} />
            <Route path="/blog/blogteam" element={<Blogteam />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/communityguidelines" element={<CommunityGuidelines />} />
            <Route path="/securityadvisory" element={<SecurityAdvisory />} />

            <Route path="/application/:token" element={<ApplicationDetails />} />

            {/* ADMIN LOGIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="reported-polls" element={<AdminReportedPolls />} />
              <Route path="poll-moderation" element={<AdminPollModeration />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="user/:userId" element={<UserDetails />} />

              <Route path="jobs" element={<JobsPosting />} />

              {/* BLOG SYSTEM */}
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blogs" element={<AdminBlogPage />} />
              <Route path="blog/edit/:slug" element={<AdminEditBlog />} />
              <Route path="/admin/contest/create" element={<AdminCreateContest />} />
              <Route path="/admin/contests" element={<AdminContestList />} />

              <Route path="banned-users" element={<AdminBannedUsers />} />
              <Route path="premium" element={<AdminPremium />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="admins" element={<Admins />} />
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
      {import.meta.env.VITE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b0b0b",
            color: "#fff",
            border: "1px solid #1f1f1f",
            padding: "14px 18px",
          },
        }}
      />

      <UnauthorizedModal />

      <div className="app-main">
        <MainRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;