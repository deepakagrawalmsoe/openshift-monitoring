import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ cpu: 0, memory: 0, pods: [] });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("http://localhost:5000/metrics"); // Flask backend
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">CPU Usage</h2>
          <Progress value={metrics.cpu} />
          <p>{metrics.cpu}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Memory Usage</h2>
          <Progress value={metrics.memory} />
          <p>{metrics.memory}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Pods Status</h2>
          <ul>
            {metrics.pods.map((pod, index) => (
              <li key={index} className="flex items-center gap-2">
                {pod.healthy ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <AlertCircle className="text-red-500" />
                )}
                {pod.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
