import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, line, curveCardinal } from 'd3';


function CurvedLineChart() {
  const [data, setData] = useState([0,20, 30, 295, 180, 60, 80, 420, 30, 56, 86]);
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 100)
      .y(value => 500 - value)
      .curve(curveCardinal);
    svg
      .selectAll("path").data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue")
  }, [data]);

  return (
  <React.Fragment>
    <svg width="960" height="500"ref={svgRef}>
    </svg>
    <br />
    <button onClick={() => setData(data.map(value => value + 5 ))}>Update data</button>
    <button onClick={() => setData(data.filter(value => value < 35 ))}>filter data</button>
   </React.Fragment>
  )
}

export default CurvedLineChart;