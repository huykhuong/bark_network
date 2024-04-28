import type { FC, PropsWithChildren } from "react";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getCSRFToken } from "../utils/getCSRFToken";

const client = new ApolloClient({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRF-TOKEN": getCSRFToken(),
  },
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
