import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';


function AnimatedBarChart() {
  const [data, setData] = useState([150,40, 30, 7, 156, 50, 175, 300, 257]);
  const svgRef = useRef()

  useEffect(() => {

    const svg = select(svgRef.current);

    const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, 1000])
        .padding(0.2);

    const yScale = scaleLinear()
        .domain([0, 500])
        .range([500, 0])   

        const colorScale = scaleLinear()
        .domain([150, 350, 500])
        .range(["yellow", "green", "blue"])  
        .clamp(true);

    const xAxis = axisBottom(xScale)
        .ticks(data.length)
        .tickFormat(index => index +1 )
    svg
        .select(".x-axis")
        .style("transform", "translateY(500px)")
        .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
    .select(".y-axis")
    .style("transform", "translateX(1000px)")
    .call(yAxis);

    svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .style("transform", "scale(1, -1")
    .attr("x", (value, index) => xScale(index))
    .attr("y", -500)
    .attr("width", xScale.bandwidth())
    .transition()
    .attr("fill", colorScale)
    .attr("height", value => 500 - yScale(value))
    ;


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

export default AnimatedBarChart;