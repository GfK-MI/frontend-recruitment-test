import gql from 'graphql-tag';

const getISODate = () => {
  const date = new Date();
  return date.toISOString();
};

export const getUsersByQuery = query => {
  const currentISODate = getISODate();
  return gql`
    query GetUsers($after: String) {
        search(query: ${query}, type: USER, first: 10, after: $after) {
            userCount
        pageInfo {
        hasNextPage
        endCursor
        }
        edges {
        cursor
        node {
            ... on User {
            name
            login
            avatarUrl
            contributionsCollection(to: "${currentISODate}") {
                startedAt
                endedAt
                hasAnyContributions
                hasActivityInThePast
                commitContributionsByRepository {
                contributions(first: 1, orderBy: {field: OCCURRED_AT, direction: DESC}) {
                    nodes {
                    occurredAt
                    commitCount
                    url
                    }
                }
            }
            }
            }
        }
        }
        }
  }
`;
};
