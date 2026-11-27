import { CalendarDays, CirclePlus, UsersRound } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();
  const tabs = [
    {
      to: "/agenda",
      label: "Events",
      icon: CalendarDays,
      isActive: pathname === "/" || pathname.startsWith("/agenda"),
    },
    {
      to: "/organisateurs",
      label: "Organisateurs",
      icon: UsersRound,
      isActive: pathname.startsWith("/organisateurs"),
    },
    {
      to: "/contact",
      label: "Ajouter",
      icon: CirclePlus,
      isActive: pathname.startsWith("/contact"),
    },
  ];
  const renderTabs = () =>
    tabs.map(({ to, label, icon: Icon, isActive }) => (
      <NavLink
        key={to}
        to={to}
        aria-current={isActive ? "page" : undefined}
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          isActive ? "text-teal-700" : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        <span className="text-[11px] font-medium leading-none">{label}</span>
      </NavLink>
    ));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <img src="/logo-skateevent.svg" alt="" className="h-8 w-8" />
            <span>Skate Event</span>
          </NavLink>
          <nav
            aria-label="Navigation principale"
            className="hidden h-full items-center gap-8 md:flex"
          >
            {renderTabs()}
          </nav>
        </div>
      </header>

      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-3">
          {renderTabs()}
        </div>
      </nav>
    </>
  );
}
