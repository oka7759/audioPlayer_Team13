import styled from 'styled-components';

function RecordingButton(props) {
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    isActive,
    setIsActive,
    firebasGet,
    mediaBlobUrl,
  } = props;

  const rand_0_10 = Math.floor(Math.random() * 11);
  const startButtonClick = () => {
    if (!isActive) {
      startRecording();
    } else {
      pauseRecording();
    }
    setIsActive(!isActive);
  };

  const stopButtonClick = () => {
    stopRecording();
    setIsActive(false);
    firebasGet(mediaBlobUrl, rand_0_10);
  };

  return (
    <RecordButtonBox>
      <StartButton onClick={startButtonClick}>
        {isActive ? 'PAUSE' : 'START'}
      </StartButton>
      <StopButton onClick={stopButtonClick}>STOP</StopButton>
    </RecordButtonBox>
  );
}

export default RecordingButton;

const RecordButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;
const StartButton = styled.button`
  padding: 12px 30px;
  margin: 5px;
  border: none;
  font-size: 17px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  background-color: #42b72a;
  color: white;
`;
const StopButton = styled.button`
  padding: 12px 30px;
  margin: 5px;
  border: none;
  font-size: 17px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  background-color: #df3636;
  color: white;
`;
