import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { axiosInstance } from '../api/axiosInstance.js';

const cbmStatusOptions = {
  title: { text: 'Plant Online CBM All Tag Overall Status', left: 'center' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { bottom: 0 },
  xAxis: { type: 'category', data: ['Machine Shop', 'Paint Shop', 'LMD Line', 'HD Line', 'Cab Trim'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Normal',
      type: 'bar',
      label: {
        show: true, // Enable label display
        // position: '', // Position label on top of bars
        color: '#000', // Label color
        fontSize: 10, // Font size
      },
      stack: 'total',
      data: [15, 23, 11, 8, 19],
      color: '#4CAF50',
      barWidth: 20,
    },
    {
      name: 'Warning',
      type: 'bar',
      label: {
        show: true, // Enable label display
        // Position label on top of bars
        color: '#000', // Label color
        fontSize: 10, // Font size
      },
      stack: 'total',
      data: [2, 1, 3, 1, 3],
      color: '#FFC107',
      barWidth: 20,
    },
    {
      name: 'Critical',
      type: 'bar',
      label: {
        show: true, // Enable label display
        // Position label on top of bars
        color: '#000', // Label color
        fontSize: 10, // Font size
      },
      stack: 'total',
      data: [4, 2, 2, 1, 1],
      color: '#F44336',
      barWidth: 20,
    },
  ],
};

const cbmPlanOptions = {
  title: { text: 'Monthly CBM Plan VS Actual', left: 'center' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { bottom: 0 },
  xAxis: { type: 'category', data: ['Machine Shop', 'Paint Shop', 'LMD Line', 'HD Line', 'Cab Trim'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Plan',
      type: 'bar',
      data: [23, 14, 9, 7, 13],
      label: {
        show: true,
        position: 'top',
      },
      color: '#2196F3',
      barWidth: 15,
    },
    {
      name: 'Actual',
      type: 'bar',
      data: [13, 8, 5, 6, 9],
      label: {
        show: true,
        position: 'top',
      },
      color: '#4CAF50',
      barWidth: 20,
    },
  ],
};

const CBMDashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axiosInstance.get('/alerts/alertWarnings');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alert warnings:', error);
      }
    };

    fetchAlerts(); // Initial fetch
    const interval = setInterval(fetchAlerts, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatDateTime = (utcString) => {
    const dateObj = new Date(utcString);
    const date = dateObj.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
    const time = dateObj.toISOString().split('T')[1].split('.')[0]; // Extracts HH:MM:SS
    return `${date} ${time}`; // Combines date & time
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-6">
        {/* First Chart - CBM Status */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <ReactECharts option={cbmStatusOptions} style={{ height: 300 }} />
        </div>

        {/* Second Chart - Plan vs Actual */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <ReactECharts option={cbmPlanOptions} style={{ height: 300 }} />
        </div>
      </div>

      {/* Active Alarm Window */}
      <div className="mt-6 bg-white shadow-lg rounded-lg">
        <h2 className="bg-red-500 text-white text-lg font-semibold p-3">Active Alarm Window</h2>
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="p-2">Machine</th>
              <th className="p-2">Severity</th>
              <th className="p-2">Tag</th>
              <th className="p-2">Value</th>
              <th className="p-2">Time</th>
              <th className="p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <tr key={alert.id} className="bg-gray-200 text-center">
                  {' '}
                  {/* Add key prop here */}
                  <td className="p-2">{alert.machineName}</td>
                  <td
                    className={`p-2 font-semibold ${
                      alert.severity === 'critical'
                        ? 'text-red-600'
                        : alert.severity === 'medium'
                        ? 'text-orange-500'
                        : 'text-green-600'
                    }`}
                  >
                    {alert.severity}
                  </td>
                  <td className="p-2">{alert.tagName}</td>
                  <td className="p-2">{alert.value}</td>
                  <td className="p-2">{formatDateTime(alert.createdAt)}</td>
                  <td className="p-2">{alert.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No Active alarms
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CBMDashboard;
