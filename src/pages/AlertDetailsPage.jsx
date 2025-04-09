import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance.js';
import ReactApexChart from 'react-apexcharts';

export default function AlertDetailsPage() {
  const { line, severity, value, duration } = useParams();
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: '12px',
            colors: '#000',
          },
          formatter: (val) => val, // Ensure multi-line works
        },
      },
      title: {
        text: 'Alerts Overview',
        align: 'center',
      },
    },
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axiosInstance.get('/alerts/', {
          params: { line, severity, value, duration },
        });

        setAlerts(response.data);

        // Prepare data for the chart
        const categories = response.data.map((alert) => {
          const date = new Date(alert.createdAt);
          const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          });
          const formattedTime = date.toLocaleTimeString('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'UTC',
          });
          return `${formattedDate}\n${formattedTime}`;
        });

        const values = response.data.map((alert) => alert.value);

        setChartData((prev) => ({
          ...prev,
          series: [{ name: 'Value', data: values }],
          options: {
            ...prev.options,
            xaxis: { categories },
          },
        }));
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, [line, severity, value, duration]);
  console.log(alerts);
  return (
    <div className="p-4 lg:px-12 lg:py-6">
      <h1 className="text-2xl font-bold mb-4">Alert Details</h1>

      <table className="table-auto border-collapse border border-gray-300 w-full mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Line</th>
            <th className="border border-gray-300 px-4 py-2">Severity</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
            <th className="border border-gray-300 px-4 py-2">Tag Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.length > 0 ? (
            alerts.map((alert) => {
              const date = new Date(alert.createdAt);
              const formattedDate = date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'UTC',
              });
              const formattedTime = date.toLocaleTimeString('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
                timeZone: 'UTC',
              });

              return (
                <tr key={alert._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{alert.line}</td>
                  <td className="border border-gray-300 px-4 py-2">{alert.severity}</td>
                  <td className="border border-gray-300 px-4 py-2">{alert.value}</td>
                  <td className="border border-gray-300 px-4 py-2"> {alert.tagName.replace(/_/g, ' ')}</td>
                  <td className="border border-gray-300 px-4 py-2">{formattedDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{formattedTime}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="border border-gray-300 px-4 py-2" colSpan="5">
                No alerts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4">Alerts Overview</h2>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
}
