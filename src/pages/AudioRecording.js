import React, { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import styled, { keyframes } from 'styled-components';

function AudioRecording() {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [endTime, setEndTime] = useState(1);

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

  const clearButtonClick = () => {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  };

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
  };

  const handleSelect = e => {
    setEndTime(e.target.value);
  };

  return (
    <Container>
      <RecordingBox>
        <RecordingHeaderBox>
          {status === 'recording' ? (
            <RecordingMessage>Recording...</RecordingMessage>
          ) : (
            <StatusMessage>Voice Recoder</StatusMessage>
          )}
        </RecordingHeaderBox>
        <RecordingContentBox>
          {!isActive ? (
            <LeftContentBox>
              <video src={mediaBlobUrl} controls loop />
            </LeftContentBox>
          ) : null}
          <RightContentBox>
            <ClearBoutton onClick={clearButtonClick}>Clear</ClearBoutton>
            <TimeBox>
              <span>{minute}</span>
              <span>:</span>
              <span>{second}</span>
            </TimeBox>
            <RecordBox>
              <h3>Press the Start to record</h3>
              <RecordButtonBox>
                <StartButton onClick={startButtonClick}>
                  {isActive ? 'PAUSE' : 'START'}
                </StartButton>
                <StopButton onClick={stopButtonClick}>STOP</StopButton>
              </RecordButtonBox>
              <SelectBox>
                <select onChange={handleSelect} value={endTime}>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
                <span>분 후에 자동으로 녹화가 중지 됩니다.</span>
              </SelectBox>
            </RecordBox>
          </RightContentBox>
        </RecordingContentBox>
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
const ClearBoutton = styled.button`
  background-color: #2d2d2d;
  border-radius: 8px;
  color: #f0f2f5;
  padding: 3px 6px;
  letter-spacing: 1px;
  font-size: 15px;
  cursor: pointer;
`;
const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 55px;
  padding: 10px 0;
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
