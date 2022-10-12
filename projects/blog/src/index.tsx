import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { createRoot } from "react-dom/client";

import App from "./app";

import "reset-css";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "https://api.napochaan.me/graphql",
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("app")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
