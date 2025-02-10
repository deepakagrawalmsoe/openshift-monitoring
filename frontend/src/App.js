import React, { useEffect, useState } from "react";

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch("/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data));
  }, []);

  return (
    <div>
      <h1>OpenShift Monitoring Dashboard</h1>
      {metrics ? (
        <pre>{JSON.stringify(metrics, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
