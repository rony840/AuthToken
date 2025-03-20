import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Platform } from 'react-native';

const graphqlServer = () => {
  if (Platform.OS === 'ios') {
    // For iOS Simulator
    return 'http://localhost:4000/api';
  } else if (Platform.OS === 'android') {
    // For Android Emulator
    return 'http://10.0.2.2:4000/api';
  }
};


export const graphqlClient = new ApolloClient({
  uri: graphqlServer(),
  cache: new InMemoryCache(),
});
