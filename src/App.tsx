import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Agenda from "./pages/Agenda";
import EvenementDetail from "./pages/EvenementDetail";
import Annuaire from "./pages/Annuaire";
import OrganisateurDetail from "./pages/OrganisateurDetail";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Agenda />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/:slug" element={<EvenementDetail />} />
          <Route path="/organisateurs" element={<Annuaire />} />
          <Route path="/organisateurs/:slug" element={<OrganisateurDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
