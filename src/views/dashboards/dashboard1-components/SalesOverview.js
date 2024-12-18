import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";

const SalesOverview = () => {
  const [inletData, setinletData] = useState([]);
  const [categoryData, setCateGData] = useState([]);
  const [highData, setihighData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // const response = await axios.get("http://localhost:3000/api/live-data");
      // setData(response.data);
      // const apiData = response.data;
      // categoryData = apiData.map((item) => `ID-${item.id}`); // Use 'id' as category
      // seriesData = apiData.map((item) => parseInt(item.high_pressure));
      // inletData = apiData.map((item) => parseInt(item.inlet_pressure));

      // console.log(categoryData);
      // console.log(seriesData);
      // console.log(inletData);
      // Log data for debugging

      const response = await axios.get("http://localhost:3000/api/live-data");
      console.log("API Response:", response.data); // Log response
      if (response.data && Array.isArray(response.data)) {
        const categData = response.data.map((item) => `ID-${item.id}`);
        const seriesData = response.data.map((item) =>
          parseFloat(item.inlet_pressure || 0)
        );
        const highhData = response.data.map((item) =>
          parseFloat(item.high_pressure || 0)
        );
        setihighData(highhData);
        setinletData(seriesData);
        setCateGData(categData);
      } else {
        console.error("Invalid data format");
      }
    } catch (err) {
      console.error("API Fetch Error:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    // Fetch data immediately on initial render
    fetchData();

    // Set up an interval to fetch data every 45 seconds
    const intervalId = setInterval(fetchData, 30000); // 30000 ms = 30 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    colors: ["#FF4560", "#1e4db7"], // Line colors
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0, // No markers for cleaner lines
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "numeric", // Numeric type for real-time scrolling
      range: 10, // Visible range for real-time effect
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: 100, // Adjust range to fit data
      tickAmount: 8,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3, // Line thickness
      lineCap: "round",
      colors: ["#FF4560", "#1e4db7"], // Line colors
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriessalesoverview = [
    {
      name: "High Pressure",
      data: highData,
    },
    {
      name: "Inlet Pressure",
      data: inletData,
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        paddingBottom: "0",
      }}
    >
      <CardContent
        sx={{
          paddingBottom: "16px !important",
        }}
      >
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              CBM Temp Data
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "secondary.main",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "secondary.main",
                }}
              >
                High Pressure
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                }}
              >
                Inlet Pressure
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          <Chart
            options={optionssalesoverview}
            series={seriessalesoverview}
            type="line"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
