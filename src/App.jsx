import Menu from "./components/Menu";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CollectionsPage from "./pages/CollectionsPage";
import { FaInstagram } from "react-icons/fa";

function App() {
  return (
    <div className="min-h-screen min-w-[375px] flex flex-col antialiased">
      <Menu />
      <a href="https://www.instagram.com/callmecaseyy_/" target="_blank">
        <FaInstagram className="fixed top-6 right-6 text-5xl cursor-pointer z-25 " />
      </a>
      <Header />
      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/collections/:collection"
            element={<CollectionsPage />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
