import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Box, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
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
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={6}
        paddingTop={8}
      >
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Mass (Jupiters):
          </Text>
          <Text>{data[0].mass}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Radius (Jupiters):
          </Text>
          <Text>{data[0].radius}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Average Surface temp (Kelvin):
          </Text>
          <Text>{data[0].temperature}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Orbital Period (Days):
          </Text>
          <Text>{data[0].period}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Distance from Earth (Light Years):
          </Text>
          <Text>{data[0].distance_light_year}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Semi Major Axis (AU):
          </Text>
          <Text>{data[0].semi_major_axis}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Host Star Temp (Kelvin):
          </Text>
          <Text>{data[0].host_star_temperature}</Text>
        </GridItem>
        <GridItem
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          padding={3}
          margin={2}
          backgroundColor="rgba(0, 0, 0, 0.7)"
          color="white"
          textAlign={"center"}
        >
          <Text fontSize="lg" fontWeight="bold">
            Host Star Mass (Sun):
          </Text>
          <Text>{data[0].host_star_mass}</Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default ApiComponent;
