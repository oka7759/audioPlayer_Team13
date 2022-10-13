import styled from 'styled-components';

function RecordingButton({
  startRecording,
  stopRecording,
  pauseRecording,
  isActive,
  setIsActive,
  firebasGet,
  mediaBlobUrl,
  number,
  status,
  setCounter,
  setSecond,
  setMinute,
}) {
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
    status === 'stopped' && firebasGet(mediaBlobUrl, number);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  };

  return (
    <RecordButtonBox>
      <StartButton onClick={startButtonClick}>
        {isActive ? 'PAUSE' : 'START'}
      </StartButton>
      {status === 'stopped' ? (
        <StopButton true={true} onClick={stopButtonClick}>
          SAVE
        </StopButton>
      ) : (
        <StopButton onClick={stopButtonClick}>STOP</StopButton>
      )}
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
  background-color: ${props => (props.true ? 'skyblue' : '#df3636')};
  color: white;
`;
