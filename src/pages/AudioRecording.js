import { useReactMediaRecorder } from 'react-media-recorder';
import styled from 'styled-components';
import RecordingHeader from '../components/AudioRecording/RecordingHeader';
import RecordingContent from '../components/AudioRecording/RecordingContent';
import { firestore } from '../firebase/firebase';
import { useState } from 'react';
function AudioRecording() {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    echoCancellation: true,
  });

  const [number, setNumber] = useState(1);
  console.log(number, 'asdsadsadsa');

  const firebasGet = (url, num) => {
    const bucket = firestore.collection('bucket');
    mediaBlobUrl && bucket.doc('blob' + (number - 1)).set({ blob: url });
    mediaBlobUrl && alert('음성이 저장되었습니다');
    setNumber(number + 1);
  };

  return (
    <Container>
      <RecordingBox>
        <RecordingHeader status={status} />
        <RecordingContent
          startRecording={startRecording}
          stopRecording={stopRecording}
          pauseRecording={pauseRecording}
          mediaBlobUrl={mediaBlobUrl}
          number={number}
          firebasGet={firebasGet}
        />
      </RecordingBox>
    </Container>
  );
}

export default AudioRecording;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const RecordingBox = styled.div`
  border: 1px solid #929292;
  background-color: black;
  width: 700px;
`;
