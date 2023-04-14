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
import AuthContextProvider from './src/context/AuthContext';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import { DefaultTheme, Provider } from 'react-native-paper';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
  return (
    <Provider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AuthContextProvider>
            <ReservationContextProvider>
              <RootNavigator />
            </ReservationContextProvider>
          </AuthContextProvider>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
  },
};

const signUpConfig = {
  header: "Sign up for Logue Link",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 1,
      type: "string",
      placeholder: "Enter username (must be valid CHC email)",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
      placeholder: "Enter password",
    },
  ],
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#CFD2CF',
    borderRadius: 5,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#CFD2CF',
    borderRadius: 5,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: '#EB1D36',
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: '#EB1D36',
  },
  input: {
    ...AmplifyTheme.input,
    borderRadius: 5,
    borderColor: '#CFD2CF',
  },
  section: {
    ...AmplifyTheme.section,
    paddingHorizontal: 10,
  },
  sectionScroll: {
    ...AmplifyTheme.sectionScroll,
    paddingHorizontal: 10,
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    color: 'white',
    fontWeight: '400',
  },
}

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['onAnimatedValueUpdate']);
LogBox.ignoreLogs(['Warning: ']);

export default withAuthenticator(App, { signUpConfig, theme: customTheme });