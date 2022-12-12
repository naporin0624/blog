import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-flowder";

import App from "./app";

import "reset-css";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

const entrypoint = document.getElementById("app");
if (!entrypoint) throw new Error("");

createRoot(entrypoint).render(
  <Provider>
    <ApolloProvider client={client}>
      <Suspense>
        <App />
      </Suspense>
    </ApolloProvider>
  </Provider>
);
