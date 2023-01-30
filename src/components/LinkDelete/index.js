import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import styles from '../Link/styles';
import {useMutation, gql} from '@apollo/client';

const DELETE_LINKS = gql`
  mutation DeleteLink($deleteLinkId: ID) {
    deleteLink(id: $deleteLinkId)
  }
`;

const DELETE_TUTORIAL = gql`
  mutation DeleteTutorial($deleteTutorialId: ID) {
    deleteTutorial(id: $deleteTutorialId)
  }
`;

const LinkDelete = props => {
  const post = props.post;

  const navigation = useNavigation();

  const [deleteLink, {data, error, loading}] = useMutation(DELETE_LINKS);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      Alert.alert('Completed', 'Sucsesfully deleted ' + post.title);
    }
  }, [data, post.title]);

  const deleteLinkId = post._id.toString();

  const [deleteTutorial, {data: tutorialData, error: tutorialError, ___}] =
    useMutation(DELETE_TUTORIAL);

  useEffect(() => {
    if (tutorialError) {
      Alert.alert('Error', tutorialError.message);
    }
  }, [tutorialError]);

  useEffect(() => {
    if (tutorialData) {
      Alert.alert('Completed', 'Sucsesfully deleted ' + post.title);
    }
  }, [tutorialData, post.title]);

  const deleteTutorialId = post._id.toString();

  const onPress = async () => {
    Alert.alert(
      'Please Comfirm',
      'Are you sure you would like to delete ' + post.title + '?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            if (post.type === 'Link') {
              await deleteLink({variables: {deleteLinkId: deleteLinkId}})
                .then(navigation.navigate('Admin'))
                .catch(error => console.log(error));
            } else {
              await deleteTutorial({
                variables: {deleteTutorialId: deleteTutorialId},
              })
                .then(navigation.navigate('Admin'))
                .catch(error => console.log(error));
            }
          },
        },
        {
          text: 'No',
          onPress: () => {
            navigation.navigate('Admin');
          },
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        {/* Image */}
        <Image
          source={require('../../../assets/images/griffin_flag.png')}
          style={styles.image}
        />
        {/* Description Text */}
        <Text style={styles.description}>{post.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkDelete;