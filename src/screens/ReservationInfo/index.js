import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable } from 'react-native';
import Reservation from '../../components/Reservation';
import '@azure/core-asynciterator-polyfill';
import { Reservations } from '../../models';
import { DataStore } from 'aws-amplify';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';



const ReservationInfoScreen = props => {
    const navigation = useNavigation();
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        const results = await DataStore.query(Reservations);
        setReservations(results);
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <View>
            <FlatList
                data={reservations}
                renderItem={({ item }) => <Reservation post={item} />}
                ListFooterComponent={() =>
                    <Pressable onPress={() => navigation.navigate("Basic Information")} style={styles.button}>
                        <Text style={styles.buttonText}>Create Reservation</Text>
                    </Pressable>}
            />
        </View>
    );
};

export default ReservationInfoScreen;