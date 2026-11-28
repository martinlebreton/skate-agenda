import { Link } from "react-router-dom";
import type { Organisateur } from "../types";

export default function CarteOrganisateur({ org }: { org: Organisateur }) {
  const infos = org.infosOrganisateur;

  return (
    <Link
      to={`/organisateurs/${org.slug}`}
      className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 text-inherit no-underline"
    >
      {/* Image */}
      {org.featuredImage ? (
        <img
          src={org.featuredImage.node.sourceUrl}
          alt={org.featuredImage.node.altText || org.title}
          className="w-full aspect-square bg-gray-100 object-contain"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
          <img
            src="/logo-skateevent.svg"
            alt=""
            className="h-24 w-24 object-contain saturate-0"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {org.structures.nodes.map((s) => (
            <span
              key={s.slug}
              className="bg-black text-white text-xs font-semibold px-2 py-0.5 rounded"
            >
              {s.name}
            </span>
          ))}
        </div>

        {/* Nom */}
        <h2 className="text-base font-bold leading-snug group-hover:underline">
          {org.title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {/* Ville */}
          {infos.orgVille && (
            <p className="text-sm text-gray-500">{infos.orgVille}</p>
          )}
          {org.regions.nodes.map((r) => (
            <span
              key={r.slug}
              className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded"
            >
              {r.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
