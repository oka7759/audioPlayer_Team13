import styled from 'styled-components';

function RecordingEndTime(props) {
  const { endTime, setEndTime } = props;

  const handleSelect = e => {
    setEndTime(e.target.value);
  };

  return (
    <SelectBox>
      <select onChange={handleSelect} value={endTime}>
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="60">60</option>
      </select>
      <span>분 후에 자동으로 녹화가 종료됩니다.</span>
    </SelectBox>
  );
}

export default RecordingEndTime;

const SelectBox = styled.div`
  padding-top: 15px;
  text-align: center;
  border-top: 0.5px solid #929292;
  select {
    padding: 0 5px;
    color: black;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
  }
  span {
    padding-left: 10px;
    font-size: 15px;
  }
`;
