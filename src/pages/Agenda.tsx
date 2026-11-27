import { useState, useMemo } from "react";
import { useEvenements } from "../hooks/useEvenements";
import CarteEvenement from "../components/CarteEvenement";
import { getMoisCourant, isWeekend, isMoisCourant } from "../utils/formatters";
import { Helmet } from "react-helmet-async";

type FiltreRapide = "" | "weekend" | "mois";

export default function Agenda() {
  const [filtreRegion, setFiltreRegion] = useState("");
  const [filtreDiscipline, setFiltreDiscipline] = useState("");
  const [filtreType, setFiltreType] = useState("");
  const [filtreRapide, setFiltreRapide] = useState<FiltreRapide>("");

  const { data, isLoading, isError } = useEvenements();

  const moisLabel = getMoisCourant();

  const aujourdhui = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Événements à venir uniquement, triés par date
  const evenementsAVenir = useMemo(
    () =>
      (data?.nodes ?? [])
        .filter((evt) => {
          const dateFin =
            evt.infoEvenement.dateDeFin || evt.infoEvenement.dateDeDebut;
          return new Date(dateFin) >= aujourdhui;
        })
        .sort(
          (a, b) =>
            new Date(a.infoEvenement.dateDeDebut).getTime() -
            new Date(b.infoEvenement.dateDeDebut).getTime(),
        ),
    [data, aujourdhui],
  );

  // Régions disponibles
  const regionsDisponibles = useMemo(() => {
    const map = new Map<string, string>();
    evenementsAVenir.forEach((evt) =>
      evt.regions.nodes.forEach((r) => map.set(r.slug, r.name)),
    );
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [evenementsAVenir]);

  // Disciplines disponibles
  const disciplinesDisponibles = useMemo(() => {
    const map = new Map<string, string>();
    evenementsAVenir.forEach((evt) =>
      evt.disciplines.nodes.forEach((d) => map.set(d.slug, d.name)),
    );
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [evenementsAVenir]);

  // Types disponibles
  const typesDisponibles = useMemo(() => {
    const map = new Map<string, string>();
    evenementsAVenir.forEach((evt) =>
      evt.typeEvts.nodes.forEach((t) => map.set(t.slug, t.name)),
    );
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [evenementsAVenir]);

  // Filtrage final
  const evenements = useMemo(
    () =>
      evenementsAVenir.filter((evt) => {
        const info = evt.infoEvenement;

        // Filtre rapide
        if (
          filtreRapide === "weekend" &&
          !isWeekend(info.dateDeDebut, info.dateDeFin)
        )
          return false;
        if (
          filtreRapide === "mois" &&
          !isMoisCourant(info.dateDeDebut, info.dateDeFin)
        )
          return false;

        // Filtres taxonomie
        if (
          filtreRegion &&
          !evt.regions.nodes.some((r) => r.slug === filtreRegion)
        )
          return false;
        if (
          filtreDiscipline &&
          !evt.disciplines.nodes.some((d) => d.slug === filtreDiscipline)
        )
          return false;
        if (
          filtreType &&
          !evt.typeEvts.nodes.some((t) => t.slug === filtreType)
        )
          return false;

        return true;
      }),
    [
      evenementsAVenir,
      filtreRapide,
      filtreRegion,
      filtreDiscipline,
      filtreType,
    ],
  );

  const selectClass =
    "text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black cursor-pointer";
  const actifCount = [
    filtreRegion,
    filtreDiscipline,
    filtreType,
    filtreRapide,
  ].filter(Boolean).length;

  const btnRapide = (valeur: FiltreRapide, label: string) => (
    <button
      onClick={() => setFiltreRapide((v) => (v === valeur ? "" : valeur))}
      className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
        filtreRapide === valeur
          ? "bg-black text-white border-black"
          : "border text-teal-100 bg-teal-600 hover:bg-teal-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <Helmet>
        <title>Agenda skate — Événements en France</title>
        <meta
          name="description"
          content="Retrouvez tous les événements skate à venir en France : contests, battles, sessions, initiations. Filtrez par région et discipline."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-teal-600">
            Agenda skate
          </h1>
          <p className="text-gray-500 mt-1">
            Les événements skate à venir partout en France
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-teal-600 rounded-xl">
          {/* Filtres rapides */}
          {btnRapide("weekend", "Ce week-end")}
          {btnRapide("mois", `En ${moisLabel}`)}

          <div className="w-px h-6 bg-gray-200 mx-1" />

          {/* Filtres taxonomie */}
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
            value={filtreDiscipline}
            onChange={(e) => setFiltreDiscipline(e.target.value)}
            className={selectClass}
          >
            <option value="">Toutes les disciplines</option>
            {disciplinesDisponibles.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={filtreType}
            onChange={(e) => setFiltreType(e.target.value)}
            className={selectClass}
          >
            <option value="">Tous les types</option>
            {typesDisponibles.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>

          {actifCount > 0 && (
            <button
              onClick={() => {
                setFiltreRegion("");
                setFiltreDiscipline("");
                setFiltreType("");
                setFiltreRapide("");
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
            Chargement des événements…
          </div>
        )}
        {isError && (
          <div className="text-red-500 py-10 text-center">
            Erreur de chargement des événements.
          </div>
        )}

        {/* Résultats */}
        {!isLoading && !isError && (
          <>
            <p className="text-sm text-gray-400 mb-4">
              {evenements.length} événement{evenements.length > 1 ? "s" : ""}
            </p>

            {evenements.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                Aucun événement à venir ne correspond à ces filtres.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {evenements.map((evt) => (
                  <CarteEvenement key={evt.id} evt={evt} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
