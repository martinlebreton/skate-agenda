import { useState, useMemo } from "react";
import { useOrganisateurs } from "../hooks/useOrganisateurs";
import CarteOrganisateur from "../components/CarteOrganisateur";
import { Helmet } from "react-helmet-async";

export default function Annuaire() {
  const [filtreRegion, setFiltreRegion] = useState("");
  const [filtreStructure, setFiltreStructure] = useState("");
  const [recherche, setRecherche] = useState("");

  const { data: organisateurs, isLoading, isError } = useOrganisateurs();

  // Régions disponibles parmi les organisateurs
  const regionsDisponibles = useMemo(() => {
    if (!organisateurs) return [];
    const map = new Map<string, string>();
    organisateurs.forEach((org) =>
      org.regions.nodes.forEach((r) => map.set(r.slug, r.name)),
    );
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [organisateurs]);

  // Structures disponibles
  const structuresDisponibles = useMemo(() => {
    if (!organisateurs) return [];
    const map = new Map<string, string>();
    organisateurs.forEach((org) =>
      org.structures.nodes.forEach((s) => map.set(s.slug, s.name)),
    );
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [organisateurs]);

  // Filtrage
  const resultats = useMemo(
    () =>
      (organisateurs ?? []).filter((org) => {
        // Uniquement les organisateurs actifs
        if (!org.infosOrganisateur.orgStatut?.includes("active")) return false;

        if (
          filtreRegion &&
          !org.regions.nodes.some((r) => r.slug === filtreRegion)
        )
          return false;
        if (
          filtreStructure &&
          !org.structures.nodes.some((s) => s.slug === filtreStructure)
        )
          return false;
        if (
          recherche &&
          !org.title.toLowerCase().includes(recherche.toLowerCase())
        )
          return false;
        return true;
      }),
    [organisateurs, filtreRegion, filtreStructure, recherche],
  );

  const selectClass =
    "text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black cursor-pointer";
  const actifCount = [filtreRegion, filtreStructure, recherche].filter(
    Boolean,
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Helmet>
        <title>
          Annuaire des associations organisatrices d'événements skate - Skate
          Event
        </title>
        <meta
          name="description"
          content="Découvrez les associations, fédérations et skateshops qui organisent des événements skate partout en France."
        />
      </Helmet>
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-teal-600">
          Annuaire
        </h1>
        <p className="text-gray-500 mt-1">
          Les organisateurs d'événements skate en France
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-teal-600 rounded-xl">
        {/* Recherche texte */}
        <input
          type="text"
          placeholder="Rechercher un organisateur…"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black min-w-52"
        />

        <select
          value={filtreRegion}
          onChange={(e) => setFiltreRegion(e.target.value)}
          className={selectClass}
        >
          <option value="">Toutes les régions</option>
          {regionsDisponibles.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          value={filtreStructure}
          onChange={(e) => setFiltreStructure(e.target.value)}
          className={selectClass}
        >
          <option value="">Tous les types</option>
          {structuresDisponibles.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>

        {actifCount > 0 && (
          <button
            onClick={() => {
              setFiltreRegion("");
              setFiltreStructure("");
              setRecherche("");
            }}
            className="text-sm px-3 py-2 rounded-lg border bg-black text-white hover:bg-teal-800 transition-colors"
          >
            Réinitialiser ({actifCount})
          </button>
        )}
      </div>

      {/* États */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Chargement des organisateurs…
        </div>
      )}
      {isError && (
        <div className="text-red-500 py-10 text-center">
          Erreur de chargement.
        </div>
      )}

      {/* Résultats */}
      {!isLoading && !isError && (
        <>
          <p className="text-sm text-gray-400 mb-4">
            {resultats.length} organisateur{resultats.length > 1 ? "s" : ""}
          </p>

          {resultats.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              Aucun organisateur ne correspond à ces critères.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {resultats.map((org) => (
                <CarteOrganisateur key={org.id} org={org} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
