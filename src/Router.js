import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AudioRecording from './pages/AudioRecording';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AudioRecording />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
