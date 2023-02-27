import React, { useState, useEffect } from 'react';
import '@azure/core-asynciterator-polyfill';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Rooms, Blocks, Reservations } from '../../models';


const validator = require('validator');

const BasicInfoScreen = () => {

    const [studentname, setStudentName] = useState('');
    const [studentemail, setStudentEmail] = useState('');
    const [participants, setParticipants] = useState('');
    const [Coursenumber, setCourseNumber] = useState('');
    const [teachername, setTeacherName] = useState('');

    const [room, setRoom] = useState('');
    const [rooms, setRoomNames] = useState([]);
    const [displayRoom, setDisplayRoom] = useState([]);


    const [block, setBlock] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [displayBlock, setDisplayBlock] = useState([]);

    const navigation = useNavigation();

    //Room Select
    useEffect(() => {
        DataStore.query(Rooms).then(setRoomNames);
    }, []);

    useEffect(() => {
        if (!rooms) {
            return;
        }
        const dr = [];
        for (let i = 0; i < rooms.length; i++) {
            dr.push(rooms[i].room);
        }
        setDisplayRoom(dr);
    }, [rooms]);

    //Block Select
    useEffect(() => {
        DataStore.query(Blocks).then(setBlocks);
    }, []);

    useEffect(() => {
        if (!blocks) {

            return;
        }
        const db = [];
        for (let i = 0; i < blocks.length; i++) {
            db.push(blocks[i].hour);
        }
        setDisplayBlock(db);
    }, [blocks]);

    const onCreateInfo = () => {

        if (!studentname) {
            Alert.alert('Validation Error', 'Please your fullname. ');
            return;
        }
        if (!studentemail || !validator.isEmail(studentemail)) {
            Alert.alert('Validation Error', 'Please enter a valid email.');
            return;
        }
        if (!participants || parseInt(participants) > 20) {
            Alert.alert('Validation Error', 'Please enter number of participants (max 20).');
            return;
        }
        if (!Coursenumber) {
            Alert.alert('Validation Error', 'Please enter a course number.');
            return;
        }

        if (!teachername) {
            Alert.alert('Validation Error', 'Please enter a teacher name.');
            return;
        }
        if (!room) {
            Alert.alert('Validation Error', 'Please select a room.');
            return;
        }
        if (!block) {
            Alert.alert('Validation Error', 'Please select a time block.');
            return;
        }

        navigation.navigate('Room Information', {
            studentname: studentname,
            studentemail: studentemail,
            participants: participants,
            Coursenumber: Coursenumber,
            teachername: teachername,
            room: room,
            block: block,
        });

    };

    return (
        <ScrollView style={styles.page}>
            <TextInput
                style={styles.input}
                placeholder='Enter your fullname'
                value={studentname}
                keyboardType='name-phone-pad'
                onChangeText={setStudentName}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your email'
                value={studentemail}
                keyboardType='email-address'
                onChangeText={setStudentEmail}
            />
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Enter number of participants (max 20)'
                    value={participants}
                    onChangeText={setParticipants}
                    keyboardType={'number-pad'}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Enter a course number'
                    value={Coursenumber}
                    onChangeText={setCourseNumber}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter instructor's name"
                    value={teachername}
                    onChangeText={setTeacherName}
                />
            </View>
            <View>
                <SelectDropdown
                    data={displayRoom}
                    defaultButtonText={'Select a room'}
                    onSelect={(selectedItem, index) => {
                        setRoom(selectedItem);
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
                    data={displayBlock}
                    defaultButtonText={'Select a block'}
                    onSelect={(selectedItem, index) => {
                        setBlock(selectedItem);
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
                <Pressable style={styles.button} onPress={onCreateInfo}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default BasicInfoScreen;