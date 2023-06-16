import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';

const SVG_Parser = ({ svgString }) => {
  return (
    <div>
      {parse(svgString)}
    </div>
  );
};

export default SVG_Parser;

