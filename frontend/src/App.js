import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");

const App = () => {
  const [cpuData, setCpuData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);

  useEffect(() => {
    socket.on("cpu_usage", (data) => {
      setCpuData((prevData) => [...prevData.slice(-20), { time: new Date().toLocaleTimeString(), value: data }]);
    });
    socket.on("memory_usage", (data) => {
      setMemoryData((prevData) => [...prevData.slice(-20), { time: new Date().toLocaleTimeString(), value: data }]);
    });
    return () => {
      socket.off("cpu_usage");
      socket.off("memory_usage");
    };
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">OpenShift Monitoring Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">CPU Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cpuData}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Memory Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memoryData}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
