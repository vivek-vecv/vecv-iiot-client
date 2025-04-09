import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertResponse = await axiosInstance.get('/alerts/dailyAlerts');
        setData(alertResponse.data);

        const warningResponse = await axiosInstance.get('/alerts/alertWarnings');
        setWarnings(warningResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="critical" fill="#ff4d4d" />
          <Bar dataKey="medium" fill="#ffcc00" />
          <Bar dataKey="low" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Recent Warnings</h3>
        {warnings.map((warning, index) => (
          <div key={index} style={{ padding: '10px', background: '#f8d7da', marginBottom: '5px', borderRadius: '5px' }}>
            {warning.message} (Value: {warning.value})
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartComponent;
