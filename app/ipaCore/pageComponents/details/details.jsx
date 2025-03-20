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
  AreaChart,
  Area,
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
  carbonFootprint: 1.0, // kg CO₂
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
    machineUsage: fluctuateValue(70), // around 70% usage
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

// Move sensorReadingsConfig above its usage
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

// ** Metric Card Component with Graph **
const MetricCard = ({ title, value, unit, color, icon: Icon, graphData }) => (
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
        <Typography variant="h5" sx={{ color, mb: 1, fontWeight: "bold" }}>
          {value.toFixed(2)} {unit}
        </Typography>
      </Fade>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={graphData}>
          <defs>
            <filter
              id={`shadow-${title}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
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
            style={{ filter: `url(#shadow-${title})` }}
          />
          <XAxis hide />
          <YAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const SensorReadingCard = ({
  title,
  value,
  unit,
  color,
  icon: Icon,
  updateKey,
  graphData,
}) => (
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
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="h6">{title}</Typography>
        <IconButton sx={{ ml: "auto" }}>
          <InfoOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Fade in={true} key={updateKey} timeout={500}>
        <Typography
          variant="h5"
          sx={{ color, mb: 1, fontWeight: "bold" }}
        >
          {value !== undefined && value !== null ? value.toFixed(2) : "N/A"}{" "}
          {unit}
        </Typography>
      </Fade>
      {/* Spacer pushes the graph container to the bottom */}
      <Box sx={{ mt: "auto" }}>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={graphData}>
            <defs>
              <filter
                id={`shadow-sensor-${title}`}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
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
              strokeWidth={4}
              fillOpacity={0.2}
              style={{ filter: `url(#shadow-sensor-${title})` }}
            />
            <XAxis hide />
            <YAxis hide />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [graphData, setGraphData] = useState(generateGraphData());
  const [metrics, setMetrics] = useState({});
  const [metricsHistory, setMetricsHistory] = useState(() => {
    const init = {};
    Object.keys(baselineValues).forEach((key) => {
      init[key] = [];
    });
    return init;
  });
  const [sensorData, setSensorData] = useState(null);
  const [sensorHistory, setSensorHistory] = useState(() => {
    const init = {};
    sensorReadingsConfig.forEach((reading) => {
      init[reading.key] = [];
    });
    return init;
  });
  const [sensorUpdate, setSensorUpdate] = useState(Date.now());

  // ** Update Graph Data for Bar Chart every 5 seconds **
  useEffect(() => {
    const graphInterval = setInterval(
      () => setGraphData(generateGraphData()),
      5000
    );
    return () => clearInterval(graphInterval);
  }, []);

  // ** Update Metric Values and History every 5 seconds **
  useEffect(() => {
    // Set initial metrics and history
    const initialMetrics = {};
    const initialHistory = {};
    Object.keys(baselineValues).forEach((key) => {
      const val = fluctuateValue(baselineValues[key]);
      initialMetrics[key] = val;
      initialHistory[key] = [{ time: Date.now(), value: val }];
    });
    setMetrics(initialMetrics);
    setMetricsHistory(initialHistory);

    const metricsInterval = setInterval(() => {
      const newMetrics = {};
      Object.keys(baselineValues).forEach((key) => {
        newMetrics[key] = fluctuateValue(baselineValues[key]);
      });
      setMetrics(newMetrics);
      setMetricsHistory((oldHistory) => {
        const newHistory = { ...oldHistory };
        Object.keys(newMetrics).forEach((key) => {
          const newEntry = { time: Date.now(), value: newMetrics[key] };
          newHistory[key] = [...(newHistory[key] || []), newEntry];
          // Limit history to last 12 updates
          if (newHistory[key].length > 12)
            newHistory[key] = newHistory[key].slice(-12);
        });
        return newHistory;
      });
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, []);

  // ** Fetch sensor data from the API every 5 seconds and update sensor history **
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://api.airgradient.com/public/api/v1/locations/88801/measures/current?token=dd4cc2b9-60d4-4a28-9dfd-7890c5a3052f"
        );
        const data = await response.json();
        setSensorData(data);
        setSensorHistory((oldHistory) => {
          const newHistory = { ...oldHistory };
          sensorReadingsConfig.forEach((reading) => {
            const key = reading.key;
            const newEntry = { time: Date.now(), value: data[key] };
            newHistory[key] = [...(newHistory[key] || []), newEntry];
            if (newHistory[key].length > 12)
              newHistory[key] = newHistory[key].slice(-12);
          });
          return newHistory;
        });
        setSensorUpdate(Date.now());
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
    const sensorInterval = setInterval(fetchSensorData, 5000); // update every 5 seconds
    return () => clearInterval(sensorInterval);
  }, []);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Charts Section using Grid */}
      <Grid
        container
        justifyContent="center"
        sx={{ mb: 4, alignItems: "center" }}
      >
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
                <Pie
                  data={energySources}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
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
                <Bar
                  dataKey="electrical"
                  fill="#4caf50"
                  name="Electrical (kWh)"
                />
                <Bar
                  dataKey="machineUsage"
                  fill="#009688"
                  name="Machine Usage (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Metric Cards Section */}
      <Grid container spacing={3}>
        {metricsConfig.map(({ key, title, unit, color, icon: Icon }) => (
          <Grid item xs={12} md={3} key={key}>
            <MetricCard
              title={title}
              value={metrics[key] || baselineValues[key]}
              unit={unit}
              color={color}
              icon={Icon}
              graphData={metricsHistory[key] || []}
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
                graphData={sensorHistory[reading.key] || []}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
