import ApolloClient from 'apollo-boost';
const accessToken = process.env.PERSONAL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

export default client;
