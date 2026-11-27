import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { GET_TAXONOMIES } from "../api/queries/evenements";
import type { Terme } from "../types";

interface Taxonomies {
  disciplines: { nodes: Terme[] };
  regions: { nodes: Terme[] };
  typeEvts: { nodes: Terme[] };
}

export function useTaxonomies() {
  return useQuery({
    queryKey: ["taxonomies"],
    queryFn: () => client.request<Taxonomies>(GET_TAXONOMIES),
    staleTime: 1000 * 60 * 30, // 30 min — les taxonomies changent peu
  });
}
