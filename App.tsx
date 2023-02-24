/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/index.js';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import ReservationContextProvider from './src/context/ReservationContext';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <ReservationContextProvider>
          <RootNavigator />
        </ReservationContextProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['onAnimatedValueUpdate']);
LogBox.ignoreLogs(['Warning: ']);
export default App;