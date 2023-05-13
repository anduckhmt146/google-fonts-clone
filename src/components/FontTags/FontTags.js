import React from 'react';
import './style.css';
function FontTags({ font, clearSelectedFont }) {
  return (
    <div className="font-tag">
      <p>{font}</p>
      <div
        className="fa fa-minus-circle"
        onClick={() => clearSelectedFont(font)}></div>
    </div>
  );
}

export default FontTags;
