import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default styles;