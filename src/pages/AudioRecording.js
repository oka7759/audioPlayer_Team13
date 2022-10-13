import { useReactMediaRecorder } from 'react-media-recorder';
import styled from 'styled-components';
import RecordingHeader from '../components/AudioRecording/RecordingHeader';
import RecordingContent from '../components/AudioRecording/RecordingContent';

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

  return (
    <Container>
      <RecordingBox>
        <RecordingHeader status={status} />
        <RecordingContent
          startRecording={startRecording}
          stopRecording={stopRecording}
          pauseRecording={pauseRecording}
          mediaBlobUrl={mediaBlobUrl}
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
