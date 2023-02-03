
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const BasicInfoScreen = () => {

    const [studentname, setStudentName] = useState('');
    const [studentemail, setStudentEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const navigation = useNavigation(); 

    const times = [
        '8:00am - 11:00am',
        '12:30pm - 4:00pm'
    ];

    const dates = [
        '2/3/2023',
        '2/4/2023',
        '2/6/2023',
        '2/8/2023',
        '2/10/2023',

    ];

    return (
        <ScrollView style={styles.page}>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Student Name'
                    value={studentname}
                    onChangeText={(text) => {
                        setStudentName(text);
                    }}
                />
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Student Email'
                    value={studentemail}
                    onChangeText={setStudentEmail}
                />
            </View>
            <View style={styles.row}>
                <SelectDropdown
                    data={dates}
                    defaultButtonText={'Select date'}
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
            </View>
            <View style={styles.row}>
                <SelectDropdown
                    data={times}
                    defaultButtonText={'Select time'}
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
                <Pressable style={styles.button} onPress={navigation.navigate('Room Information')}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default BasicInfoScreen;