import { Link } from "react-router-dom";
import type { Evenement } from "../types";
import BoutonPartagerEvenement from "./BoutonPartagerEvenement";
import {
  formatPeriode,
  formatTarif,
  formatLocalisation,
} from "../utils/formatters";

export default function CarteEvenement({ evt }: { evt: Evenement }) {
  const info = evt.infoEvenement;

  return (
    <article className="group rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      {evt.featuredImage && (
        <Link to={`/agenda/${evt.slug}`} className="block">
          <img
            src={evt.featuredImage.node.sourceUrl}
            alt={evt.featuredImage.node.altText || evt.title}
            className="w-full h-56 object-cover"
          />
        </Link>
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
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/agenda/${evt.slug}`}
            className="min-w-0 text-inherit no-underline"
          >
            <h2 className="text-base font-bold leading-snug group-hover:underline">
              {evt.title}
            </h2>
          </Link>
          <BoutonPartagerEvenement title={evt.title} slug={evt.slug} />
        </div>

        {/* Localisation */}
        <Link
          to={`/agenda/${evt.slug}`}
          className="flex flex-col gap-2 text-inherit no-underline"
        >
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
        </Link>
      </div>
    </article>
  );
}
