import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  touchable: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  description: {
    color:'black',
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'nowrap',
  },
});

export default styles;