import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HowToDetailScreen from '../screens/HowToDetail';
import HomeScreen from '../screens/Home';
import SignInScreen from '../screens/SignIn';
import AdminScreen from '../screens/Admin';
import DeleteLinksScreen from '../screens/DeleteLinks';
import CreateLinkScreen from '../screens/CreateLink';
import { Feather, FontAwesome5, MaterialIcons } from 'react-native-vector-icons';
import Entypo from 'react-native-vector-icons/Entypo';
import HowToScreen from '../screens/HowTo';
import LinksScreen from '../screens/Links';
import BasicInfoScreen from '../screens/BasicInfo';
import RoomInfoScreen from '../screens/RoomInfo';

const Stack = createStackNavigator();

const RootNavigator = () => {

    return (

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
                    tabBarIcon: ({color}) => (<Entypo name="link" color={color} size={25}/>),
                }}
            />
            <Tab.Screen
                name="Tutorials"
                component={OrdersStackNavigator}
                options={{
                    tabBarIcon: ({color}) => (<Entypo name="book" color={color} size={25}/>),
                }}
            />
            <Tab.Screen
                name="Reservations"
                component={ReservationsStackNavigator}
                options={{
                    tabBarIcon: ({color}) => (<Entypo name="calendar" color={color} size={25}/>),
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
            <HomeStack.Screen name="View Links" component={LinksScreen} />
        </HomeStack.Navigator>
    );
};

const OrdersStack = createStackNavigator();

const OrdersStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name="View Tutorials" component={HowToScreen} />
            <OrdersStack.Screen name="Tutorial Details" component={HowToDetailScreen} />
        </OrdersStack.Navigator>
    );
};

const ReservationsStack = createStackNavigator();

const ReservationsStackNavigator = () => {
    return (
        <ReservationsStack.Navigator>
            <ReservationsStack.Screen name="Basic Information" component={BasicInfoScreen} />
            <ReservationsStack.Screen name="Room Information" component={RoomInfoScreen} />
        </ReservationsStack.Navigator>
    );
};

export default RootNavigator;