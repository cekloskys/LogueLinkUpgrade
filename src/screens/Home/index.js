import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import OrientationView from 'rn-orientation-view';
import landscapeStyles from './landscapeStyles';
import {Dimensions} from 'react-native';
import {useState} from 'react';

const HomeScreen = props => {
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

  return (
    <OrientationView
      style={styles.container}
      landscapeStyles={landscapeStyles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        {isLandscape() === false ? (
          <Text style={styles.title}>
            Logue Link
            <Text style={styles.title2}>{'\n'}Chestnut Hill College</Text>
            <Text style={styles.title4}>{'\n'}Logue Library</Text>
          </Text>
        ) : (
          <Text style={landscapeStyles.title}>
            Logue Link
            <Text style={landscapeStyles.title2}>
              {'\n'}Chestnut Hill College
            </Text>
            <Text style={landscapeStyles.title4}>{'\n'}Logue Library</Text>
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
                width: Dimensions.get('screen').width * 0.1,
                height: Dimensions.get('screen').width * 0.1,
              }}
              source={require('../../../assets/images/griffin_background_tiny.jpg')}
            />
          </Pressable>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.title3}>Find your library resources here</Text>
        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate('Get started!')}>
          <AntDesign name="user" size={25} color={'#f15454'} />
          <Text style={styles.searchButtonText}> Get started!</Text>
        </Pressable>
      </View>
    </OrientationView>
  );
};

export default HomeScreen;