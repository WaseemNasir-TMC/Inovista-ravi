import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Fade,
} from "@mui/material";
import {
  ElectricBolt,
  WaterDrop,
  WbSunny,
  Cloud,
  BatteryChargingFull,
  Speed,
  Factory,
  InfoOutlined,
  Thermostat,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// ** Metrics Configuration (Removed Temperature, Air Quality, and Humidity) **
const metricsConfig = [
  {
    key: "electrical",
    title: "Electrical Consumption",
    unit: "kWh",
    color: "#4caf50",
    icon: ElectricBolt,
  },
  {
    key: "batteryStorage",
    title: "Battery Storage",
    unit: "kWh",
    color: "#673ab7",
    icon: BatteryChargingFull,
  },
  {
    key: "machineEfficiency",
    title: "Machine Efficiency",
    unit: "%",
    color: "#009688",
    icon: Speed,
  },
  {
    key: "carbonFootprint",
    title: "Carbon Footprint",
    unit: "kg CO₂",
    color: "#e53935",
    icon: Factory,
  },
];

// ** Baseline values for a building floor (Removed Temperature, Air Quality, and Humidity) **
const baselineValues = {
  electrical: 10, // kWh
  batteryStorage: 25, // kWh
  machineEfficiency: 90, // %
  carbonFootprint: 1.0,  // kg CO₂
};

// ** Function to fluctuate value by 1 to 2 percent **
const fluctuateValue = (baseline) => {
  const fluctuationPercentage = Math.random() * (0.02 - 0.01) + 0.01;
  const addOrSubtract = Math.random() < 0.5 ? -1 : 1;
  return baseline * (1 + addOrSubtract * fluctuationPercentage);
};

// ** Energy Source Data for a building floor **
const energySources = [
  { name: "Grid", value: 60, color: "#4caf50" },
  { name: "Solar", value: 25, color: "#ff9800" },
  { name: "Battery", value: 10, color: "#673ab7" },
  { name: "Backup Generator", value: 5, color: "#e53935" },
];

// ** Generate Realistic Data for Graphs for a building floor **
const generateGraphData = () =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => ({
    month,
    electrical: fluctuateValue(150), // around 150 kWh
    machineUsage: fluctuateValue(70),  // around 70% usage
  }));

const handleButtonClick = () => {
  let currentUrl = window.location.href;
  if (currentUrl.endsWith("#/details")) {
    currentUrl = currentUrl.replace(/#\/details$/, "#/modeldocview");
  } else if (currentUrl.endsWith("#/")) {
    currentUrl = currentUrl.replace(/#\/$/, "#/modeldocview");
  }
  window.location.href = currentUrl;
};

// ** Metric Card Component **
const MetricCard = ({ title, value, unit, color, icon: Icon }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      p: 2,
      borderRadius: 2,
      boxShadow: 3,
      transition: "all 0.3s",
      ":hover": { transform: "scale(1.03)", boxShadow: 5 },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="h6">{title}</Typography>
        <IconButton sx={{ ml: "auto" }}>
          <InfoOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Fade in={true} key={value} timeout={500}>
        <Typography variant="h4" sx={{ color, mb: 1, fontWeight: "bold" }}>
          {value.toFixed(2)} {unit}
        </Typography>
      </Fade>
    </CardContent>
  </Card>
);

// ** Sensor Reading Card Component (Individual Cards) **
// Now includes a prop 'updateKey' to force fade effect on every update.
const SensorReadingCard = ({ title, value, unit, color, icon: Icon, updateKey }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      p: 2,
      borderRadius: 2,
      boxShadow: 3,
      transition: "all 0.3s",
      ":hover": { transform: "scale(1.03)", boxShadow: 5 },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="h6">{title}</Typography>
        <IconButton sx={{ ml: "auto" }}>
          <InfoOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Fade in={true} key={updateKey} timeout={500}>
        <Typography variant="h4" sx={{ color, mb: 1, fontWeight: "bold" }}>
          {value !== undefined && value !== null ? value.toFixed(2) : "N/A"} {unit}
        </Typography>
      </Fade>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [graphData, setGraphData] = useState(generateGraphData());
  const [metrics, setMetrics] = useState({});
  const [sensorData, setSensorData] = useState(null);
  const [sensorUpdate, setSensorUpdate] = useState(Date.now());

  useEffect(() => {
    // Update graph data every 5 seconds
    const graphInterval = setInterval(() => setGraphData(generateGraphData()), 5000);

    // Update metric values every 5 seconds
    const metricsInterval = setInterval(() => {
      const newMetrics = {};
      Object.keys(baselineValues).forEach((key) => {
        newMetrics[key] = fluctuateValue(baselineValues[key]);
      });
      setMetrics(newMetrics);
    }, 5000);

    // Set initial metrics
    const initialMetrics = {};
    Object.keys(baselineValues).forEach((key) => {
      initialMetrics[key] = fluctuateValue(baselineValues[key]);
    });
    setMetrics(initialMetrics);

    // Cleanup intervals
    return () => {
      clearInterval(graphInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  // ** Fetch sensor data from the API every 5 seconds **
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://api.airgradient.com/public/api/v1/locations/88801/measures/current?token=dd4cc2b9-60d4-4a28-9dfd-7890c5a3052f"
        );
        const data = await response.json();
        setSensorData(data);
        // Update sensorUpdate even if data remains the same to trigger fade effect
        setSensorUpdate(Date.now());
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
    const sensorInterval = setInterval(fetchSensorData, 5000); // update every 5 seconds
    return () => clearInterval(sensorInterval);
  }, []);

  // Configuration for individual sensor reading cards
  const sensorReadingsConfig = [
    {
      key: "pm01",
      title: "PM1",
      unit: "µg/m³",
      icon: Cloud,
      color: "#1976d2",
    },
    {
      key: "pm02",
      title: "PM2.5",
      unit: "µg/m³",
      icon: Cloud,
      color: "#1976d2",
    },
    {
      key: "pm10",
      title: "PM10",
      unit: "µg/m³",
      icon: Cloud,
      color: "#1976d2",
    },
    {
      key: "atmp",
      title: "Temperature",
      unit: "°C",
      icon: Thermostat,
      color: "#ff9800",
    },
    {
      key: "rhum",
      title: "Humidity",
      unit: "%",
      icon: WaterDrop,
      color: "#2196f3",
    },
    {
      key: "rco2",
      title: "CO₂",
      unit: "ppm",
      icon: Factory,
      color: "#e53935",
    },
    {
      key: "tvoc",
      title: "TVOC",
      unit: "ppb",
      icon: InfoOutlined,
      color: "#795548",
    },
  ];

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Charts Section using Grid */}
      <Grid container justifyContent="center" sx={{ mb: 4, alignItems: "center" }}>
        {/* View 2D Model Button */}
        <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleButtonClick}
            sx={{
              backgroundColor: "#2D5783",
              color: "white",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 2,
              boxShadow: 3,
              transition: "all 0.3s",
              ":hover": { transform: "scale(1.03)", boxShadow: 5 },
            }}
          >
            View 2D Model
          </Button>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={5.5}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Energy Source Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={energySources} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                  {energySources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [`${val}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6.5}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Energy Trends & Equipment Usage
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={graphData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="electrical" fill="#4caf50" name="Electrical (kWh)" />
                <Bar dataKey="machineUsage" fill="#009688" name="Machine Usage (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Metric Cards Section (Now only using the remaining dummy metrics) */}
      <Grid container spacing={3}>
        {metricsConfig.map(({ key, title, unit, color, icon: Icon }) => (
          <Grid item xs={12} md={3} key={key}>
            <MetricCard
              title={title}
              value={metrics[key] || baselineValues[key]}
              unit={unit}
              color={color}
              icon={Icon}
            />
          </Grid>
        ))}
      </Grid>

      {/* Individual Sensor Reading Cards Section */}
      {sensorData && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {sensorReadingsConfig.map((reading) => (
            <Grid item xs={12} md={3} key={reading.key}>
              <SensorReadingCard
                title={reading.title}
                value={sensorData[reading.key]}
                unit={reading.unit}
                color={reading.color}
                icon={reading.icon}
                updateKey={sensorUpdate}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
