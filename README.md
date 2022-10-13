<img src="https://img.shields.io/badge/Javascript-ffc700?style=flat-square&logo=Javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

# Audio Player Project

## 🔍 미리보기

> Audio Recording Page

&nbsp; &nbsp; &nbsp;<img src="https://user-images.githubusercontent.com/100933263/195640790-b6aa5686-ad83-47db-83d7-2c2236683d32.gif"  width="450" height="320"/>
<br/>
<br/>

> Audio Play Page

&nbsp; &nbsp; &nbsp;<img src="https://user-images.githubusercontent.com/100933263/195635725-132ac32f-c24b-48c9-830b-1b652b82753c.gif"  width="450" height="500"/>
<br/>
<br/>

## 🚩 프로젝트 개요

- 진행기간 : 10/11~ 10/14
- 과제주관 : (주)하이
- 참여명단 : 정억화, 손소희
- DEMO : [DEMO](https://lustrous-cheesecake-74b27e.netlify.app/)

<br/>
<br/>

## 🛠 구현사항과 해결방법

> MISSION 1

### 오디오 녹음 화면 구현

#### 1-1 &nbsp; 오디오 녹음 기능 구현<br/>
  
#### 1-2 &nbsp; 녹음 중 UI 표시<br/>
![녹음중 UI](https://user-images.githubusercontent.com/100933263/195629771-1c5d094d-cd72-427c-84ed-77e05ea04e97.gif)

- #### 녹음 중 UI 상태 불러오기 <br/>
  녹음 중인 상태를 useReactMediaRecorde에서 가져와서 AudioRecording 페이지의 header에 보여지도록 구현하였습니다.<br/>
  ```js
  //useReactMediaRecorde에서 status 가져오기
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
  
  //status가 recording이면 Recording... text 보여주기
  {status === 'recording' ? (
  <RecordingMessage>Recording...</RecordingMessage>
  ) : (
  <StatusMessage>Voice Recoder</StatusMessage>
  )}
  ```
- #### 녹음 중 (Recording...) UI 에 animation 효과주기<br/>
  녹음 중 일 경우, styled-component에서 animation fade 효과를 주어 구현하였습니다.<br/>
  ```js
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
  ```
  <br/>
#### 1-3 &nbsp; 녹음 중에는 녹음이 되고 있는 시간 표기<br/>
![녹음 시간](https://user-images.githubusercontent.com/100933263/195632333-95a44f2b-4285-4020-bd8b-b2abcd9ed9c5.gif)

  &nbsp; &nbsp; setInterval 함수를 사용하여 일정한 시간 간격으로 작업을 수행하도록함.<br/>
  ```js
  //second, minute가 1~9일 경우 앞에 0이 붙어서 구현 되도록 수정
  let computedSecond =
    String(secondCounter).length === 1
      ? `0${secondCounter}`
      : secondCounter;
  let computedMinute =
    String(minuteCounter).length === 1
      ? `0${minuteCounter}`
      : minuteCounter;
  ```

  <br/>
  
#### 1-4 &nbsp; 녹음 가능 시간 control<br/>
![녹음 최대 시간](https://user-images.githubusercontent.com/100933263/195632767-1baf45a4-b18b-4386-94e3-fde21afe7cb6.png)

  &nbsp; &nbsp; 최대 녹음 가능 시간을 control 하도록 유저가 선택할 수 있는 select 태그를 사용하여 구현하였습니다.<br/>
  &nbsp; &nbsp; onChange 이벤트로 endTime state를 변경하여 유저가 선택한 시간을 가져와서 해당 시간이되면 녹화가 멈추도록 구현하였습니다.<br/>
  ```js
  //최대 녹화시간을 변경할 수 있는 endTime state
  const [endTime, setEndTime] = useState(1);
  
  //select tag에서의 value 값에 따라 변경됨.
  const handleSelect = e => {
    setEndTime(e.target.value);
  };
    
  //endTime이 되면 녹화가 멈추는 조건.
   if (counter > endTime * 60) {
    pauseRecording();
    stopRecording();
    setIsActive(false);
   }
  ```
  <br/>
  <br/>
  
> MISSION 2

### 음성 재생 화면 구현

#### 2-1 &nbsp; 오디오 재생 기능 구현<br/>
![오디오재생기능](https://user-images.githubusercontent.com/100933263/195634034-735061a1-dfb7-46e2-87d1-662970b290dc.gif)

  &nbsp; &nbsp; **firestore** 에서 URL을 가져와 보여질 수 있도록 구현 하였습니다. <br/>
  ```js
  //blobUrl state에 firestore에서 가져온 url 담기.
  const [blobUrl, setBlobUrl] = useState('');
  
  useEffect(() => {
    const bucket = firestore.collection('bucket');
    bucket
      .doc('blob')
      .get()
      .then(doc => {
        setBlobUrl(doc.data().blob);
      });
  }, []);
  
  //autoPlay 속성을 사용하여 실행될 준비가 끝나는 대로 자동으로 실행시킴.
  <AudioPlayer autoPlay src={blobUrl} onPlay />
  ```

#### 2-2 &nbsp; 오디오가 재생된 시간을 표시<br/>

#### 2-3 &nbsp; 오디오 파일을 다운로드 가능<br/>
![다운로드](https://user-images.githubusercontent.com/100933263/195634573-1f644070-042d-4744-95d0-eb8631295b5c.png)

  &nbsp; &nbsp; play list에서 해당 파일의 다운로드 버튼 클릭 시 다운로드 가능하도록 구현하였습니다. <br/>
  ```js
  <Button
   type="primary"
   icon={<DownloadOutlined />}
   size="small"
   onClick={() => {
    downloadFile(item.blob);
   }}
  >
    Download
  </Button>
  ```
  ![다운로드2](https://user-images.githubusercontent.com/100933263/195643901-cb27dc08-87e2-47e8-b975-bc0190c7ad5e.png)
  ```js
  const downloadFile = url => {
    fetch(url, { method: 'GET' })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '노래';
        document.body.appendChild(a);
        a.click();
        setTimeout(_ => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch(err => {
        console.error('err: ', err);
      });
  };
  ```
  <br/>
  <br/>
  
> MISSION 3 _ 추가 선택 구현사항

### 녹음된 음성 리스트 화면 구현

#### 3-1 &nbsp; 오디오 녹음 완료 후 firebase firestorage를 이용하여 음성 파일을 저장하기<br/>

#### 3-2 &nbsp; 저장된 오디오 파일 불러오기<br/>

#### 3-3 &nbsp; 각 오디오 파일 별로 음성 재생 화면의 재생 기능 삽입<br/>
<br/>
<br/>

## ⚙ 프로젝트 관리

##### 프로젝트 관리 및 설계와 관련된 사항 [내용보기!](https://www.notion.so/wecode/13-81a1c15f26404a789850d53fb87acfc3)
