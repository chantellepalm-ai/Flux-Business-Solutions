import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/AboutPage";
import ServicesPage from "@/react-app/pages/ServicesPage";
import ContactPage from "@/react-app/pages/ContactPage";
import PackagesPage from "@/react-app/pages/PackagesPage";
import BlogPage from "@/react-app/pages/BlogPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}
