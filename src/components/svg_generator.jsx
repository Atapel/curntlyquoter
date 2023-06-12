// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const PinkTriangle = () => {
//   const ref = useRef();

//   useEffect(() => {
//     const svg = d3.select(ref.current)
//       .append('svg')
//       .attr('width', 200)
//       .attr('height', 200)
//       .attr('viewBox', `0 0 200 200`);

//     svg.append('polygon')
//       .attr('points', '100,20 180,180 20,180')
//       .style('fill', 'pink')
//       .style('stroke', 'black')
//       .style('stroke-width', 2);

//     return () => {
//       svg.selectAll('*').remove();
//     };
//   }, []);

//   return <div ref={ref} />;
// };

// export default PinkTriangle;


import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BlueCircle = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', 200)
      .attr('height', 200)
      .attr('viewBox', `0 0 200 200`);

    svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 50)
      .style('fill', 'blue')
      .style('stroke', 'black')
      .style('stroke-width', 2);

    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return <div ref={ref} />;
};

const GreenRectangle = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', 200)
      .attr('height', 200)
      .attr('viewBox', `0 0 200 200`);

    svg.append('rect')
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 100)
      .attr('height', 100)
      .style('fill', 'green')
      .style('stroke', 'black')
      .style('stroke-width', 2);

    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return <div ref={ref} />;
};

const PinkTriangle = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', 200)
      .attr('height', 200)
      .attr('viewBox', `0 0 200 200`);

    svg.append('polygon')
      .attr('points', '100,20 180,180 20,180')
      .style('fill', 'pink')
      .style('stroke', 'black')
      .style('stroke-width', 2);

    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return <div ref={ref} />;
};

export { BlueCircle, GreenRectangle, PinkTriangle };
