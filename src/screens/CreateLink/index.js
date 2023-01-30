import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import styles from '../CreateLink/styles';
import {useNavigation} from '@react-navigation/native';
import {useMutation, gql} from '@apollo/client';

const CREATE_LINK = gql`
  mutation CreateLink($createLinkId: String, $uri: String, $title: String) {
    createLink(id: $createLinkId, uri: $uri, title: $title)
  }
`;

const CREATE_TUTORIAL = gql`
  mutation CreateTutorial(
    $createTutorialId: String
    $uri: String
    $title: String
  ) {
    createTutorial(id: $createTutorialId, uri: $uri, title: $title)
  }
`;

const CreateLinkScreen = () => {
  const [id, setId] = useState('');
  const [uri, setURI] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const types = [
    {
      id: '1',
      item: 'Link',
    },
    {
      id: '2',
      item: 'Tutorial',
    },
  ];

  const navigation = useNavigation();

  const [createLink, {data, error, loading}] = useMutation(CREATE_LINK);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Error!', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      navigation.navigate('Admin');
    }
  }, [data]);

  const [createTutorial, {data: tutorialdata, error: tutorialerror, ___}] =
    useMutation(CREATE_TUTORIAL);

  useEffect(() => {
    if (tutorialerror) {
      console.log(tutorialerror);
      Alert.alert('Error!', tutorialerror.message);
    }
  }, [tutorialerror]);

  useEffect(() => {
    if (tutorialdata) {
      navigation.navigate('Admin');
    }
  }, [tutorialdata]);

  const onCreateLink = async () => {
    if (!uri) {
      Alert.alert('Invalid Input', 'Please fill in a URL!');
      return;
    }
    if (!uri.startsWith('https://')) {
      Alert.alert('Invalid Input', 'URL must start with "https://"!');
      return;
    }
    if (!title) {
      Alert.alert('Invalid Input', 'Please fill in a Title!');
      return;
    }
    if (!type) {
      Alert.alert('Invalid Input', 'Please select a Type!');
      return;
    }

    if (type.item === 'Link') {
      await createLink({
        variables: {createLinkId: id, uri: uri, title: title},
      }).catch(error => console.log(error));
    } else {
      await createTutorial({
        variables: {createTutorialId: id, uri: uri, title: title},
      }).catch(error => console.log(error));
    }

    Alert.alert('Completed', 'URL Added!');
    navigation.navigate('Admin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          value={uri}
          onChangeText={value => setURI(value)}
          style={styles.nameInput}
          clearButtonMode={'while-editing'}
          placeholder={'Enter URL Ex.https://www.google.com'}
          autoCapitalize="none"
          placeholderTextColor="grey"
          multiline={true}
          numberOfLines={10}
        />
        <TextInput
          value={title}
          onChangeText={value => setTitle(value)}
          style={styles.semesterInput}
          clearButtonMode={'while-editing'}
          placeholder={'Enter URL Title'}
          placeholderTextColor="grey"
          multiline={true}
          numberOfLines={10}
        />
        <SelectBox
          label="Select Type"
          options={types}
          value={type}
          onChange={onChange()}
          hideInputFilter={true}
          arrowIconColor={'grey'}
          searchIconColor={'grey'}
          toggleIconColor={'grey'}
          optionsLabelStyle={styles.multiOptionsLabelStyle}
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
        />
        <Pressable style={styles.searchButton} onPress={onCreateLink}>
          <Text style={styles.searchButtonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
  function onChange() {
    return val => setType(val);
  }
};

export default CreateLinkScreen;