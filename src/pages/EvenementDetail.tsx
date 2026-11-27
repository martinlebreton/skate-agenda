import { useParams, Link } from "react-router-dom";
import { useEvenement } from "../hooks/useEvenements";
import {
  formatDate,
  formatMetaDescription,
  formatPeriode,
  formatTarif,
  formatLocalisation,
  INFOS_LABELS,
} from "../utils/formatters";
import LightboxImage from "../components/LightboxImage";
import BoutonPartagerEvenement from "../components/BoutonPartagerEvenement";

import MiniCarteOrganisateur from "../components/MiniCarteOrganisateur";
import { Helmet } from "react-helmet-async";

export default function EvenementDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: evt, isLoading, isError } = useEvenement(slug!);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-40 text-gray-400">
        Chargement…
      </div>
    );

  if (isError || !evt)
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">Événement introuvable.</p>
        <Link to="/agenda" className="text-sm underline text-gray-500">
          ← Retour à l'agenda
        </Link>
      </div>
    );

  const metaTitle = [
    evt.title,
    evt.typeEvts.nodes[0]?.name,
    formatDate(evt.infoEvenement.dateDeDebut),
    evt.infoEvenement.ville,
    "- Skate Event",
  ]
    .filter(Boolean)
    .join(" ");

  const metaDescription = formatMetaDescription(
    evt.infoEvenement.description,
    [
      formatPeriode(evt.infoEvenement.dateDeDebut, evt.infoEvenement.dateDeFin),
      formatLocalisation(
        evt.infoEvenement.lieu,
        evt.infoEvenement.ville,
        evt.infoEvenement.departement,
      ),
      evt.infoEvenement.payant?.includes("Gratuit")
        ? "Gratuit"
        : evt.infoEvenement.tarif
          ? `À partir de ${evt.infoEvenement.tarif} €`
          : null,
    ]
      .filter(Boolean)
      .join(" · "),
  );

  const info = evt.infoEvenement;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {evt.featuredImage && (
          <meta
            property="og:image"
            content={evt.featuredImage.node.sourceUrl}
          />
        )}
      </Helmet>
      {/* Retour */}
      <Link
        to="/agenda"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-black transition-colors mb-6"
      >
        ← Retour à l'agenda
      </Link>

      {/* Image + lightbox */}
      {evt.featuredImage && (
        <LightboxImage
          src={evt.featuredImage.node.sourceUrl}
          alt={evt.featuredImage.node.altText || evt.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {evt.typeEvts.nodes.map((t) => (
          <span
            key={t.slug}
            className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            {t.name}
          </span>
        ))}
        {evt.disciplines.nodes.map((d) => (
          <span
            key={d.slug}
            className="bg-teal-800 text-teal-100 text-xs px-3 py-1 rounded-full"
          >
            {d.name}
          </span>
        ))}
        {evt.regions.nodes.map((r) => (
          <span
            key={r.slug}
            className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full"
          >
            {r.name}
          </span>
        ))}
      </div>

      {/* Titre */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <h1 className="min-w-0 flex-1 text-4xl text-teal-600 font-bold tracking-tight">
          {evt.title}
        </h1>
        <BoutonPartagerEvenement
          title={evt.title}
          slug={evt.slug}
          className="mt-1"
        />
      </div>

      {/* Infos clés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-gray-100 rounded-2xl">
        {/* Dates */}
        <div>
          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
            Date
          </p>
          <p className="text-sm font-medium">
            {formatPeriode(info.dateDeDebut, info.dateDeFin)}
          </p>
        </div>

        {/* Localisation */}
        {(info.lieu || info.ville) && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Lieu
            </p>
            <p className="text-sm font-medium">
              {formatLocalisation(info.lieu, info.ville, info.departement)}
            </p>
          </div>
        )}

        {/* Tarif */}
        {info.payant && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Tarif
            </p>
            <p className="text-sm font-medium">
              {formatTarif(info.payant, info.tarif)}
            </p>
          </div>
        )}

        {/* Infos pratiques */}
        {info.infosPratiques && info.infosPratiques.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Sur place
            </p>
            <div className="flex flex-wrap gap-1.5">
              {info.infosPratiques.map((cle) => (
                <span
                  key={cle}
                  className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full"
                >
                  {INFOS_LABELS[cle] ?? cle}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {info.description && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">À propos</h2>
          <div
            className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: info.description }}
          />
        </div>
      )}

      {/* Infos complémentaires */}
      {info.infosComplementaires && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">Infos complémentaires</h2>
          <div
            className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: info.infosComplementaires }}
          />
        </div>
      )}

      {/* Organisateurs */}
      {info.associationsOrganisatrices?.nodes &&
        info.associationsOrganisatrices.nodes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3">Organisé par</h2>
            <div className="flex flex-col gap-3">
              {info.associationsOrganisatrices.nodes.map((org) => (
                <MiniCarteOrganisateur key={org.id} org={org} />
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
