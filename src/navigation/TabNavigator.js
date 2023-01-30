import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HowToScreen from '../screens/HowTo';
import LinksScreen from '../screens/Links';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f15454',
        indicatorStyle: {
          backgroundColor: '#f15454',
        },
      }}>
      <Tab.Screen name={'Tutorials'} component={HowToScreen} />
      <Tab.Screen name={'Links'} component={LinksScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;