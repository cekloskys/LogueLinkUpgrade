import React from 'react';
import {View, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styles from './styles';
import Pdf from 'react-native-pdf';

const HowToDetailScreen = props => {
  const route = useRoute();
  const post = route.params.postUri;
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{uri: post}}
        onLoadComplete={numberOfPages => {
          console.log('Loaded');
        }}
        onError={error => {
          console.log(error);
        }}
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    </View>
  );
};

export default HowToDetailScreen;