import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import '@azure/core-asynciterator-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
// import { DataStore } from '@aws-amplify/datastore';
import { Reservations, Times, Dates } from '../../models';
import { useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

const RoomInfoScreen = () => {
    const navigation = useNavigation();

    const [date, setDate] = useState('');
    const [dates, setDates] = useState([]);
    const [displayDates, setDisplayDates] = useState([]);

    const [time, setTime] = useState('');
    const [times, setTimes] = useState([]);
    const [displayTimes, setDisplayTimes] = useState([]);
    const route = useRoute();

    const studentname = route.params?.studentname;
    console.log(studentname);
    const studentemail = route.params?.studentemail;
    console.log(studentemail);
    const participants = route.params?.participants;
    console.log(participants);
    const Coursenumber = route.params?.Coursenumber;
    console.log(Coursenumber);
    const teachername = route.params?.teachername;
    console.log(teachername);
    const room = route.params?.room;
    console.log(room);
    const block = route.params?.block;
    console.log(block);


    //Times Select
    useEffect(() => {
        DataStore.query(Times).then(setTimes);
    }, []);

    useEffect(() => {
        if (!times) {
            return;
        }
        const dt = [];
        for (let i = 0; i < times.length; i++) {
            dt.push(times[i].time);
        }
        setDisplayTimes(dt);
    }, [times]);
    console.log(displayTimes);

    // Dates select
    useEffect(() => {
        DataStore.query(Dates).then(setDates);
    }, []);

    useEffect(() => {
        if (!dates) {
            return;
        }
        const dd = [];
        for (let i = 0; i < dates.length; i++) {
            dd.push(dates[i].date);
        }
        setDisplayDates(dd);
    }, [dates]);
    console.log(displayDates);



    const onCreateRoomInfo = async () => {

        if (!date) {
            Alert.alert('Validation Error', 'Please select a date');
            return;
        }
        if (!time) {
            Alert.alert('Validation Error', 'Please select a start time');
            return;
        }

        const check = await DataStore.query(Reservations,
            (r) => r.and(r => [
                r.date.eq(date),
                r.startTime.eq(time),
                r.room.eq(room)
            ])
        );
        if (check.length != 0) {
            Alert.alert('Validation Error', room + ' is already reserved on ' + date + ' at ' + time + '.');
            return;
        }

        const reservation = await DataStore.save(new Reservations({
            studentName: studentname,
            studentEmail: studentemail,
            date,
            startTime: time,
            room,
            hrBlock: parseInt(block),
            nbrParticipants: parseInt(participants),
            course: Coursenumber,
            teacher: teachername,
        }));

        Alert.alert('Success', 'Reservation created.');
        navigation.navigate("Reservation Information");
    };

    return (
        <ScrollView style={styles.page}>

            <View>
                <SelectDropdown
                    data={displayDates}
                    defaultButtonText={'Select a date'}
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
                    defaultButtonText={'Select a start time'}
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
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>

    );
};

export default RoomInfoScreen;