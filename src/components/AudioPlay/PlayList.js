import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton, Avatar } from 'antd';
import { AudioOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const PlayList = ({ setBlobUrl }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
  }, []);

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
          <Divider plain>총 {data.length} 개의 파일이 있습니다. 🤐</Divider>
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.title}>
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
                title={item.title}
                onClick={() => {
                  changeUrl(item.url);
                }}
              />

              <div>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="small"
                  onClick={() => {
                    downloadFile(item.url);
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
