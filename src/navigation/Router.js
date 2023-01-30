import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HowToDetailScreen from '../screens/HowToDetail';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignIn';
import AdminScreen from '../screens/Admin';
import DeleteLinksScreen from '../screens/DeleteLinks';
import CreateLinkScreen from '../screens/CreateLink';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Get started!'} component={TabNavigator} />
        <Stack.Screen name={'How to'} component={HowToDetailScreen} />
        <Stack.Screen name={'Sign In'} component={SignInScreen} />
        <Stack.Screen
          name={'Admin'}
          component={AdminScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name={'Delete URL'} component={DeleteLinksScreen} />
        <Stack.Screen name={'Create URL'} component={CreateLinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;