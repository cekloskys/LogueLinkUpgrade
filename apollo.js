import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import 'localstorage-polyfill';

const URI = 'https://chcmobileapps.ddns.net';

const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          tutorials: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});