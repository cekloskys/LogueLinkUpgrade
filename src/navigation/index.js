import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HowToDetailScreen from '../screens/HowToDetail';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignIn';
import AdminScreen from '../screens/Admin';
import DeleteLinksScreen from '../screens/DeleteLinks';
import CreateLinkScreen from '../screens/CreateLink';
import { Feather, FontAwesome5, MaterialIcons } from 'react-native-vector-icons';
import HowToScreen from '../screens/HowTo';
import LinksScreen from '../screens/Links';
import BasicInfoScreen from '../screens/BasicInfo';
import RoomInfoScreen from '../screens/RoomInfo';

const Stack = createStackNavigator();

const RootNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
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

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {

    return (
        <Tab.Navigator barStyle={{ backgroundColor: 'white' }}>
            <Tab.Screen
                name="Links"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Tutorials"
                component={OrdersStackNavigator}
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Reservations"
                component={ReservationsStackNavigator}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Links" component={LinksScreen} />
        </HomeStack.Navigator>
    );
};

const OrdersStack = createStackNavigator();

const OrdersStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name="Tutorials" component={HowToScreen} />
            <OrdersStack.Screen name="Tutorial Details" component={HowToDetailScreen} />
        </OrdersStack.Navigator>
    );
};

const ReservationsStack = createStackNavigator();

const ReservationsStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name="Basic Information" component={BasicInfoScreen} />
            <OrdersStack.Screen name="Room Information" component={RoomInfoScreen} />
        </OrdersStack.Navigator>
    );
};

export default RootNavigator;