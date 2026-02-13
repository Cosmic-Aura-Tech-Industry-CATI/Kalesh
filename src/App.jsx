import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ScrollbarTop from "./components/ScrollbarTop";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



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
    <div className="app-layout">
      <Navbar />

      <ScrollbarTop />

      {/* MAIN CONTENT */}
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
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

            <Route
              path="/communityguidelines"
              element={<CommunityGuidelines />}
            />
            <Route path="/securityadvisory" element={<SecurityAdvisory />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
