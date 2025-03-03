import Menu from "./components/Menu";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CollectionsPage from "./pages/CollectionsPage";

function App() {
  return (
    <div className="min-h-screen min-w-[375px] flex flex-col antialiased">
      <Menu />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:collection" element={<CollectionsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
