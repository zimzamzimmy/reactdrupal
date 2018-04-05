import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

const client = new ApolloClient({
    link: new HttpLink({ uri: "http://bwarch.dd:8083/graphql" }),
    cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
