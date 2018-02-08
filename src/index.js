import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({uri: 'https://api.graph.cool/simple/v1/cjd4j66tf08bf01350iauv84s'});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App client={client}/>
  </ApolloProvider>
  , document.getElementById('root')
);
