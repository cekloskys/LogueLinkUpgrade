import React from 'react';
import Pdf from 'react-native-pdf';

const HowToDetail = props => {
  const post = props.post;
  console.log('Post ' + post);
  const source = {
    uri: post,
    cache: true,
  };
  console.log(source);
  return (
    <Pdf
      source={source}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      style={{
        flex: 1,
        width: 200,
      }}
    />
  );
};

export default HowToDetail;