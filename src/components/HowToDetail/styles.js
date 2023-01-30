import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  image: {
    width: '100%',
    aspectRatio: 3/2,
    resizeMode: 'contain',
    borderRadius: 10,
    alignSelf: 'center',
    margin: 10,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;