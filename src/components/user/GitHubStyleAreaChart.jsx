import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import Select from 'react-select';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const GitHubStyleAreaChart = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState([]);

  const generateData = () => {
    const data = [];
    const start = new Date('2023-01-01');
    for (let i = 0; i < 100; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      data.push({
        date: date.toISOString().split('T')[0],
        series1: Math.floor(Math.random() * 100) + 20,
        series2: Math.floor(Math.random() * 100) + 30,
        series3: Math.floor(Math.random() * 100) + 50,
      });
    }
    return data;
  };

  const rawData = generateData();

  const filteredData = rawData.filter((data) => {
    const dataDate = new Date(data.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;

    return (!start || dataDate >= start) && (!end || dataDate <= end);
  });

  const categories = filteredData.map((data) => data.date);

  const chartSeriesData = selectedSeries.map((seriesName) => {
    return {
      name: seriesName,
      data: filteredData.map((data) => data[seriesName]),
    };
  });

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      background: '#f6f8fa',
    },
    xaxis: {
      categories,
      type: 'datetime',
      labels: {
        formatter: function (value, timestamp) {
          const date = new Date(timestamp);
          const day = String(date.getDate()).padStart(2, '0');
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        },
      },
    },
    yaxis: {
      title: { text: 'Value' },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: { opacity: 0.1 },
    tooltip: { x: { format: 'dd-MMM-yyyy' } },
  };

  const seriesOptions = [
    { value: 'series1', label: 'Series 1' },
    { value: 'series2', label: 'Series 2' },
    { value: 'series3', label: 'Series 3' },
  ];

  const handleSeriesChange = (selected) => {
    setSelectedSeries(selected.map((option) => option.value));
  };

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Filtered Data Export', 10, 10);
    const tableData = filteredData.map((item) => {
      const row = { Date: item.date };
      selectedSeries.forEach((series) => {
        row[series] = item[series];
      });
      return row;
    });
    const headers = ['Date', ...selectedSeries];
    const rows = tableData.map((row) => headers.map((header) => row[header]));
    doc.autoTable({ head: [headers], body: rows });
    doc.save('filtered-data.pdf');
  };

  // Export as Excel
  const exportExcel = () => {
    const tableData = filteredData.map((item) => {
      const row = { Date: item.date };
      selectedSeries.forEach((series) => {
        row[series] = item[series];
      });
      return row;
    });
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'filtered-data.xlsx');
  };

  const MyContainer = ({ className, children }) => {
    return (
      <div className="shadow-lg">
        <CalendarContainer className={className}>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="mb-4">
        <div className="flex justify-between">
          <label>
            <DatePicker
              className="border rounded"
              calendarContainer={MyContainer}
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MMM-yyyy hh:mm aa" // Display date with time (12-hour format with AM/PM)
              isClearable
              placeholderText="Select start date and time"
              showTimeSelect // Enable time selection
              showTimeSelectOnly={false} // Allow both date and time selection
              timeIntervals={60} // Set 1 hour interval
              timeFormat="hh:mm aa" // Set time format (12-hour format)
              timeCaption="Time" // Label for time picker
            />
          </label>

          <label style={{ marginLeft: '20px' }}>
            End Date:{' '}
            <DatePicker
              className="border rounded"
              calendarContainer={MyContainer}
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd-MMM-yyyy hh:mm aa" // Display date with time (12-hour format with AM/PM)
              isClearable
              placeholderText="Select end date and time"
              showTimeSelect // Enable time selection
              showTimeSelectOnly={false} // Allow both date and time selection
              timeIntervals={60} // Set 1 hour interval
              timeFormat="hh:mm aa" // Set time format (12-hour format)
              timeCaption="Time" // Label for time picker
            />
          </label>

          <div>
            <button className="btn btn-primary" onClick={exportPDF} style={{ marginRight: '10px' }}>
              Export PDF
            </button>
            <button className="btn btn-primary" onClick={exportExcel}>
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
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
