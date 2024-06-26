import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const ApiComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiClient
      .get("/planets?name=Earth") // Replace with your specific endpoint
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiComponent;
