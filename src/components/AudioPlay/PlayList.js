import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton, Avatar } from 'antd';
import { AudioOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { firestore } from '../../firebase/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const starsRef = ref(storage, '221014060802_64.wav');

const PlayList = ({ setBlobUrl }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const result = [];
  const [newurl, setNewurl] = useState('');
  const getFirebase = () => {
    const bucket = firestore.collection('bucket');

    bucket.get().then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          result.push(doc.data());
          setData(result);
        }
      });
    });
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getFirebase();
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const changeUrl = url => {
    setBlobUrl(url);
  };

  const downloadFile = () => {
    getDownloadURL(starsRef).then(url => {
      // Insert url into an <img> tag to "download"

      setNewurl(url);
    });

    fetch(newurl, { method: 'GET' })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'csv_feed';
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
          <Divider plain> 총 {data.length} 개의 파일이 있습니다. 🤐</Divider>
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
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
                title={item.name}
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
