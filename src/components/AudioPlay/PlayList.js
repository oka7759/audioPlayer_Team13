import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton, Avatar } from 'antd';
import { AudioOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { firestore } from '../../firebase/firebase';

const PlayList = ({ setBlobUrl }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataaa, setDataaa] = useState([]);

  const dataa = [];

  const getFirebase = () => {
    const bucket = firestore.collection('bucket');

    // 모든 document 가져오기
    bucket.get().then(docs => {
      // 반복문으로 docuemnt 하나씩 확인
      docs.forEach(doc => {
        if (doc.exists) {
          dataa.push(doc.data());
          // document의 데이터
          console.log(doc.data());
          // document의 id
          console.log(doc.id);
          setDataaa(dataa);
        }
      });
    });
  };

  console.log('a', dataaa);
  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    fetch('/data/data.json')
      .then(res => res.json())
      .then(body => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
    getFirebase();
  }, []);

  console.log(dataa);
  const changeUrl = url => {
    setBlobUrl(url);
  };

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
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 1}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 0,
            }}
            active
          />
        }
        endMessage={
          <Divider plain>총 {dataaa.length} 개의 파일이 있습니다. 🤐</Divider>
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={dataaa}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: 'red',
                    }}
                    icon={<AudioOutlined />}
                    size="small"
                  />
                }
                title={'음성 ' + (idx + 1)}
                onClick={() => {
                  changeUrl(item.blob);
                }}
              />

              <div>
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
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default PlayList;
