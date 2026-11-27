import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-black" : "text-gray-400 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight"
        >
          <img src="/logo-skateevent.svg" alt="" className="h-8 w-8" />
          <span>Skate Event</span>
        </NavLink>

        {/* Liens */}
        <nav className="flex items-center gap-6">
          <NavLink to="/agenda" className={linkClass}>
            Agenda
          </NavLink>
          <NavLink to="/organisateurs" className={linkClass}>
            Organisateurs
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
