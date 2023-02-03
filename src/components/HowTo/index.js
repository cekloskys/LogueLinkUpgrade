import React from 'react';
import {Text, Image, Pressable} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const HowTo = props => {
  const post = props.post;

  const navigation = useNavigation();
  const goToPostPage = () => {
    navigation.navigate('Tutorial Details', {postUri: post.uri});
  };
  return (
    <Pressable onPress={goToPostPage} style={styles.touchable}>
      <Image
        source={require('../../../assets/images/griffin_flag.png')}
        style={styles.image}
      />
      <Text style={styles.description} numberOfLines={3}>
        {post.title}
      </Text>
    </Pressable>
  );
};

export default HowTo;