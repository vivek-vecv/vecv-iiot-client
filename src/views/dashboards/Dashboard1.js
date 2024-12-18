import React, { useState, useEffect } from "react";
import { Grid, Box, Chip } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import axios from "axios";
import { BlogCard, SalesOverview } from "./dashboard1-components";

const Dashboard1 = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/live-data");
      setData(response.data);
      console.log(response.data); // Log data for debugging
    } catch (err) {
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

  // Define gauge values dynamically based on the fetched data
  const gaugeValues = data.map((item) => ({
    label: `ID: ${item.id}`, // Display the ID as the label for each gauge
    value: parseFloat(item.motor_temp),
    min: 0,
    max: 100,
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Iterate through gaugeValues to create unique gauges */}
        {gaugeValues.map((gauge, index) => (
          <Grid
            key={index}
            item
            xs={12} // Full width on extra-small screens
            sm={6} // Two gauges per row on small screens
            md={4} // Three gauges per row on medium screens
            lg={2.4} // Five gauges in a row on large screens
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200, // Define a fixed height for the container
            }}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              <Gauge
                value={gauge.value} // Unique value for each gauge
                min={gauge.min} // Minimum value
                max={gauge.max} // Maximum value
                startAngle={0} // Start at 0 degrees
                endAngle={360} // End at 360 degrees
                thickness={12} // Thickness of the gauge arc
                showValueLabel={true} // Show the value as text
                label={gauge.label} // Unique label for each gauge
                cornerRadius="50%"
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 35,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#52b202", // Green color for the gauge arc
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                  },
                })}
              />
            </Box>
            <Chip label={"Motor Temp"} variant="outlined" />
          </Grid>
        ))}
        {/* Sales Overview Component */}
        <Grid item xs={12}>
          <SalesOverview />
        </Grid>
        {/* Blog Card Component */}
        <BlogCard />
      </Grid>
    </Box>
  );
};

export default Dashboard1;
