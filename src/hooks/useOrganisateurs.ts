import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import {
  GET_ORGANISATEURS,
  GET_ORGANISATEUR,
} from "../api/queries/organisateurs";
import type { Organisateur } from "../types";

export function useOrganisateurs() {
  return useQuery({
    queryKey: ["organisateurs"],
    queryFn: () =>
      client.request<{ organisateurs: { nodes: Organisateur[] } }>(
        GET_ORGANISATEURS,
      ),
    select: (data) => data.organisateurs.nodes,
  });
}

export function useOrganisateur(slug: string) {
  return useQuery({
    queryKey: ["organisateur", slug],
    queryFn: () =>
      client.request<{ organisateur: Organisateur }>(GET_ORGANISATEUR, {
        slug,
      }),
    select: (data) => data.organisateur,
    enabled: !!slug,
  });
}
