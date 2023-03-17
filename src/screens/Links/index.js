import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import Link from '../../components/Link';
import { DataStore } from 'aws-amplify';
import { Links } from '../../models';

const LinksScreem = props => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    DataStore.query(Links).then(setLinks);
}, []);
  return (
    <View>
      <FlatList data={links} renderItem={({item}) => <Link post={item} />} />
    </View>
  );
};

export default LinksScreem;