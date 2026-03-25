import {  Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import LogoBuilder from "./pages/LogoBuilder";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import Editor from "./pages/Editor";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundCancellation from "./pages/RefundCancellation";
import TermsConditions from "./pages/TermsConditions";


function App() {
  return (
  <>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/templates" element={<Templates />} />
          <Route path="/logo" element={<LogoBuilder />} />
          <Route path="/portfolio" element={<PortfolioBuilder />} />

          <Route path="/editor" element={<Editor />} />
          
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundCancellation />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
        <Footer />
        </>

  );
}

export default App;