import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import '@azure/core-asynciterator-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
// import { DataStore } from '@aws-amplify/datastore';
import { Rooms, Blocks, Reservations } from '../../models';
import { useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';

const RoomInfoScreen = () => {
    const [room, setRoom] = useState('');
    const [rooms, setRoomNames] = useState([]);
    const [displayRoom, setDisplayRoom] = useState([]);

    const [participants, setParticipants] = useState('');

    const [block, setBlock] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [displayBlock, setDisplayBlock] = useState([]);

    const [Coursenumber, setCourseNumber] = useState('');
    const [teachername, setTeacherName] = useState('');
    const route = useRoute();

    const studentname = route.params?.studentname;
    console.log(studentname);
    const studentemail = route.params?.studentemail;
    console.log(studentemail);
    const date = route.params?.date;
    console.log(date);
    const time = route.params?.time;
    console.log(time);

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
    console.log(displayRoom);

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
    console.log(displayBlock);


    const onCreateRoomInfo = async () => {

        if (!room) {
            Alert.alert('Validation Error', 'Please select a room.');
            return;
        }
        if (!block) {
            Alert.alert('Validation Error', 'Please select a time block.');
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
        console.log(reservation);
        Alert.alert('Success', 'Reservation created.');

    };

    return (
        <ScrollView style={styles.page}>
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
            </View>
            <View>
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
            <View style={styles.bottom}>
                <Pressable style={styles.button} onPress={onCreateRoomInfo}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>

    );
};

export default RoomInfoScreen;