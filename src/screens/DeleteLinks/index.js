import React, {useEffect, useState} from 'react';
import {Alert, View, SectionList, Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import LinkDelete from '../../components/LinkDelete';
import styles from './styles';

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

const GET_TUTORIALS = gql`
  query Tutorials {
    tutorials {
      _id
      id
      title
      uri
    }
  }
`;

const DeleteLinksScreen = props => {
  var [results, setResults] = useState([]);
  var [tutorialResults, setTutorialResults] = useState([]);
  var tutorialObject = {type: 'Tutorial'};
  var linkObject = {type: 'Link'};

  const {data, error, loading} = useQuery(GET_LINKS, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (error) {
      Alert.alert('Error Fetching Data!', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setResults(data.links);
    }
  }, [data, results]);

  results.forEach(item => {
    Object.assign(item, linkObject);
  });

  const {
    data: tutorialData,
    error: tutorialError,
    ___,
  } = useQuery(GET_TUTORIALS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (tutorialError) {
      Alert.alert('Error Fetching Data!', tutorialError.message);
    }
  }, [tutorialError]);

  useEffect(() => {
    if (tutorialData) {
      setTutorialResults(tutorialData.tutorials);
    }
  }, [tutorialData, tutorialResults]);

  tutorialResults.forEach(item => {
    Object.assign(item, tutorialObject);
  });

  return (
    <View>
      <SectionList
        style={styles.outer}
        sections={[
          {title: 'Links', data: results},
          {title: 'Tutorials', data: tutorialResults},
        ]}
        renderItem={({item}) => <LinkDelete post={item} />}
        renderSectionHeader={({section}) => (
          <View style={styles.completeContainer}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 5,}}>
                {section.title}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default DeleteLinksScreen;