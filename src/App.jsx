import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import LogoBuilder from "./pages/LogoBuilder";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import OneClickPage from "./pages/OneClickPage";
import Presentation from "./pages/Presentation";
import Editor from "./pages/Editor";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Library from "./pages/Library";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundCancellation from "./pages/RefundCancellation";
import TermsConditions from "./pages/TermsConditions";
import FAQ from "./pages/FAQ";
import DataSecurity from "./pages/DataSecurity";
import LegalPolicy from "./pages/LegalPolicy";
import ChatBox from "./pages/ChatBox";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const { pathname } = useLocation();

  // Routes where footer should be hidden
  const hideFooterRoutes = ["/login", "/register"];
  const hideFooter = hideFooterRoutes.includes(pathname);

  // Routes where bottom nav should be hidden
  const hideBottomNavRoutes = ["/login", "/register", "/dashboard"];
  const hideBottomNav = hideBottomNavRoutes.includes(pathname);

  useEffect(() => {
    // WINDOW SCROLL
    window.scrollTo(0, 0);

    // MAIN APP SCROLL CONTAINER
    const scrollContainer = document.getElementById("main-scroll");

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <div id="main-scroll" className="h-screen overflow-y-auto">
      <ToastContainer />
      
      {/* ✅ ALWAYS SHOW NAVBAR */}
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/logo" element={<LogoBuilder />} />
        <Route path="/portfolio" element={<PortfolioBuilder />} />
        <Route path="/portfolio/view" element={<OneClickPage />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/library" element={<Library />} />
        <Route path="/refund" element={<RefundCancellation />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/data-security" element={<DataSecurity />} />
        <Route path="/legal-policy" element={<LegalPolicy />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      
      {/* ✅ SHOW BOTTOM NAV EXCEPT ON SPECIFIC PAGES */}
      {!hideBottomNav && <BottomNav />}
      
      {/* ✅ SHOW FOOTER EXCEPT ON LOGIN/REGISTER */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;