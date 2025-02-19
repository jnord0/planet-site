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
        .get(`/planets?name=${search.searchingText}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data, try again.");
          setLoading(false);
        });
    } else {
      setData(null);
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

  let temp = true;
  let checkMass = true;
  let checkRadius = true;

  if (data[0].temperature > 395 || data[0].temperature < 258) {
    temp = false;
  }

  if (data[0].mass > 0.00315 * 5 || data[0].mass < 0.00315 * 0.5) {
    checkMass = false;
  }
  if (data[0].radius > 0.0892 * 3 || data[0].radius < 0.0892 * 0.5) {
    checkRadius = false;
  }
  let type = "";
  let rightType = true;
  const EARTH_RADIUS = 0.0892;
  const EARTH_MASS = 0.00315;
  if (data[0].mass == null) {
    if (data[0].radius >= EARTH_RADIUS * 6) {
      type = "Gas Giant";
      rightType = false;
    } else if (data[0].radius < EARTH_RADIUS * 2) {
      type = "Terrestrial";
      rightType = true;
    } else if (
      data[0].radius > EARTH_RADIUS * 3 &&
      data[0].radius < EARTH_RADIUS * 6
    ) {
      type = "Neptune-Like";
      rightType = false;
    } else if (
      data[0].radius >= EARTH_RADIUS * 2 &&
      data[0].radius < EARTH_RADIUS * 3
    ) {
      type = "Super Earth";
      rightType = true;
    }
  } else {
    if (data[0].radius >= EARTH_RADIUS * 6) {
      type = "Gas Giant";
      rightType = false;
    } else if (data[0].radius < EARTH_RADIUS * 2) {
      type = "Terrestrial";
      rightType = true;
    } else if (
      data[0].radius > EARTH_RADIUS * 2 &&
      data[0].radius < EARTH_RADIUS * 6 &&
      data[0].mass > EARTH_MASS * 5
    ) {
      type = "Neptune-Like";
      rightType = false;
    } else if (
      data[0].radius >= EARTH_RADIUS * 2 &&
      data[0].radius < EARTH_RADIUS * 3 &&
      data[0].mass < EARTH_MASS * 5
    ) {
      type = "Super Earth";
      rightType = true;
    }
  }

  return (
    <>
      <Text fontSize={"x-large"} marginLeft={2} fontWeight={"bold"}>
        {data[0].name}
      </Text>
      {rightType ? (
        <Text
          marginLeft={2}
          borderColor={"green"}
          borderWidth={"1px"}
          width={"fit-content"}
        >
          {type}
        </Text>
      ) : (
        <Text
          marginLeft={2}
          borderColor={"red"}
          borderWidth={"1px"}
          width={"fit-content"}
        >
          {type}
        </Text>
      )}
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={6}
        paddingTop={4}
        height="80vh"
        gridAutoRows="1fr"
      >
        {checkMass ? (
          <GridItem
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"green"}
            overflow="hidden"
            boxShadow="md"
            padding={3}
            margin={2}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="white"
            textAlign={"center"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              Mass (Jupiters):
            </Text>
            <Text>{data[0].mass}</Text>
          </GridItem>
        ) : (
          <GridItem
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"red"}
            overflow="hidden"
            boxShadow="md"
            padding={3}
            margin={2}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="white"
            textAlign={"center"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              Mass (Jupiters):
            </Text>
            <Text>{data[0].mass}</Text>
          </GridItem>
        )}
        {checkRadius ? (
          <GridItem
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"green"}
            overflow="hidden"
            boxShadow="md"
            padding={3}
            margin={2}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="white"
            textAlign={"center"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              Radius (Jupiters):
            </Text>
            <Text>{data[0].radius}</Text>
          </GridItem>
        ) : (
          <GridItem
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"red"}
            overflow="hidden"
            boxShadow="md"
            padding={3}
            margin={2}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="white"
            textAlign={"center"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              Radius (Jupiters):
            </Text>
            <Text>{data[0].radius}</Text>
          </GridItem>
        )}

        {temp ? (
          <GridItem
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"green"}
            overflow="hidden"
            boxShadow="md"
            padding={3}
            margin={2}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="white"
            textAlign={"center"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              Average Surface Temp (Kelvin):
            </Text>
            <Text>{data[0].temperature}</Text>
          </GridItem>
        ) : (
          <GridItem
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"red"}
            overflow="hidden"
            boxShadow="md"
            padding={3}
            margin={2}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="white"
            textAlign={"center"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              Average Surface temp (Kelvin):
            </Text>
            <Text>{data[0].temperature}</Text>
          </GridItem>
        )}
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
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
