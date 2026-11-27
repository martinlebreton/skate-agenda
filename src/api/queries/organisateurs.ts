import { gql } from "graphql-request";

export const GET_ORGANISATEURS = gql`
  query GetOrganisateurs {
    organisateurs(first: 100) {
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
        infosOrganisateur {
          orgVille
          orgCodePostal
          orgDescription
          orgSiteWeb
          orgInstagram
          orgStatut
        }
        regions {
          nodes {
            name
            slug
          }
        }
        structures {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_ORGANISATEUR = gql`
  query GetOrganisateur($slug: ID!) {
    organisateur(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      infosOrganisateur {
        orgAdresse
        orgCodePostal
        orgVille
        orgDescription
        orgEmail
        orgTelephone
        orgSiteWeb
        orgInstagram
      }
      regions {
        nodes {
          name
          slug
        }
      }
      structures {
        nodes {
          name
          slug
        }
      }
    }
  }
`;
