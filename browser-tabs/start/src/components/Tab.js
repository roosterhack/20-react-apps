import React, { useState } from "react";

export const Tab = ({ children }) => {
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    top: 0,
    opacity: 0,
  });

  const moveHighlight = (e) => {
    setHighlightStyle({
      left: e.nativeEvent.layerX - 150,
      top: e.nativeEvent.layerY - 40,
    });
  };

  const hideHighlight = (e) => {
    setHighlightStyle({
      left: e.nativeEvent.layerX - 150,
      top: e.nativeEvent.layerY - 40,
      opacity: 0,
    });
  };
  return (
    <div className="tab" onMouseMove={moveHighlight} onMouseOut={hideHighlight}>
      <div className="highlight" style={highlightStyle} />
      {children}
    </div>
  );
};
