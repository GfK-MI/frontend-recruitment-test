import React from 'react';
import axios from 'axios';
import Style from './App.scss';

const TOKEN = '183dd133a637a61fc15d4cc034dd76ba3f261984';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      TOKEN
    }`
  }
});

const GET_ORGANIZATION = `
  query SearchTop100Users($searchString: String!) {
    search(query: $searchString, type: USER, first: 100) {
      nodes {
        __typename
        ... on User{
          login
          avatarUrl
        }
      }
    }
  }
`;

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [],
      olduser: this.props.username
    };
    this.onFetchFromGitHub = this.onFetchFromGitHub.bind(this);
  }

  onFetchFromGitHub() {
    axiosGitHubGraphQL.post('', {
      query: GET_ORGANIZATION,
      variables:{
        searchString: this.props.username
      }
    }).then(result =>
      this.setState({
        matchedUsers: result.data.data.search.nodes.filter(user => user.login.toLowerCase().includes(this.props.username)),
        olduser: this.props.username
      })
    );
  }

  componentDidUpdate() {
    if (this.state.olduser !== this.props.username) {
      this.onFetchFromGitHub();
    }
  }

  render() {
    return (
      <>
        {
          this.state.matchedUsers.map(user => {
            return (
              <div className={Style.something}>
                <img src={user.avatarUrl} height="30" width="30"/> {user.login}
              </div>
            );
          })
        }
      </>
    );
  }
}

export default Friends;