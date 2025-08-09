import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ARView from './pages/ARView';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ar" element={<ARView />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
