import { Link } from "react-router-dom";
import type { OrganisateurRef } from "../types";

export default function MiniCarteOrganisateur({
  org,
}: {
  org: OrganisateurRef;
}) {
  const ville = org.infosOrganisateur?.orgVille;
  const cp = org.infosOrganisateur?.orgCodePostal;

  return (
    <Link
      to={`/organisateurs/${org.slug}`}
      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-black transition-colors"
    >
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold text-sm">{org.title}</p>
        {(ville || cp) && (
          <p className="text-xs text-gray-400">
            📍 {[ville, cp ? `(${cp})` : null].filter(Boolean).join(" ")}
          </p>
        )}
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
        Voir la fiche →
      </span>
    </Link>
  );
}
