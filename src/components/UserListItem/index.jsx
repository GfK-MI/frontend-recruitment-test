import React from 'react';

import Styles from './styles.scss';

const UserListItem = ({name, login, avatarUrl, contributions}) => {
  return (
    <li className={Styles.listItem}>
      <div className={Styles.userInformation}>
        <div
          className={Styles.avatarContainer}
          style={{backgroundImage: `url(${avatarUrl})`}}
        />
        <div className={Styles.userData}>
          <div>
            <span>Name:</span> {name}
          </div>
          <div>
            <span>Login:</span> {login}
          </div>
        </div>
      </div>
      {contributions && (
        <ul className={Styles.contributionsList}>
          {contributions.map(contribution => {
            return contribution.contributions.nodes.map(contributionNode => {
              return (
                <li key={contributionNode.occurredAt}>
                  <a href={contributionNode.url} target="_blank">
                    <span className={Styles.contributionDate}>{new Date(contributionNode.occurredAt).toUTCString()}:{' '}</span>
                    <span>{contributionNode.commitCount}{' '}commit(s)</span>
                  </a>
                </li>
              );
            });
          })}
        </ul>
      )}
    </li>
  );
};

export default UserListItem;
