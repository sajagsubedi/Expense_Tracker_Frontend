import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {BrowserRouter} from "react-router-dom" 
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const client = new ApolloClient({
	uri:"http://localhost:5000/graphql", 
	cache: new InMemoryCache(),
	credentials: "include",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
        <ToastContainer
            position="top-left"
            theme="dark"
            autoClose={3000}
            style={{ width: "230px" }}
          />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
