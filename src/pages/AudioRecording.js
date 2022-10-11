import React, { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import styled from 'styled-components';

function AudioRecording() {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

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
      }, 650);
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const stopTimer = () => {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  };

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

  const startButtonClick = () => {
    if (!isActive) {
      startRecording();
    } else {
      pauseRecording();
    }
    setIsActive(!isActive);
  };

  const stopButtonClick = () => {
    pauseRecording();
    stopRecording();
    setIsActive(!isActive);
  };

  return (
    <Container>
      <RecordingBox>
        <RecordingHeaderBox>
          <StatusMessage>{status}</StatusMessage>
        </RecordingHeaderBox>
        <RecordingContentBox>
          {!isActive ? (
            <LeftContentBox>
              <video src={mediaBlobUrl} controls loop />
            </LeftContentBox>
          ) : null}
          <RightContentBox>
            <ClearBoutton onClick={stopTimer}>Clear</ClearBoutton>
            <TimeBox>
              <span>{minute}</span>
              <span>:</span>
              <span>{second}</span>
            </TimeBox>
            <RecordButtonBox>
              <h3>Press the Start to record</h3>
              <div>
                <StartButton onClick={startButtonClick}>
                  {isActive ? 'PAUSE' : 'START'}
                </StartButton>
                <StopButton onClick={stopButtonClick}>STOP</StopButton>
              </div>
            </RecordButtonBox>
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
  margin-top: 100px;
`;
const RecordingBox = styled.div`
  border: 1px solid black;
  background-color: black;
  width: 700px;
  height: 350px;
`;
const RecordingHeaderBox = styled.div`
  border: 1px solid rgb(5, 167, 202);
  height: 70px;
  background-color: rgb(5, 167, 202);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusMessage = styled.h4`
  margin-left: 10px;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;
const RecordingContentBox = styled.div`
  display: flex;
  justify-content: center;
`;
const LeftContentBox = styled.div`
  height: 38px;
  margin: 20px;
`;
const RightContentBox = styled.div`
  margin: 20px;
  color: white;
`;
const ClearBoutton = styled.button`
  background-color: black;
  border-radius: 8px;
  color: white;
`;
const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 55px;
  padding: 10px 0;
`;
const RecordButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  h3 {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
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
