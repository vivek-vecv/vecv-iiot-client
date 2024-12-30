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
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    setStartDate(last24Hours); // Set start date to 24 hours ago
    setEndDate(now); // Set end date to current time

    // Fetch data for the last 24 hours
    getHistoricData(last24Hours.toISOString(), now.toISOString());
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
    { value: 'Input Pressure', label: 'Input Pressure' },
    { value: 'Output Pressure', label: 'Output Pressure' },
    { value: 'Pump Vibration', label: 'Pump Vibration' },
    { value: 'Motor Temperature', label: 'Motor Temperature' },
    { value: 'Pump Temperature', label: 'Pump Temperature' },
  ];

  const handleSeriesChange = (selected) => {
    setSelectedSeries(selected.map((option) => option.value));
  };

  // Format the data for the chart
  const chartSeriesData = selectedSeries.map((seriesName) => {
    return {
      name: seriesName,
      data: historicData.map((data) => data[seriesName]),
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
    <div style={{ padding: '20px' }}>
      <div className="mb-4">
        <label>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="dd-MMM-yyyy hh:mm aa"
            isClearable
          />
        </label>
        <label>
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="dd-MMM-yyyy hh:mm aa"
            isClearable
          />
        </label>

        <button onClick={handleFetchData} disabled={isHistoricDataLoading}>
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
        />
      </div>

      <Chart options={chartOptions} series={chartSeriesData} type="area" height={350} />
    </div>
  );
};

export default GitHubStyleAreaChart;
