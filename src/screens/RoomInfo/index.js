import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';


const RoomInfoScreen = () => {
    const [roomname, setRoomName] = useState('');
    const [roomnumber, setRoomNumber] = useState('');
    const [participants, setParticipants] = useState('');
    const [blockselection, setBlockSelection] = useState('');
    const [Coursenumber, setCourseNumber] = useState('');
    const [teachername, setTeacherName] = useState('');

    const rooms = [
        'LL 301',
        'LL 201',
        'LL 101',
    ];

    const hour_block = [
        '1 Hour',
        '2 Hours',
    ];
    return (
        <ScrollView style={styles.page}>
            <View style={styles.row}>
                <SelectDropdown
                    data={rooms}
                    defaultButtonText={'Select A Room'}
                    onSelect={(selectedItem, index) => {
                        setRoomName(selectedItem);
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
            
            <View style={styles.row}>
                <SelectDropdown
                    data={hour_block}
                    defaultButtonText={'Select A Hour Block'}
                    onSelect={(selectedItem, index) => {
                        setBlockSelection(selectedItem);
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
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter a course number'
                    value={Coursenumber}
                    onChangeText={setCourseNumber}
                />
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter a Teachers Name'
                    value={teachername}
                    onChangeText={setTeacherName}
                />
            </View>
            <View style={styles.bottom}>
                <Pressable style={styles.button} onPress={console.warn('Reservation created')}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>

    );
};

export default RoomInfoScreen;