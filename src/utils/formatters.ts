export const INFOS_LABELS: Record<string, string> = {
  bar: "Bar",
  restauration: "Restauration",
  parking: "Parking",
  sanitaires: "Sanitaires",
  stand: "Stand",
  concert: "Concert",
};

export function formatTarif(payant?: string[], tarif?: number): string {
  const estGratuit = payant?.includes("Gratuit");
  if (estGratuit) return "Gratuit";
  if (tarif) return `À partir de ${tarif} €`;
  return "Payant";
}

export function formatLocalisation(
  lieu?: string,
  ville?: string,
  departement?: string[],
): string {
  const dep = departement?.[0];
  const villeAvecDep = ville && dep ? `${ville} (${dep})` : ville;
  return [lieu, villeAvecDep].filter(Boolean).join(" — ");
}

export function formatDate(iso: string, avecHeure = false): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(avecHeure && { hour: "2-digit", minute: "2-digit" }),
  });
}

export function formatPeriode(dateDebut: string, dateFin?: string): string {
  const debut = new Date(dateDebut);
  const fin = dateFin ? new Date(dateFin) : null;

  // Même jour ou pas de date de fin
  if (
    !fin ||
    (debut.getDate() === fin.getDate() &&
      debut.getMonth() === fin.getMonth() &&
      debut.getFullYear() === fin.getFullYear())
  ) {
    return debut.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Même mois et même année → "14 au 16 juin 2026"
  if (
    debut.getMonth() === fin.getMonth() &&
    debut.getFullYear() === fin.getFullYear()
  ) {
    return `${debut.getDate()} au ${fin.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;
  }

  // Mois différents → "28 juin au 2 juillet 2026"
  return `${debut.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  })} au ${fin.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

export function formatMetaDescription(
  texte?: string,
  fallback?: string,
  maxLength = 140,
): string {
  // Utilise le texte fourni ou le fallback
  const source = texte || fallback || "";

  // Supprime les balises HTML
  const sansHtml = source
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!sansHtml) return "";

  // Tronque proprement sans couper un mot au milieu
  if (sansHtml.length <= maxLength) return sansHtml;

  const tronque = sansHtml.substring(0, maxLength);
  const dernierEspace = tronque.lastIndexOf(" ");
  return tronque.substring(0, dernierEspace) + "…";
}

export function getMoisCourant(): string {
  return new Date().toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

export function getProchainWeekend(): { debut: Date; fin: Date } {
  const now = new Date();
  const jour = now.getDay(); // 0=dim, 1=lun, ... 6=sam

  // Calcule le prochain samedi
  let joursSamedi: number;
  if (jour === 0)
    joursSamedi = 6; // dimanche → samedi prochain dans 6 jours
  else if (jour === 6)
    joursSamedi = 0; // samedi → aujourd'hui
  else joursSamedi = 6 - jour; // lundi→5, mardi→4, etc.

  const samedi = new Date(now);
  samedi.setDate(now.getDate() + joursSamedi);
  samedi.setHours(0, 0, 0, 0);

  const dimanche = new Date(samedi);
  dimanche.setDate(samedi.getDate() + 1);
  dimanche.setHours(23, 59, 59, 999);

  return { debut: samedi, fin: dimanche };
}

export function isWeekend(dateDebut: string, dateFin?: string): boolean {
  const { debut: samedi, fin: dimanche } = getProchainWeekend();

  const evtDebut = new Date(dateDebut);
  const evtFin = dateFin ? new Date(dateFin) : new Date(dateDebut);
  evtFin.setHours(23, 59, 59, 999);

  // L'événement chevauche le prochain week-end
  return evtDebut <= dimanche && evtFin >= samedi;
}

export function isMoisCourant(dateDebut: string, dateFin?: string): boolean {
  const now = new Date();
  const debut = new Date(dateDebut);
  const fin = dateFin ? new Date(dateFin) : debut;

  const moisNow = now.getFullYear() * 12 + now.getMonth();

  // L'événement est dans le mois courant si au moins un de ses jours y est
  const moisDebut = debut.getFullYear() * 12 + debut.getMonth();
  const moisFin = fin.getFullYear() * 12 + fin.getMonth();

  return moisNow >= moisDebut && moisNow <= moisFin;
}
