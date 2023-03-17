import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import HowTo from '../../components/HowTo';
import { DataStore } from 'aws-amplify';
import { Tutorials } from '../../models';

const HowToScreen = props => {
  const [tutorials, setTutorials] = useState([]);
  useEffect(() => {
    DataStore.query(Tutorials).then(setTutorials);
}, []);
  return (
    <View>
      <FlatList data={tutorials} renderItem={({item}) => <HowTo post={item} />} />
    </View>
  );
};

export default HowToScreen;