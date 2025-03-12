import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";
import mallImage from "../img/Mallimage.png";

const Heatmap = (props) => {
  const svgRef = useRef(null);
  const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, 100]);
  const intensityValues = [0, 20, 40, 60, 80, 100];

  const heatmapData = [
    { x: 0, y: 0, width: 266.67, height: 125, intensity: 70 },
    { x: 266.67, y: 0, width: 266.67, height: 125, intensity: 60 },
    { x: 533.34, y: 0, width: 266.66, height: 125, intensity: 30 },
    { x: 0, y: 125, width: 266.67, height: 125, intensity: 40 },
    { x: 266.67, y: 125, width: 266.67, height: 125, intensity: 50 },
    { x: 533.34, y: 125, width: 266.66, height: 125, intensity: 60 },
  ];

  const totalCount = heatmapData.length;
  const intensityCounts = heatmapData.reduce((acc, item) => {
    const intensity = item.intensity;
    acc[intensity] = (acc[intensity] || 0) + 1;
    return acc;
  }, {});
  const sortedIntensities = Object.keys(intensityCounts)
    .map(Number)
    .sort((a, b) => a - b);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .selectAll("rect")
      .data(heatmapData)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("fill", (d) => colorScale(d.intensity))
      .style("opacity", 0.5);
  }, [colorScale, heatmapData]);

  return (
    <>
      <Box
        position="relative"
        display="inline-block"
        style={{
          width: "100%",
          height: "250px",
          backgroundImage: `url(${mallImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={props.onClick}
      >
        <svg
          ref={svgRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 800 250"
          preserveAspectRatio="none"
        />
      </Box>
      <Box display="flex" flexWrap="wrap" gap="4px" mt={2}>
        {sortedIntensities.map((intensity) => (
          <Box key={intensity} display="flex" alignItems="center" gap="2px">
            <Box sx={{ width: 8, height: 8, bgcolor: colorScale(intensity) }} />
            <Box sx={{ fontSize: "0.7rem" }}>
              {((intensityCounts[intensity] / totalCount) * 100).toFixed(2)}%
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Heatmap;
