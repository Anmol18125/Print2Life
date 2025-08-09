import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">ARHorizon</Link>
        <div className="space-x-4">
          <Link to="/" className="text-sm">Home</Link>
          <Link to="/ar" className="text-sm">AR Demo</Link>
          <Link to="/analytics" className="text-sm">Analytics</Link>
        </div>
      </div>
    </nav>
  );
}
