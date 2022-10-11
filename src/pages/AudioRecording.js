import React from 'react';
import styled from 'styled-components';

function AudioRecording() {
  return (
    <Container>
      <RecordingBox>
        <RecordingHeaderBox>
          <StatusMessage>Recording</StatusMessage>
        </RecordingHeaderBox>
        <RecordingContentBox>
          <LeftContentBox>video</LeftContentBox>
          <RightContentBox>
            <ClearBoutton>Clear</ClearBoutton>
            <TimeBox>
              <span>00</span>
              <span>:</span>
              <span>00</span>
            </TimeBox>
            <RecordButtonBox>
              <h3>Press the Start to record</h3>
              <div>
                <StartButton>Start</StartButton>
                <StopButton>Stop</StopButton>
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
`;
const RecordingContentBox = styled.div`
  display: flex;
  justify-content: space-between;
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
