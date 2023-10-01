import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import About from "./pages/About";


function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar />
          <div className="w-full min-h-screen mx-auto">
          <div className="container mx-auto px-4">
        <Routes>


            <Route path="/" element={<Home />} />

            <Route path="/dictionary" element={<Dictionary />} />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />


        </Routes>
          </div>
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
