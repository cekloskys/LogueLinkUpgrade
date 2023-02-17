import React, { useState, useEffect } from 'react';
import '@azure/core-asynciterator-polyfill';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Times , Dates } from '../../models';

const validator = require('validator');

const BasicInfoScreen = () => {

    const [studentname, setStudentName] = useState('');
    const [studentemail, setStudentEmail] = useState('');

    const [date, setDate] = useState('');
    const [dates, setDates] = useState([]);
    const [displayDates, setDisplayDates] = useState([]);

    const [time, setTime] = useState('');
    const [times, setTimes] = useState([]);
    const [displayTimes, setDisplayTimes] = useState([]);

    const navigation = useNavigation();

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

    const onCreateInfo = () => {

        if (!studentname) {
            Alert.alert('Validation Error', 'Please your fullname. ');
            return;
        }
        if (!studentemail || !validator.isEmail(studentemail)) {
            Alert.alert('Validation Error', 'Please enter a valid email.');
            return;
        }
        if (!date) {
            Alert.alert('Validation Error', 'Please select a date');
            return;
        }
        if (!time) {
            Alert.alert('Validation Error', 'Please select a start time');
            return;
        }
        navigation.navigate('Room Information');

    };

    return (
        <ScrollView style={styles.page}>
            <TextInput
                style={styles.input}
                placeholder='Enter your fullname'
                value={studentname}
                keyboardType='name-phone-pad'
                onChangeText={(text) => {
                    setStudentName(text);
                }}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your email'
                value={studentemail}
                keyboardType='email-address'
                onChangeText={setStudentEmail}
            />
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
            <View style={styles.bottom}>
                <Pressable style={styles.button} onPress={onCreateInfo}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default BasicInfoScreen;