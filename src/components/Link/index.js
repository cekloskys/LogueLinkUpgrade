import React from 'react';
import {
  Text,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

const Link = props => {
  const post = props.post;
  const onPress = () =>
    Linking.canOpenURL(post.uri).then(() => {
      Linking.openURL(post.uri);
    });
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

export default Link;