import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { List, ListItem } from "@chakra-ui/react";

interface Planet {
  name: string;
  mass: number;
  radius: number;
  period: number;
  semi_major_axis: number;
  temperature: number;
  distance_light_year: number;
  host_star_mass: number;
  host_star_temperature: number;
}

const ApiComponent = () => {
  const [data, setData] = useState<Planet[] | null>(null);

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
    <List paddingTop={8}>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Mass (Jupiters): {data[0].mass}
      </ListItem>
      <ListItem
        width={"fit-content"}
        border={"solid"}
        borderColor={"black"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Radius (Jupiters): {data[0].radius}
      </ListItem>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Average Surface temp (Kelvin): {data[0].temperature}
      </ListItem>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Orbital Period (Days): {data[0].period}
      </ListItem>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Distance from Earth (Light Years): {data[0].distance_light_year}
      </ListItem>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Semi Major Axis (AU):: {data[0].semi_major_axis}
      </ListItem>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Host Star Temp (Kelvin): {data[0].host_star_temperature}
      </ListItem>
      <ListItem
        border={"solid"}
        borderColor={"black"}
        width={"fit-content"}
        marginTop={3}
        marginLeft={3}
        padding={3}
      >
        Host Star Mass (Sun): {data[0].host_star_mass}
      </ListItem>
    </List>
  );
};

export default ApiComponent;
