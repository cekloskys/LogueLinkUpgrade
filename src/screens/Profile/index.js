import { Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, DataStore } from 'aws-amplify';
import styles from './styles';
import { User } from '../../models';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const validator = require('validator');

const ProfileScreen = () => {
  const { dbUser } = useAuthContext();

  const [name, setName] = useState(dbUser?.name || "");
  const [eAddress, setEAddress] = useState(dbUser?.email || "");

  const { sub, setDBUser } = useAuthContext();

  const navigation = useNavigation();

  const onSave = async () => {
    if (!eAddress || !validator.isEmail(eAddress)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return;
    }
    if (!name) {
      Alert.alert('Validation Error', 'Please enter your fullname.')
    }

    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.navigate('Home');
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.name = name;
        updated.eAddress = eAddress;
      })
    );
    setDBUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(new User({
        name,
        email: eAddress,
        sub
      }));
      console.log(user);
      setDBUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={eAddress}
        onChangeText={setEAddress}
        placeholder="Email Address"
        style={styles.input}
      />
      <Pressable onPress={onSave} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable onPress={() => Auth.signOut()} style={styles.button}>
        <Text style={styles.buttonText}>SignOut</Text>
      </Pressable></SafeAreaView>
  );
}

export default ProfileScreen;