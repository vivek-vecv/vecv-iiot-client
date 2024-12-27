import { useEffect, useState } from 'react';
import { useAlertStore } from '../store/useAlertStore.js';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

const prepareChartData = (alertCounts) => {
  const lines = Object.keys(alertCounts);
  const criticalCounts = lines.map((line) => alertCounts[line].critical || 0);
  const mediumCounts = lines.map((line) => alertCounts[line].medium || 0);
  const lowCounts = lines.map((line) => alertCounts[line].low || 0);

  return {
    series: [
      { name: 'Critical', data: criticalCounts },
      { name: 'Medium', data: mediumCounts },
      { name: 'Low', data: lowCounts },
    ],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        background: '#ffffff',
      },
      colors: [
        '#E63946', // Critical: Rich red
        '#FFB703', // Medium: Golden yellow
        '#2A9D8F', // Low: Soft green
      ],
      xaxis: {
        categories: lines,
        title: { text: 'Lines' },
      },
      yaxis: {
        title: { text: 'Count' },
      },
      legend: {
        position: 'top',
      },
      title: {
        text: 'Alerts by Severity',
        align: 'center',
      },
      tooltip: {
        theme: 'light',
      },
    },
  };
};

export default function Dashboard() {
  const { fetchAlerts, fetchAlertCounts } = useAlertStore();
  const [alertCounts24Hours, setAlertCounts24Hours] = useState({});
  const [alertCounts1Week, setAlertCounts1Week] = useState({});

  useEffect(() => {
    const loadData = async () => {
      // Fetch alerts (if needed for another part of the component)
      //   await fetchAlerts();

      // Fetch counts for last 24 hours and last 7 days
      const counts24h = await fetchAlertCounts('24h');
      const counts7d = await fetchAlertCounts('7d');

      // Set the state with the fetched counts
      setAlertCounts24Hours(counts24h);
      setAlertCounts1Week(counts7d);
    };
    loadData();
  }, [fetchAlerts, fetchAlertCounts]);

  const renderTable = (alertCounts, duration) => {
    const header = ['Line', 'Total', 'Critical', 'Medium', 'Low'];
    const data = Object.entries(alertCounts).map(([line, counts]) => [
      line,
      counts.total,
      counts.critical,
      counts.medium,
      counts.low,
    ]);

    return (
      <div className="hover:overflow-auto overflow-hidden max-h-64 border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="sticky top-0 bg-base-100 shadow-md" style={{ zIndex: 10 }}>
            <tr>
              {header.map((header, index) => (
                <th key={index} className="bg-base-100 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="text-center hover:rounded-lg hover:text-white hover:bg-gray-400 cursor-pointer hover:font-bold transition-all"
                  >
                    {cellIndex === 0 ? ( // First column is the "Line" column, no link needed
                      <span>{cell}</span>
                    ) : (
                      <Link
                        to={`/alerts/${row[0]}/${header[cellIndex].toLowerCase()}/${cell}/${duration}`}
                        className="w-full h-full"
                      >
                        {cell}
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="p-2 font-bold bg-info text-white px-2 rounded-lg shadow-lg">Last 24 Hours</div>
      <div className="grid grid-cols-2 gap-4">
        {/* Last 24 Hours Card */}
        <div className="card bg-base-100 shadow-md p-3">
          <div className="py-0">{renderTable(alertCounts24Hours, '24h')}</div>
        </div>
        <div className="p-3 rounded-lg shadow-lg bg-white overflow-hidden">
          <ReactApexChart
            className="rounded"
            options={prepareChartData(alertCounts24Hours).options}
            series={prepareChartData(alertCounts24Hours).series}
            type="bar"
            height={256}
          />
        </div>
      </div>

      <div className="p-2 font-bold bg-info text-white px-2 rounded-lg shadow-lg">Last 7 Days</div>
      <div className="grid grid-cols-2 gap-4">
        {/* Last 7 Days Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="p-3 rounded-t-lg"></div>
          <div className="card-body py-0">{renderTable(alertCounts1Week, '7d')}</div>
        </div>
        <div className=" p-3 rounded-lg shadow-lg bg-white overflow-hidden">
          <ReactApexChart
            options={prepareChartData(alertCounts1Week).options}
            series={prepareChartData(alertCounts1Week).series}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
}
