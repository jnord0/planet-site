import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Box, List, ListItem, Spinner } from "@chakra-ui/react";
import { Search } from "../App";

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
interface ApiProps {
  search: Search;
}

const ApiComponent = ({ search }: ApiProps) => {
  const [data, setData] = useState<Planet[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (search.searchingText) {
      setLoading(true);
      setError(null);
      apiClient
        .get(`/planets?name=${search.searchingText}`) // Replace with your specific endpoint
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data, try again.");
          setLoading(false);
        });
    }
  }, [search]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Box color="red.500">{error}</Box>;
  }

  if (!data || data.length === 0) {
    return <Box>No data found, Enter valid planet.</Box>;
  }

  return (
    <>
      <h1>{data[0].name}</h1>
      <List paddingTop={8}>
        <ListItem
          border={"solid"}
          borderColor={"black"}
          backgroundColor={"rgba(0,0,0,0.7)"}
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
          backgroundColor={"rgba(0,0,0,0.7)"}
          marginTop={3}
          marginLeft={3}
          padding={3}
        >
          Radius (Jupiters): {data[0].radius}
        </ListItem>
        <ListItem
          border={"solid"}
          borderColor={"black"}
          backgroundColor={"rgba(0,0,0,0.7)"}
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
          backgroundColor={"rgba(0,0,0,0.7)"}
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
          backgroundColor={"rgba(0,0,0,0.7)"}
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
          backgroundColor={"rgba(0,0,0,0.7)"}
          width={"fit-content"}
          marginTop={3}
          marginLeft={3}
          padding={3}
        >
          Semi Major Axis (AU): {data[0].semi_major_axis}
        </ListItem>
        <ListItem
          border={"solid"}
          borderColor={"black"}
          backgroundColor={"rgba(0,0,0,0.7)"}
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
          backgroundColor={"rgba(0,0,0,0.7)"}
          width={"fit-content"}
          marginTop={3}
          marginLeft={3}
          padding={3}
        >
          Host Star Mass (Sun): {data[0].host_star_mass}
        </ListItem>
      </List>
    </>
  );
};

export default ApiComponent;
