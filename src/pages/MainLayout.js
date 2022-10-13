import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import AudioRecording from './AudioRecording';
import AudioPlay from './AudioPlay';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { AudioOutlined, PlayCircleOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('음성녹음', '1', <AudioOutlined />),
  getItem('재생', '2', <PlayCircleOutlined />),
];

const MainLayout = () => {
  const [page, setPage] = useState('1');

  const onClick = e => {
    setPage(e.key);
  };
  return (
    <Layout className="layout">
      <Header>
        <a href="/">
          <Logo>
            <h1>Hi</h1>
          </Logo>
        </a>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={page}
          items={items}
          onClick={onClick}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>하이 오디오 플레이어</Breadcrumb.Item>
          <Breadcrumb.Item>
            {page === '1' ? 'Voice Recoder' : 'Vioce Player'}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          {page === '1' && <AudioRecording />}
          {page === '2' && <AudioPlay />}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        13 Team
      </Footer>
    </Layout>
  );
};

export default MainLayout;

const Logo = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;

  @media (max-width: 530px) {
    width: 50px;
    margin: 16px 10px;
  }

  h1 {
    font-size: 25px;
    line-height: 31px;
    text-align: center;
    font-weight: 700;
    color: white;
    letter-spacing: 2px;
    @media (max-width: 530px) {
      font-size: 20px;
      letter-spacing: 1px;
    }
  }
`;
