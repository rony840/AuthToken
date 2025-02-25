/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client';
import { graphqlClient } from './src/services/ApolloClient';

function App(): React.JSX.Element {
  
  return (
    <SafeAreaView style={styles.container}>
      <ApolloProvider client={graphqlClient}>
      <Provider store={store}>
      <NavigationContainer>
      <AppNavigation/>
       </NavigationContainer>
      </Provider>
      </ApolloProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

export default App;
