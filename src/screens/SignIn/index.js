import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation, gql} from '@apollo/client';
import 'localstorage-polyfill';
import Entypo from 'react-native-vector-icons/Entypo';

const SIGN_IN = gql`
  mutation signInLink($signInLinkId: String, $pass: String) {
    signInLink(id: $signInLinkId, pass: $pass) {
      user {
        id
        name
      }
      token
    }
  }
`;

const SignInScreen = () => {
  const [id, setUserID] = useState('');
  const [pass, setPassword] = useState('');

  const [securityTextEntry, setSecurityTextEntry] = useState(true);
  const onIconPress = () => {
    setSecurityTextEntry(!securityTextEntry);
  };

  const navigation = useNavigation();

  const [signIn, {data, error, loading}] = useMutation(SIGN_IN);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Invalid credentials, try again', error.message);
    }
  }, [error]);

  useEffect(() => {
    let unmounted = false;

    if (data) {
      if (!unmounted) {
        localStorage.setItem('token', data.signInLink.token);
        localStorage.setItem('Name', data.signInLink.user.name);
        navigation.navigate('Admin');
      }
    }
    return () => {
      unmounted = true;
    };
  }, [data, navigation]);

  const onSubmit = async () => {
    if (!id || !pass) {
      Alert.alert('Invalid Input', 'User ID and Password are required!');
      return;
    }
    const input = {
      id,
      pass,
    };
    await signIn({variables: {signInLinkId: id, pass: pass}}).catch(error =>
      console.log(error),
    );
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Enter User ID"
        placeholderTextColor="grey"
        value={id}
        autoCapitalize="none"
        onChangeText={setUserID}
        style={{
          color: 'black',
          fontSize: 16,
          width: '100%',
          marginVertical: 15,
          borderColor: 'lightgrey',
          borderBottomWidth: 1.0,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          borderBottomWidth: 1.0,
          borderColor: 'lightgrey',
          marginVertical: 15,
        }}>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="grey"
          value={pass}
          autoCapitalize="none"
          onChangeText={setPassword}
          secureTextEntry={securityTextEntry}
          style={{
            color: 'black',
            fontSize: 16,
            width: '100%',
            flex: 1,
          }}
        />
        <TouchableOpacity onPress={onIconPress}>
          {securityTextEntry === true ? (
            <Entypo name="eye" size={20} />
          ) : (
            <Entypo name="eye-with-line" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={{
          backgroundColor: 'red',
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          width: '90%',
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;