import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import innivistaBuilding from "../../../public/images/innovista-ravi.webp";
import Zone1 from "../../../public/images/Zone-A.webp";
import Zone2 from "../../../public/images/Zone-B.webp";
import Zone3 from "../../../public/images/Zone-C.webp";
import Zone4 from "../../../public/images/Zone-D.webp";
import Heatmap from "./components/Heatmap";

// Navigation handler for all clickable items
const handleImageClick = () => {
  let currentUrl = window.location.href;
  if (currentUrl.endsWith("#/innovista")) {
    currentUrl = currentUrl.replace(/#\/innovista$/, "#/details");
  } else if (currentUrl.endsWith("#/")) {
    currentUrl = currentUrl.replace(/#\/$/, "#/details");
  }
  window.location.href = currentUrl;
};

// Common style definitions for the Paper container and the image itself
const paperSx = {
  bgcolor: "grey.100",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  maxHeight: "250px",
  objectFit: "cover",
};

// Reusable component for a clickable image with an optional label.
// Both the image and the label are wrapped in a Box with a pointer cursor.
const ClickableImageCard = ({ src, alt, gridProps, onClick, label }) => (
  <Grid item {...gridProps}>
    <Box onClick={onClick} sx={{ cursor: "pointer" }}>
      <Paper sx={paperSx}>
        <img src={src} alt={alt} style={imageStyle} />
      </Paper>
      {label && (
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          {label}
        </Typography>
      )}
    </Box>
  </Grid>
);

const SustainabilityDashboard = () => {
  // Data for zone images including their labels.
  const zoneImages = [
    { src: Zone1, alt: "Zone 1", label: "Zone A" },
    { src: Zone2, alt: "Zone 2", label: "Zone B" },
    { src: Zone3, alt: "Zone 3", label: "Zone C" },
    { src: Zone4, alt: "Zone 4", label: "Zone D" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Main building image (without label) */}
        <ClickableImageCard
          src={innivistaBuilding}
          alt="Building"
          gridProps={{ xs: 12, md: 12 }}
          onClick={handleImageClick}
        />

        {/* Zone images with labels rendered dynamically */}
        {zoneImages.map((image, index) => (
          <ClickableImageCard
            key={index}
            src={image.src}
            alt={image.alt}
            label={image.label}
            gridProps={{ xs: 12, md: 3 }}
            onClick={handleImageClick}
          />
        ))}
      </Grid>
      {/* Additional dashboard components (e.g., charts, metrics, Heatmap) can be added here */}
    </Box>
  );
};

export default SustainabilityDashboard;
