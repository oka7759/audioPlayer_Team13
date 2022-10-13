import styled from 'styled-components';

function RecordingTime({ second, minute }) {
  return (
    <TimeBox>
      <span>{minute}</span>
      <span>:</span>
      <span>{second}</span>
    </TimeBox>
  );
}

export default RecordingTime;

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 55px;
  padding: 10px 0;
`;
