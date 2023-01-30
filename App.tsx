/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import Router from './src/navigation/Router';
import {LogBox} from 'react-native';
import {client} from './apollo';
import {ApolloProvider} from '@apollo/client';
import StatusBar from 'react-native/Libraries/Components/StatusBar/StatusBar';
StatusBar.setBarStyle('dark-content', true);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['onAnimatedValueUpdate']);
LogBox.ignoreLogs(['Warning: ']);
export default App;