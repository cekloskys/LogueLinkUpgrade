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
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/index.js';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['onAnimatedValueUpdate']);
LogBox.ignoreLogs(['Warning: ']);
export default App;