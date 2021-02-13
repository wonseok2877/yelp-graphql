import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo";
import App from "./App";
const httpLink = new createHttpLink({
  uri: "http://localhost:4001/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>
);
