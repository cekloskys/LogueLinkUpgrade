import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable } from 'react-native';
import Reservation from '../../components/Reservation';
import '@azure/core-asynciterator-polyfill';
import { Reservations, User } from '../../models';
import { DataStore } from 'aws-amplify';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useReservationContext } from '../../context/ReservationContext';
import { useAuthContext } from '../../context/AuthContext';

const ReservationInfoScreen = props => {
    const navigation = useNavigation();
    const { reservations, setReservations } = useReservationContext();

    const { sub, setDBUser, dbUser } = useAuthContext();

    const onPress = () => {
        //DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
            //setDBUser(users[0]));
        if (!dbUser) {
            alert('You must create a profile before creating a reservation.')
            navigation.navigate("Profile")
        } else {
            navigation.navigate("Basic Information")
        }

    };

    return (
        <View>
            <FlatList
                data={reservations}
                renderItem={({ item }) => <Reservation post={item} />}
                ListFooterComponent={() =>
                    <Pressable onPress={onPress} style={styles.button}>
                        <Text style={styles.buttonText}>Create Reservation</Text>
                    </Pressable>}
            />
        </View>
    );
};

export default ReservationInfoScreen;