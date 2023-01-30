import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import OrientationView from 'rn-orientation-view';
import landscapeStyles from './landscapeStyles';
import {Dimensions} from 'react-native';
import {useState} from 'react';

const AdminScreen = props => {
  const navigation = useNavigation();

  /**
   * Returns true if the is in landscape mode
   */
  const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  };

  const [orientation, setOrientation] = useState(
    isLandscape() ? 'landscape' : 'portrait',
  );

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      isLandscape();
      Dimensions.addEventListener('change', () => {
        setOrientation(isLandscape() ? 'landscape' : 'portrait');
      });
    }
    return () => {
      unmounted = true;
    };
  }, []);

  const backAction = () => {
    navigation.navigate('Home');
    return true;
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      BackHandler.addEventListener('hardwareBackPress', backAction);
    }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      unmounted = true;
    };
  }, []);

  return (
    <OrientationView
      style={styles.container}
      landscapeStyles={landscapeStyles.container}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        {isLandscape() === false ? (
          <Text style={styles.title}>
            Hi {localStorage.getItem('Name')}
            <Text style={styles.title4}>
              {'\n'}Would you like to add or delete a URL?
            </Text>
          </Text>
        ) : (
          <Text style={landscapeStyles.title}>
            Welcome {localStorage.getItem('Name')}
            <Text style={styles.title4}>
              {'\n'}Would you like to add or delete a URL?
            </Text>
          </Text>
        )}
      </View>
      {/* Button */}
      {isLandscape() === false ? (
        <View style={styles.box}>
          <Pressable onPress={() => navigation.navigate('Sign In')}>
            <Image
              source={require('../../../assets/images/griffin_background_tiny.jpg')}
            />
          </Pressable>
        </View>
      ) : (
        <View style={landscapeStyles.box}>
          <Pressable onPress={() => navigation.navigate('Sign In')}>
            <Image
              style={{
                width: Dimensions.get('screen').width * 0.15,
                height: Dimensions.get('screen').width * 0.15,
              }}
              source={require('../../../assets/images/griffin_background_tiny.jpg')}
            />
          </Pressable>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={styles.searchButtonText}> Home </Text>
        </Pressable>
        <Pressable
          style={styles.addGameButton}
          onPress={() => navigation.navigate('Create URL')}>
          <Text style={styles.searchButtonText}> Add </Text>
        </Pressable>
        <Pressable
          style={styles.deleteGameButton}
          onPress={() => navigation.navigate('Delete URL')}>
          <Text style={styles.searchButtonText}> Delete </Text>
        </Pressable>
      </View>
    </OrientationView>
  );
};

export default AdminScreen;