import { Link } from "react-router-dom";
import type { Evenement } from "../types";
import {
  formatDate,
  formatLocalisation,
  formatTarif,
} from "../utils/formatters";

export default function MiniCarteEvenement({ evt }: { evt: Evenement }) {
  const info = evt.infoEvenement;

  return (
    <Link
      to={`/agenda/${evt.slug}`}
      className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-black transition-colors"
    >
      {/* Image */}
      {evt.featuredImage ? (
        <img
          src={evt.featuredImage.node.sourceUrl}
          alt={evt.title}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
          🛹
        </div>
      )}

      <div className="flex flex-col gap-1 min-w-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {evt.typeEvts.nodes.map((t) => (
            <span
              key={t.slug}
              className="bg-black text-white text-xs font-semibold px-2 py-0.5 rounded"
            >
              {t.name}
            </span>
          ))}
          {evt.disciplines.nodes.map((d) => (
            <span
              key={d.slug}
              className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded"
            >
              {d.name}
            </span>
          ))}
        </div>

        {/* Titre */}
        <p className="font-semibold text-sm truncate">{evt.title}</p>

        {/* Date + localisation */}
        <p className="text-xs text-gray-400">
          📅 {formatDate(info.dateDeDebut)}
          {(info.lieu || info.ville) && (
            <>
              {" "}
              · 📍 {formatLocalisation(info.lieu, info.ville, info.departement)}
            </>
          )}
        </p>

        {/* Tarif */}
        {info.payant && (
          <p className="text-xs text-gray-400">
            🎟 {formatTarif(info.payant, info.tarif)}
          </p>
        )}
      </div>
    </Link>
  );
}
