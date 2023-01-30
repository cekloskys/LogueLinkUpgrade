import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import HowTo from '../../components/HowTo';
import {useQuery, gql} from '@apollo/client';

const GET_TUTORIALS = gql`
  query Tutorials {
    tutorials {
      id
      title
      uri
    }
  }
`;

const HowToScreen = props => {
  const {data, error, loading} = useQuery(GET_TUTORIALS, {
    fetchPolicy: 'network-only',
  });
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (error) {
      Alert.alert('Error Fetching Data!', error.message);
    }
  }, [error]);

  useEffect(() => {
    let unmounted = false;
    if (data) {
      if (!unmounted) {
        setResults(data.tutorials);
      }
    }
    return () => {
      unmounted = true;
    };
  }, [data, results]);
  return (
    <View>
      <FlatList data={results} renderItem={({item}) => <HowTo post={item} />} />
    </View>
  );
};

export default HowToScreen;