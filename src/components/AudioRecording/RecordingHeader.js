import styled, { keyframes } from 'styled-components';

function RecordingHeader({ status }) {
  return (
    <RecordingHeaderBox>
      {status === 'recording' ? (
        <RecordingMessage>Recording...</RecordingMessage>
      ) : (
        <StatusMessage>Voice Recoder</StatusMessage>
      )}
    </RecordingHeaderBox>
  );
}

export default RecordingHeader;

const RecordingHeaderBox = styled.div`
  height: 50px;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StatusMessage = styled.h4`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2e2e2e;
`;
const textFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;
const RecordingMessage = styled.h4`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2e2e2e;
  animation: ${textFade} 2s 1s infinite;
`;
