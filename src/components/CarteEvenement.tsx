import { Link } from "react-router-dom";
import type { Evenement } from "../types";
import {
  formatPeriode,
  formatTarif,
  formatLocalisation,
} from "../utils/formatters";

export default function CarteEvenement({ evt }: { evt: Evenement }) {
  const info = evt.infoEvenement;

  return (
    <Link
      to={`/agenda/${evt.slug}`}
      className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 text-inherit no-underline"
    >
      {/* Image */}
      {evt.featuredImage && (
        <img
          src={evt.featuredImage.node.sourceUrl}
          alt={evt.featuredImage.node.altText || evt.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-4 flex flex-col gap-2">
        {/* Tags taxonomies */}
        <div className="flex flex-wrap gap-1.5">
          {evt.typeEvts.nodes.map((t) => (
            <span
              key={t.slug}
              className="bg-black text-white text-xs font-semibold px-2 py-0.5 rounded-full"
            >
              {t.name}
            </span>
          ))}
          {evt.disciplines.nodes.map((d) => (
            <span
              key={d.slug}
              className="bg-teal-800 text-teal-100 text-xs px-2 py-0.5 rounded-full"
            >
              {d.name}
            </span>
          ))}
        </div>

        {/* Titre */}
        <h2 className="text-base font-bold leading-snug group-hover:underline">
          {evt.title}
        </h2>

        {/* Localisation */}
        {(info.lieu || info.ville) && (
          <p className="text-sm text-gray-500">
            📍 {formatLocalisation(info.lieu, info.ville, info.departement)}
          </p>
        )}

        {/* Dates */}
        <p className="text-sm text-gray-500">
          📅 {formatPeriode(info.dateDeDebut, info.dateDeFin)}
        </p>

        {/* Tarif */}
        {info.payant && (
          <p className="text-sm font-semibold">
            🎟 {formatTarif(info.payant, info.tarif)}
          </p>
        )}
      </div>
    </Link>
  );
}
