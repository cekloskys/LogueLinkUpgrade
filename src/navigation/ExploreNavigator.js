import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Get started!'} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Router;