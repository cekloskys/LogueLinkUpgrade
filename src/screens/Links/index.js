import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import Link from '../../components/Link';
import {useQuery, gql} from '@apollo/client';

const GET_LINKS = gql`
  query Links {
    links {
      _id
      id
      title
      uri
    }
  }
`;

const LinksScreem = props => {
  const {data, error, loading} = useQuery(GET_LINKS, {
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
        setResults(data.links);
      }
    }
    return () => {
      unmounted = true;
    };
  }, [data]);
  return (
    <View>
      <FlatList data={results} renderItem={({item}) => <Link post={item} />} />
    </View>
  );
};

export default LinksScreem;