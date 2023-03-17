import React, { useCallback, useState } from 'react';
import { FlatList, View, Text, Pressable, RefreshControl } from 'react-native';
import Reservation from '../../components/Reservation';
import '@azure/core-asynciterator-polyfill';
import { Reservations, User } from '../../models';
import { DataStore, Hub } from 'aws-amplify';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useReservationContext } from '../../context/ReservationContext';
import { useAuthContext } from '../../context/AuthContext';

const ReservationInfoScreen = props => {
    const navigation = useNavigation();
    const { reservations, setReservations } = useReservationContext();

    const { sub, setDBUser, dbUser } = useAuthContext();
    const [refreshing, setRefreshing] = useState(false);

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

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await DataStore.query(Reservations, r => r.userID.eq(dbUser?.id)).then(setReservations);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    }, [refreshing]);

    return (
        <View style={{backgroundColor: 'white', flex:1}}>
            <FlatList
                data={reservations}
                renderItem={({ item }) => <Reservation post={item} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListFooterComponent={() =>
                    <Pressable onPress={onPress} style={styles.button}>
                        <Text style={styles.buttonText}>Create Reservation</Text>
                    </Pressable>}
            />
        </View>
    );
};

export default ReservationInfoScreen;