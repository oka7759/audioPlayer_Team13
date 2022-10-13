import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import PlayList from '../components/AudioPlay/PlayList';
import 'react-h5-audio-player/lib/styles.css';
import 'antd/dist/antd.css';
import { firestore } from '../firebase/firebase';

const AudioPlay = () => {
  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    const bucket = firestore.collection('bucket');

    bucket
      .doc('blob')
      .get()
      .then(doc => {
        setBlobUrl(doc.data().blob);
      });
  }, []);

  console.log(blobUrl);

  return (
    <Container>
      <PlayerBox>
        <WaveForm />
        <AudioPlayer
          autoPlay
          src={blobUrl}
          onPlay={e => console.log('onPlay', blobUrl)}
        />
        <PlayList setBlobUrl={setBlobUrl} />
      </PlayerBox>
    </Container>
  );
};

export default AudioPlay;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PlayerBox = styled.div`
  width: 100%;
`;

const WaveForm = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
`;
