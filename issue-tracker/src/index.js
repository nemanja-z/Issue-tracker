import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';
import 'bootstrap/dist/css/bootstrap.min.css';


let token;
const withToken=setContext(({_,headers})=>{
  token = localStorage.getItem('auth');
  return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null
        }
    }
});

const resetToken=onError(({networkError})=>{
  if(
    networkError&&
    networkError.name==='ServerError' &&
    networkError.statusCode === 401
  ){
    token = null;
  }
});
const authFlowLink = withToken.concat(resetToken);
const httpLink=createUploadLink({uri:'http://localhost:4000/graphql'});
const client=new ApolloClient({
  link:authFlowLink.concat(httpLink),
  cache:new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);