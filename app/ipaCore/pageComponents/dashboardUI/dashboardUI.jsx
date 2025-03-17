import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import {
  ElectricBolt,
  WaterDrop,
  WbSunny,
  Cloud,
  Article,
  Search,
  LocalFireDepartment,
} from "@mui/icons-material";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import PackagesMall from "./img/PackagesMall.png";
import Heatmap from "./components/Heatmap";

// Mock data for graphs
const mockData = {
  electrical: [
    { month: "Jan", value: 90000 },
    { month: "Feb", value: 87000 },
    { month: "Mar", value: 83000 },
    { month: "Apr", value: 79000 },
    { month: "May", value: 85000 },
    { month: "Jun", value: 90000 },
  ],
  solar: [
    { month: "Jan", value: 10000 },
    { month: "Feb", value: 14000 },
    { month: "Mar", value: 13000 },
    { month: "Apr", value: 17000 },
    { month: "May", value: 16000 },
    { month: "Jun", value: 18000 },
  ],
  carbon: [
    { month: "Jan", value: 20000 },
    { month: "Feb", value: 21000 },
    { month: "Mar", value: 18000 },
    { month: "Apr", value: 19000 },
    { month: "May", value: 22000 },
    { month: "Jun", value: 23000 },
  ],
  rainwater: [
    { month: "Jan", value: 30000 },
    { month: "Feb", value: 40000 },
    { month: "Mar", value: 35000 },
    { month: "Apr", value: 45000 },
    { month: "May", value: 38000 },
    { month: "Jun", value: 42000 },
  ],
};

// Navigation handler for images and buttons
const handleImageClick = () => {
  let currentUrl = window.location.href;
  if (currentUrl.endsWith("#/dashboardUI")) {
    currentUrl = currentUrl.replace(/#\/dashboardUI$/, "#/modeldocview");
  } else if (currentUrl.endsWith("#/")) {
    currentUrl = currentUrl.replace(/#\/$/, "#/modeldocview");
  }
  window.location.href = currentUrl;
};

// Common style constants
const commonPaperStyle = {
  bgcolor: "grey.100",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const commonImageStyle = {
  width: "100%",
  height: "auto",
  maxHeight: "250px",
  objectFit: "cover",
};

// Reusable ImageCard component for a clickable image wrapped in Paper
const ImageCard = ({ src, alt, onClick }) => (
  <Paper sx={commonPaperStyle} onClick={onClick}>
    <img src={src} alt={alt} style={commonImageStyle} />
  </Paper>
);

// Reusable ActionButton component for the buttons on the right-hand side
const ActionButton = ({ label, icon: Icon, bgColor, hoverColor, ...rest }) => (
  <Button
    variant="contained"
    startIcon={<Icon />}
    sx={{
      bgcolor: bgColor,
      width: "100%",
      "&:hover": { bgcolor: hoverColor },
    }}
    {...rest}
  >
    {label}
  </Button>
);

// MetricCard component displays a card with a chart
const MetricCard = ({ title, value, unit, color, icon: Icon, data }) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ color, mb: 1 }}>
        {value.toLocaleString()} {unit}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Last 12 months
      </Typography>
      <Box sx={{ mt: "auto" }}>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={data}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="2"
                  dy="2"
                  stdDeviation="3"
                  floodColor={color}
                  floodOpacity={0.5}
                />
              </filter>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={color}
              strokeWidth={2}
              fillOpacity={0.3}
              style={{ filter: "url(#shadow)" }}
            />
            <XAxis hide />
            <YAxis hide />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

const SustainabilityDashboard = () => {
  // Define action buttons in an array so we can DRY out their creation
  const actionButtons = [
    { label: "EPD Documents", icon: Article, bgColor: "#4caf50", hoverColor: "#388e3c" },
    { label: "Traceability", icon: Search, bgColor: "#2196f3", hoverColor: "#1976d2" },
    { label: "Fire Testing", icon: LocalFireDepartment, bgColor: "#ff9800", hoverColor: "#f57c00" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left column: Heatmap */}
        <Grid item xs={12} md={3}>
          <Heatmap onClick={handleImageClick} />
        </Grid>

        {/* Center column: Building image */}
        <Grid item xs={12} md={6}>
          <ImageCard src={PackagesMall} alt="Building" onClick={handleImageClick} />
        </Grid>

        {/* Right column: Action buttons */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 300 }}>
            {actionButtons.map((btn, index) => (
              <ActionButton
                key={index}
                label={btn.label}
                icon={btn.icon}
                bgColor={btn.bgColor}
                hoverColor={btn.hoverColor}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Metrics grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Electrical Consumption"
            value={886950}
            unit="kWh"
            color="#4caf50"
            icon={ElectricBolt}
            data={mockData.electrical}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Solar Generation"
            value={171711}
            unit="kWh"
            color="#ff9800"
            icon={WbSunny}
            data={mockData.solar}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Avoided Carbon"
            value={217303}
            unit="kg"
            color="#795548"
            icon={Cloud}
            data={mockData.carbon}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Rainwater Harvesting"
            value={404853}
            unit="l"
            color="#2196f3"
            icon={WaterDrop}
            data={mockData.rainwater}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SustainabilityDashboard;
