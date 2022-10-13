import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecordingClearTime from './Contnets/RecordingClearTime';
import RecordingTime from './Contnets/RecordingTime';
import RecordingButton from './Contnets/RecordingButton';
import RecordingEndTime from './Contnets/RecordingEndTime';

function RecordingContent({
  startRecording,
  stopRecording,
  pauseRecording,
  mediaBlobUrl,
  firebasGet,
  status,
}) {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [endTime, setEndTime] = useState(1);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        setSecond(computedSecond);
        setMinute(computedMinute);
        setCounter(counter => counter + 1);
      }, 1000);
      if (counter > endTime * 60) {
        pauseRecording();
        stopRecording();
        setIsActive(false);
      }
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return (
    <RecordingContentBox>
      {!isActive ? (
        <LeftContentBox>
          <video src={mediaBlobUrl} controls loop />
        </LeftContentBox>
      ) : null}
      <RightContentBox>
        <RecordingClearTime
          setIsActive={setIsActive}
          setCounter={setCounter}
          setSecond={setSecond}
          setMinute={setMinute}
        />
        <RecordingTime minute={minute} second={second} />
        <RecordBox>
          <h3>Press the Start to record</h3>
          <RecordingButton
            setCounter={setCounter}
            setSecond={setSecond}
            setMinute={setMinute}
            status={status}
            firebasGet={firebasGet}
            startRecording={startRecording}
            stopRecording={stopRecording}
            pauseRecording={pauseRecording}
            isActive={isActive}
            setIsActive={setIsActive}
          />
          <RecordingEndTime endTime={endTime} setEndTime={setEndTime} />
        </RecordBox>
      </RightContentBox>
    </RecordingContentBox>
  );
}

export default RecordingContent;

const RecordingContentBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;
const LeftContentBox = styled.div`
  height: 38px;
  padding-right: 15px;
`;
const RightContentBox = styled.div`
  color: white;
  padding-left: 15px;
`;
const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  h3 {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    font-size: 15px;
    color: #f0f2f5;
  }
`;
