export interface Terme {
  name: string;
  slug: string;
}

export interface OrganisateurRef {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  infosOrganisateur?: {
    orgVille?: string;
    orgCodePostal?: string;
  };
}

export interface InfoEvenement {
  dateDeDebut: string;
  dateDeFin: string;
  lieu?: string;
  ville?: string;
  tarif?: number;
  payant?: string[];
  departement?: string[];
  description?: string;
  infosPratiques?: string[];
  infosComplementaires?: string;
  associationsOrganisatrices?: {
    nodes: OrganisateurRef[];
  };
}

export interface InfosOrganisateur {
  orgAdresse?: string;
  orgCodePostal?: string;
  orgDescription?: string;
  orgEmail?: string;
  orgInstagram?: string;
  orgSiteWeb?: string;
  orgTelephone?: string;
  orgVille?: string;
  orgStatut?: string[];
}

export interface Organisateur {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText?: string } };
  infosOrganisateur: InfosOrganisateur;
  regions: { nodes: Terme[] };
  structures: { nodes: Terme[] };
}

export interface Evenement {
  id: string;
  title: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  infoEvenement: InfoEvenement;
  disciplines: { nodes: Terme[] };
  typeEvts: { nodes: Terme[] };
  regions: { nodes: Terme[] };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}
