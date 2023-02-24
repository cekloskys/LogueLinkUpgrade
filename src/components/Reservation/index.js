import React from 'react';
import {
  Text,
  Image,
  Linking,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Reservations } from '../../models';
import { useReservationContext } from '../../context/ReservationContext';


const Reservation = props => {
  const navigation = useNavigation();
  const {reservations, setReservations} = useReservationContext();
  const post = props.post;
  const deleteReservation = async () => {
    await DataStore.delete(Reservations, post.id);
  };

  const onPress = () => {
    Alert.alert(
      'Please Comfirm',
      'Are you sure you would like to cancel this reservation?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteReservation();
            setReservations(reservations.filter((r) => r.id !== post.id));
          }
        },
        {
          text: 'No',
          onPress: () => {
            console.log('No');
          },
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Image
          source={require('../../../assets/images/griffin_flag.png')}
          style={styles.image}
        />
        <View>
          <Text style={styles.description}>Room: {post.room}</Text>
          <Text style={styles.description}>Date: {post.date}</Text>
          <Text style={styles.description}>Start Time: {post.startTime}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Reservation;