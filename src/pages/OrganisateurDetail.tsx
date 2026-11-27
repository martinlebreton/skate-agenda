import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrganisateur } from "../hooks/useOrganisateurs";
import { useEvenementsOrganisateur } from "../hooks/useEvenementsOrganisateur";
import type { Evenement } from "../types";
import MiniCarteEvenement from "../components/MiniCarteEvenement";
import { Helmet } from "react-helmet-async";
import { formatMetaDescription } from "../utils/formatters";

export default function OrganisateurDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [archivesOuvertes, setArchivesOuvertes] = useState(false);

  const { data: org, isLoading, isError } = useOrganisateur(slug!);
  const {
    aVenir,
    archives,
    isLoading: evtLoading,
  } = useEvenementsOrganisateur(org?.databaseId ?? 0);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-40 text-gray-400">
        Chargement…
      </div>
    );

  if (isError || !org)
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">Organisateur introuvable.</p>
        <Link to="/organisateurs" className="text-sm underline text-gray-500">
          ← Retour à l'annuaire
        </Link>
      </div>
    );
  const metaTitle =
    [org.title, org.structures.nodes[0]?.name, org.infosOrganisateur.orgVille]
      .filter(Boolean)
      .join(" ") + " - Skate Event";

  const metaDescription = formatMetaDescription(
    org.infosOrganisateur.orgDescription,
    `Découvrez ${org.structures.nodes[0]?.name} ${org.title}, organisateur d'événements skate${org.infosOrganisateur.orgVille ? ` à ${org.infosOrganisateur.orgVille}` : ""}.`,
  );

  const infos = org.infosOrganisateur;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {org.featuredImage && (
          <meta
            property="og:image"
            content={org.featuredImage.node.sourceUrl}
          />
        )}
      </Helmet>
      {/* Retour */}
      <Link
        to="/organisateurs"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-black transition-colors mb-6"
      >
        ← Retour à l'annuaire
      </Link>

      {/* Image */}
      {org.featuredImage ? (
        <img
          src={org.featuredImage.node.sourceUrl}
          alt={org.featuredImage.node.altText || org.title}
          className="aspect-square h-52 object-cover rounded-2xl mb-6"
        />
      ) : (
        <div className="aspect-square h-52 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center text-6xl">
          🛹
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {org.structures.nodes.map((s) => (
          <span
            key={s.slug}
            className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            {s.name}
          </span>
        ))}
        {org.regions.nodes.map((r) => (
          <span
            key={r.slug}
            className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full"
          >
            {r.name}
          </span>
        ))}
      </div>

      {/* Nom */}

      <h1 className="text-4xl text-teal-600 font-bold tracking-tight mb-6">
        {org.title}
      </h1>

      {/* Infos de contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-gray-100 rounded-2xl">
        {(infos.orgVille || infos.orgCodePostal) && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Ville
            </p>
            <p className="text-sm font-medium">
              {[infos.orgCodePostal, infos.orgVille].filter(Boolean).join(" ")}
            </p>
            {infos.orgAdresse && (
              <p className="text-xs text-gray-400 mt-0.5">{infos.orgAdresse}</p>
            )}
          </div>
        )}

        {infos.orgSiteWeb && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Site web
            </p>

            <a
              href={infos.orgSiteWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline hover:text-gray-500 break-all"
            >
              {infos.orgSiteWeb.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {infos.orgInstagram && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Instagram
            </p>

            <a
              href={infos.orgInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline hover:text-gray-500"
            >
              {infos.orgInstagram
                .replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
                .replace(/\/$/, "")}
            </a>
          </div>
        )}

        {infos.orgTelephone && (
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
              Téléphone
            </p>
            <a
              href={`tel:${infos.orgTelephone}`}
              className="text-sm font-medium"
            >
              {infos.orgTelephone}
            </a>
          </div>
        )}
      </div>

      {/* Description */}
      {infos.orgDescription && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-600 mb-3">À propos</h2>
          <div
            className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: infos.orgDescription }}
          />
        </div>
      )}

      {/* Événements à venir */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3 text-teal-600">
          Événements à venir
          {!evtLoading && (
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({aVenir.length})
            </span>
          )}
        </h2>

        {evtLoading && <p className="text-gray-400 text-sm">Chargement…</p>}

        {!evtLoading && aVenir.length === 0 && (
          <p className="text-sm text-gray-400">Aucun événement à venir.</p>
        )}

        {!evtLoading && aVenir.length > 0 && (
          <div className="flex flex-col gap-3">
            {aVenir.map((evt) => (
              <MiniCarteEvenement key={evt.id} evt={evt} />
            ))}
          </div>
        )}
      </div>

      {/* Archives */}
      {archives.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => setArchivesOuvertes((v) => !v)}
            className="flex items-center gap-2 text-lg font-bold mb-3 hover:text-gray-500 transition-colors"
          >
            <span>Archives</span>
            <span className="text-sm font-normal text-gray-400">
              ({archives.length})
            </span>
            <span className="text-sm text-teal-600 ml-1">
              {archivesOuvertes ? "▲" : "▼"}
            </span>
          </button>

          {archivesOuvertes && (
            <div className="flex flex-col gap-3">
              {archives.map((evt) => (
                <MiniCarteEvenement key={evt.id} evt={evt} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
