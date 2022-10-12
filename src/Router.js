import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'react-h5-audio-player/lib/styles.css';
import MainLayout from './pages/MainLayout';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
