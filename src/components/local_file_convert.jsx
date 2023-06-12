import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3';

function MyComponent() {
  const svgRef = useRef();
  const [svgData, setSvgData] = useState(null);

  const generateSvg = () => {
    const svg = select(svgRef.current);
    svg.append('circle')
      .attr('cx', 50)
      .attr('cy', 50)
      .attr('r', 50)
      .attr('fill', 'red');
    
    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    setSvgData(svgString);
  }

  const downloadSvg = () => {
    if (!svgData) return;
    const data = "data:image/svg+xml;charset=utf-8,"+ encodeURIComponent(svgData);

    const link = document.createElement('a');
    link.href = data;
    link.download = 'image.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <svg ref={svgRef}></svg>
      <button onClick={generateSvg}>Generate SVG</button>
      <button onClick={downloadSvg}>Download SVG</button>
      {svgData && <p>Saved SVG data: {svgData}</p>}
    </div>
  );
}

export default MyComponent;


