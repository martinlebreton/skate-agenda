import { useEvenements } from "./useEvenements";
import type { Evenement } from "../types";

export function useEvenementsOrganisateur(databaseId: number) {
  const { data, isLoading, isError } = useEvenements();

  // DEBUG — à supprimer après
  console.log("databaseId recherché:", databaseId);
  console.log(
    "tous les événements:",
    data?.nodes?.map((evt) => ({
      title: evt.title,
      orgs: evt.infoEvenement.associationsOrganisatrices?.nodes,
    })),
  );

  const tous = (data?.nodes ?? []).filter((evt) =>
    evt.infoEvenement.associationsOrganisatrices?.nodes.some(
      (org) => org.databaseId === databaseId,
    ),
  );

  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);

  const aVenir = tous
    .filter((evt) => {
      const dateFin =
        evt.infoEvenement.dateDeFin || evt.infoEvenement.dateDeDebut;
      return new Date(dateFin) >= aujourdhui;
    })
    .sort(
      (a, b) =>
        new Date(a.infoEvenement.dateDeDebut).getTime() -
        new Date(b.infoEvenement.dateDeDebut).getTime(),
    );

  const archives = tous
    .filter((evt) => {
      const dateFin =
        evt.infoEvenement.dateDeFin || evt.infoEvenement.dateDeDebut;
      return new Date(dateFin) < aujourdhui;
    })
    .sort(
      (a, b) =>
        new Date(b.infoEvenement.dateDeDebut).getTime() -
        new Date(a.infoEvenement.dateDeDebut).getTime(),
    );

  return { aVenir, archives, isLoading, isError };
}
