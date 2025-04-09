import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTagStore } from '../../store/useTagStore.js';

const GitHubStyleAreaChart = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState([]);

  // Get the historic data and loading state from the store
  const { getHistoricData, historicData, isHistoricDataLoading } = useTagStore();

  // Set default date range to last 24 hours
  useEffect(() => {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 12 * 60 * 60 * 1000); // 24 hours ago

    setStartDate(last24Hours); // Set start date to 24 hours ago
    setEndDate(now); // Set end date to current time

    // Fetch data for the last 24 hours
    getHistoricData(last24Hours.toISOString(), now.toISOString());

    const timer = setTimeout(() => {
      handleSeriesChange(seriesOptions); // Calls it automatically after 8 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, [getHistoricData]);

  // Call getHistoricData when both dates are selected
  const handleFetchData = () => {
    if (startDate && endDate) {
      const fromDate = startDate.toISOString();
      const toDate = endDate.toISOString();
      getHistoricData(fromDate, toDate);
    }
  };
  const seriesOptions = [
    { value: 'input Pressure', label: 'input Pressure' },
    { value: 'output Pressure', label: 'output Pressure' },
    { value: 'pump Vibration', label: 'pump Vibration' },
    { value: 'motor temperature', label: 'Motor Temperature' },
    { value: 'pump temperature', label: 'pump temperature' },
  ];

  const handleSeriesChange = (selected) => {
    setSelectedSeries(selected.map((option) => option.value));
  };

  // Format the data for the chart
  // const chartSeriesData = selectedSeries.map((seriesName) => {
  //   console.log(seriesName);
  //   return {
  //     name: seriesName,
  //     data: historicData.map((data) => data[seriesName]),
  //   };
  // });

  const chartSeriesData = selectedSeries.map((seriesName) => {
    return {
      name: seriesName,
      data: historicData.map((data) => ({
        x: data.timestamp, // Use timestamp for x-axis
        y: parseFloat(data[seriesName]), // Parse the values to floats
      })),
    };
  });
  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      background: '#f6f8fa',
    },
    xaxis: {
      categories: historicData.map((data) => data.timestamp),
      type: 'datetime',
    },
    yaxis: {
      title: { text: 'Value' },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: { opacity: 0.1 },
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-wrap justify-between">
        <label className="flex gap-2 items-center">
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            className="input py-1 px-3 border border-primary"
            dateFormat="dd-MMM-yyyy hh:mm aa"
            isClearable
          />
        </label>
        <label className="flex gap-2 items-center">
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            className="input py-1 px-3 border border-primary"
            dateFormat="dd-MMM-yyyy hh:mm aa"
            isClearable
          />
        </label>

        <button onClick={handleFetchData} disabled={isHistoricDataLoading} className="btn btn-primary">
          {isHistoricDataLoading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>

      <div>
        <Select
          isMulti
          name="series"
          options={seriesOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSeriesChange}
          value={seriesOptions}
        />
      </div>

      <Chart options={chartOptions} series={chartSeriesData} type="area" height={350} />
    </div>
  );
};

export default GitHubStyleAreaChart;
