import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = new HttpLink({uri: 'https://api.graph.cool/simple/v1/cjd4j66tf08bf01350iauv84s'});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
