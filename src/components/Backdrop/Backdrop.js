import React from 'react';
import './style.css';
function Backdrop({ removeDrawers }) {
  return <div className="backdrop" onClick={removeDrawers}></div>;
}

export default Backdrop;
