// CurtainLoader.jsx
import React, { useEffect, useState } from 'react';
import './CurtainLoader.css';
import curtain from '../assets/curtain.jpg';


const CurtainLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000); // 10s animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="curtain-container">
          <div className="curtain left-curtain" />
          <div className="curtain right-curtain" />
        </div>
      )}
      <div className={`app-content ${loading ? 'hidden' : 'visible'}`}>
        {children}
      </div>
    </>
  );
};

export default CurtainLoader;
