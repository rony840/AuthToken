import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";


export const graphqlClient = new ApolloClient({
  uri: "http://10.0.2.2:4000/",
  cache: new InMemoryCache(),
});
