import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { GET_EVENEMENTS, GET_EVENEMENT } from "../api/queries/evenements";
import type { Evenement, PageInfo } from "../types";

interface FiltresEvenements {
  discipline?: string; // slug de la taxonomie
  region?: string;
  typeEvt?: string;
}

export function useEvenements(filtres: FiltresEvenements = {}) {
  return useQuery({
    queryKey: ["evenements", filtres],
    queryFn: () =>
      client.request<{
        evenements: { nodes: Evenement[]; pageInfo: PageInfo };
      }>(GET_EVENEMENTS, { first: 50, ...filtres }),
    select: (data) => data.evenements,
  });
}

export function useEvenement(slug: string) {
  return useQuery({
    queryKey: ["evenement", slug],
    queryFn: () =>
      client.request<{ evenement: Evenement }>(GET_EVENEMENT, { slug }),
    select: (data) => data.evenement,
    enabled: !!slug,
  });
}
