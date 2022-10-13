import { useReactMediaRecorder } from 'react-media-recorder';
import styled from 'styled-components';
import RecordingHeader from '../components/AudioRecording/RecordingHeader';
import RecordingContent from '../components/AudioRecording/RecordingContent';
import { firestore } from '../firebase/firebase';
import { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment/moment';

function AudioRecording() {
  const [blobFile, setBlobFile] = useState(null);
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    echoCancellation: true,
    onStop: (_, blob) => {
      setBlobFile(blob);
    },
  });
  const nowTime = moment().format('YYMMDDhhmmss');

  const firebasGet = () => {
    const fileName = nowTime + '_' + Math.floor(Math.random() * 100) + '.wav';
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, blobFile).then(snapshot => {
      console.log(snapshot, blobFile);
    });

    const bucket = firestore.collection('bucket');
    mediaBlobUrl &&
      bucket.doc(fileName).set({
        name: fileName,
        blob:
          'https://firebasestorage.googleapis.com/v0/b/cdn-audio.appspot.com/o/' +
          fileName +
          '?alt=media',
      });
    alert('음성이 ' + fileName + '이름으로 저장되었습니다');
  };

  return (
    <Container>
      <RecordingBox>
        <RecordingHeader status={status} />
        <RecordingContent
          status={status}
          startRecording={startRecording}
          stopRecording={stopRecording}
          pauseRecording={pauseRecording}
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
