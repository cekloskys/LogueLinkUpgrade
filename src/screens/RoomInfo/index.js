import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import '@azure/core-asynciterator-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
import { Reservations, Times, Dates } from '../../models';
import { useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { useReservationContext } from '../../context/ReservationContext';
import { useAuthContext } from '../../context/AuthContext';

const RoomInfoScreen = () => {
    const navigation = useNavigation();
    const { reservations, setReservations } = useReservationContext();
    const { sub, setDBUser, dbUser } = useAuthContext();

    const [date, setDate] = useState('');
    const [dates, setDates] = useState([]);
    const [displayDates, setDisplayDates] = useState([]);

    const [time, setTime] = useState('');
    const [times, setTimes] = useState([]);
    const [displayTimes, setDisplayTimes] = useState([]);
    const route = useRoute();

    const studentname = route.params?.studentname;

    const studentemail = route.params?.studentemail;
    const participants = route.params?.participants;
    const Coursenumber = route.params?.Coursenumber;
    const teachername = route.params?.teachername;
    const room = route.params?.room;
    const block = route.params?.block;

    //Times Select
    useEffect(() => {
        DataStore.query(Times).then(setTimes);
    }, []);

    useEffect(() => {
        if (!times) {
            return;
        }

        times.sort((a, b) => (a.time > b.time) ? 1 : -1)
        const dt = [];
        for (let i = 0; i < times.length; i++) {
            var hours = parseInt(times[i].time.substring(0, 2));
            var suffix = hours < 12 ? " AM" : " PM";
            hours = ((hours + 11) % 12 + 1);
            //hours = ((hours + 11) % 12 + 1) + ':00' + suffix;
            if (hours == 8 || hours == 9 || hours >= 1 && hours <= 4) {
                hours = '0' + hours + ':00' + suffix;
            } else {
                hours = hours + ':00' + suffix;
            }
            //dt.push(times[i].time);
            dt.push(hours.toString());
        }
        //dt.sort(); 
        console.log(dt);
        setDisplayTimes(dt);
    }, [times]);

    // Dates select
    useEffect(() => {
        DataStore.query(Dates).then(setDates);
    }, []);

    useEffect(() => {
        if (!dates) {
            return;
        }
        const today = new Date(Date.now());
        const dd = [];
        console.log(dates)
        let arr = [];
        for (let i = 0; i < dates.length; i++) {
            arr = dates[i].date.split("/");
            console.log(arr);
            if (new Date(arr[2], arr[0] - 1, arr[1]) >= today) {
                dd.push(dates[i].date);
            }

        }
        dd.sort();
        setDisplayDates(dd);
    }, [dates]);

    const onCreateRoomInfo = async () => {

        if (!date) {
            Alert.alert('Validation Error', 'Please select a date.');
            return;
        }
        if (!time) {
            Alert.alert('Validation Error', 'Please select a start time.');
            return;
        }

        const check = await DataStore.query(Reservations,
            (r) => r.and(r => [
                r.date.eq(date),
                r.startTime.le(time),
                r.endTime.gt(time),
                r.room.eq(room)
            ])
        );
        if (check.length != 0) {
            Alert.alert('Validation Error', room + ' is already reserved on ' + date + ' at ' + time + '.');
            return;
        }
        var hours = parseInt(time.substring(0, 2));
        console.log(hours);
        if (hours == 12) {
            hours = parseInt(block);
        } else if (hours == 11 && block == 2) {
            hours = 1;
        }
        else {
            hours = hours + parseInt(block);
        }

        console.log(hours);
        var suffix = hours < 12 && hours >= 8 ? " AM" : " PM";
        console.log(suffix);
        if (hours < 10) {
            hours = '0' + hours
        }
        hours = hours + ':00' + suffix;
        console.log(hours);

        const reservation = await DataStore.save(new Reservations({
            studentName: studentname,
            studentEmai: studentemail,
            date,
            startTime: time,
            room,
            hrBlock: parseInt(block),
            nbrParticipants: parseInt(participants),
            course: Coursenumber,
            teacher: teachername,
            userID: dbUser.id,
            endTime: hours,
        }));

        Alert.alert('Success', 'Reservation created.');
        navigation.navigate("Reservation Information");

    };

    return (
        <ScrollView style={styles.page}>

            <View>
                <SelectDropdown
                    data={displayDates}
                    defaultButtonText={'SELECT A DATE'}
                    onSelect={(selectedItem, index) => {
                        setDate(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                />
                <SelectDropdown
                    data={displayTimes}
                    defaultButtonText={'SELECT A START TIME'}
                    onSelect={(selectedItem, index) => {
                        setTime(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                />

            </View>
            <View style={styles.bottom}>
                <Pressable style={styles.button} onPress={onCreateRoomInfo}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </Pressable>
            </View>
        </ScrollView>

    );
};

export default RoomInfoScreen;