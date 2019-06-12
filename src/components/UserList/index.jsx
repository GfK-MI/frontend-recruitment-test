import React from 'react';
import {Query} from 'react-apollo';

import {getUsersByQuery} from '../../graphql/queries';
import UserListItem from '../UserListItem';
import Style from './styles.scss';

export const QueryMessage = ({message}) => (
  <h2 className={Style.resultHeading}>{message}</h2>
);

const UserList = ({query}) => (
  <>
    <Query query={getUsersByQuery(query)}>
      {({loading, error, data, fetchMore}) => {
        if (loading) {
          return <QueryMessage message="fetching data..." />;
        }
        if (error) {
          return (
            <QueryMessage message="an error has occured while featching data" />
          );
        }
        if (data.search.userCount === 0) {
          return <QueryMessage message="no results" />;
        }

        return (
          <>
            <h1 className={Style.resultHeading}>
              showing results from: <span>"{query}"</span>
            </h1>
            <ul className={Style.resultList}>
              {data.search.edges.map(edge => {
                const {login, name, avatarUrl, contributionsCollection} = edge.node;
                /* eslint-disable no-ternary */
                return (
                  <UserListItem
                    key={login}
                    login={login}
                    name={name}
                    avatarUrl={avatarUrl}
                    contributions={contributionsCollection.hasAnyContributions ? contributionsCollection.commitContributionsByRepository : null}
                  />
                );
                /* eslint-enabled no-ternary */
              })}
            </ul>
            {data.search
              && data.search.pageInfo
              && data.search.pageInfo.hasNextPage && (
              <button
                onClick={() =>
                  fetchMore({
                    variables: {
                      after: data.search.pageInfo.endCursor
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }

                      return {
                        ...fetchMoreResult,
                        search: {
                          ...fetchMoreResult.search,
                          edges: [
                            ...prev.search.edges,
                            ...fetchMoreResult.search.edges
                          ]
                        }
                      };
                    }
                  })
                }
              >
                  Load More
              </button>
            )}
          </>
        );
      }}
    </Query>
  </>
);

export default UserList;
