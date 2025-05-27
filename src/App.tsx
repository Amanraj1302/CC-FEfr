import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Routers } from './components/Routers';
import './App.css';
import './index.css';


function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <Routers />
    </>
  );
}

export { App };


