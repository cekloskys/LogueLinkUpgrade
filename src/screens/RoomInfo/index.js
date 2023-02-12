import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';

const RoomInfoScreen = () => {
    const [roomname, setRoomName] = useState('');
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

    const onCreateRoomInfo = () => {

        if (!roomname) {
            Alert.alert('Validation Error','Please select a room.');
            return;
        }
        if (!blockselection) {
            Alert.alert('Validation Error','Please select a time block.');
            return;
        }
        if (!participants || parseInt(participants) > 20) {
            Alert.alert('Validation Error','Please enter number of participants (max 20).');
            return;
        }
        if (!Coursenumber) {
            Alert.alert('Validation Error','Please enter a course number.');
            return;
        }
        
        if (!teachername) {
            Alert.alert('Validation Error','Please enter a teacher name.');
            return;
        }

        Alert.alert('Success', 'Reservation created.');
        
    };

    return (
        <ScrollView style={styles.page}>
            <View>
                <SelectDropdown
                    data={rooms}
                    defaultButtonText={'Select a room'}
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
            <View>
                <SelectDropdown
                    data={hour_block}
                    defaultButtonText={'Select a block'}
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