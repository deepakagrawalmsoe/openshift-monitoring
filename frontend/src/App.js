import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const App = () => {
  const [cpuData, setCpuData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/metrics");
        const { cpuUsage, memoryUsage } = response.data;

        setCpuData((prev) => [...prev.slice(-9), { time: new Date().toLocaleTimeString(), value: cpuUsage }]);
        setMemoryData((prev) => [...prev.slice(-9), { time: new Date().toLocaleTimeString(), value: memoryUsage }]);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", padding: "20px", textAlign: "center" }}>
      <h2>OpenShift Monitoring Dashboard</h2>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={cpuData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name="CPU Usage (%)" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={memoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Memory Usage (MB)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
