import { gql } from "graphql-request";

export const GET_EVENEMENTS = gql`
  query GetEvenements($first: Int = 50, $after: String) {
    evenements(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        infoEvenement {
          dateDeDebut
          dateDeFin
          lieu
          ville
          departement
          payant
          tarif
          infosPratiques
          associationsOrganisatrices {
            nodes {
              ... on Organisateur {
                id
                databaseId
                title
                slug
              }
            }
          }
        }
        disciplines {
          nodes {
            name
            slug
          }
        }
        typeEvts {
          nodes {
            name
            slug
          }
        }
        regions {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_EVENEMENT = gql`
  query GetEvenement($slug: ID!) {
    evenement(id: $slug, idType: SLUG) {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      infoEvenement {
        dateDeDebut
        dateDeFin
        lieu
        ville
        departement
        payant
        tarif
        description
        infosPratiques
        infosComplementaires
        associationsOrganisatrices {
          nodes {
            ... on Organisateur {
              id
              databaseId
              title
              slug
              infosOrganisateur {
                orgVille
                orgCodePostal
              }
            }
          }
        }
      }
      disciplines {
        nodes {
          name
          slug
        }
      }
      typeEvts {
        nodes {
          name
          slug
        }
      }
      regions {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_TAXONOMIES = gql`
  query GetTaxonomies {
    disciplines(first: 20) {
      nodes {
        name
        slug
      }
    }
    regions(first: 20) {
      nodes {
        name
        slug
      }
    }
    typeEvts(first: 20) {
      nodes {
        name
        slug
      }
    }
  }
`;
