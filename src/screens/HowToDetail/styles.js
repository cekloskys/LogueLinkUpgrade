import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
    alignSelf: 'center',
    margin: 10,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    paddingTop: 10,
    fontWeight: 'bold',
  },
});

export default styles;