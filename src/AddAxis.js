import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3';


function AddAxis() {
  const [data, setData] = useState([0,40, 30, 67, 156, 220, 175, 300, 357, 459, 489]);
  const svgRef = useRef()

  useEffect(() => {

    const svg = select(svgRef.current);

    const xScale = scaleLinear()
    // domain is the amount of items in the array
        .domain([0, data.length - 1])
    // range is the width of the svg    
        .range([0, 1000]);

    const yScale = scaleLinear()
        .domain([0, 500])
        .range([500, 0])   

    const xAxis = axisBottom(xScale);
    svg
        .select(".x-axis")
        .style("transform", "translateY(500px)")
        .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
    .select(".y-axis")
    .style("transform", "translateX(1000px)")
    .call(yAxis);


    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);


    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
  <React.Fragment>
    <svg width="1000" height="500"ref={svgRef}>
        <g className="x-axis" /> 
        <g className="y-axis" /> 
    </svg>
    <br />
    <br />
    <button onClick={() => setData(data.map(value => value + 5 ))}>Update data</button>
    <button onClick={() => setData(data.filter(value => value < 35 ))}>filter data</button>
   </React.Fragment>
  )
}

export default AddAxis;