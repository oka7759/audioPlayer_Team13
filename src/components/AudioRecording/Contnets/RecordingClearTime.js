import styled from 'styled-components';

function RecordingContent({ setIsActive, setCounter, setSecond, setMinute }) {
  const clearButtonClick = () => {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  };

  return <ClearBoutton onClick={clearButtonClick}>Clear</ClearBoutton>;
}

export default RecordingContent;

const ClearBoutton = styled.button`
  background-color: #2d2d2d;
  border-radius: 8px;
  color: #f0f2f5;
  padding: 3px 6px;
  letter-spacing: 1px;
  font-size: 15px;
  cursor: pointer;
`;
