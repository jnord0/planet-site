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
  const [twinPlanetInfo, setTwinPlanetInfo] = useState<Planet | null>(null);

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

  const callingApi = async (planetName: string): Promise<Planet> => {
    const response = await apiClient.get(`/planets?name=${planetName}`);
    return response.data[0];
  };

  let type = "";
  const findTwinPlanet = async (planetInfo: Planet) => {
    let planets: string[] = [];

    const EARTH_RADIUS = 0.0892;
    const EARTH_MASS = 0.00315;

    if (planetInfo.mass == null) {
      if (planetInfo.radius >= EARTH_RADIUS * 6) {
        type = "Gas Giant";
      } else if (planetInfo.radius < EARTH_RADIUS * 2) {
        type = "Terrestrial";
      } else if (
        planetInfo.radius > EARTH_RADIUS * 3 &&
        planetInfo.radius < EARTH_RADIUS * 6
      ) {
        type = "Neptune-Like";
      } else if (
        planetInfo.radius >= EARTH_RADIUS * 2 &&
        planetInfo.radius < EARTH_RADIUS * 3
      ) {
        type = "Super Earth";
      }
    } else {
      if (planetInfo.radius >= EARTH_RADIUS * 6) {
        type = "Gas Giant";
      } else if (planetInfo.radius < EARTH_RADIUS * 2) {
        type = "Terrestrial";
      } else if (
        planetInfo.radius > EARTH_RADIUS * 2 &&
        planetInfo.radius < EARTH_RADIUS * 6 &&
        planetInfo.mass > EARTH_MASS * 5
      ) {
        type = "Neptune-Like";
      } else if (
        planetInfo.radius >= EARTH_RADIUS * 2 &&
        planetInfo.radius < EARTH_RADIUS * 3 &&
        planetInfo.mass < EARTH_MASS * 5
      ) {
        type = "Super Earth";
      }
    }

    if (type === "Neptune-Like") {
      planets = ["uranus", "neptune"];
    } else if (type === "Super Earth" || type === "Terrestrial") {
      planets = ["mercury", "venus", "earth", "mars"];
    } else if (type === "Gas Giant") {
      planets = ["jupiter", "saturn"];
    }

    let minDiff = Infinity;
    let twinPlanet = "";

    for (let planetName of planets) {
      const planetInformation = await callingApi(planetName);
      const totalDiff =
        Math.abs(planetInfo.mass - planetInformation.mass) +
        Math.abs(planetInfo.radius - planetInformation.radius) +
        Math.abs(planetInfo.temperature - planetInformation.temperature) +
        Math.abs(planetInfo.period - planetInformation.period);

      if (totalDiff < minDiff) {
        minDiff = totalDiff;
        twinPlanet = planetName;
      }
    }

    if (twinPlanet) {
      const twinPlanetData = await callingApi(twinPlanet);
      setTwinPlanetInfo(twinPlanetData);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      findTwinPlanet(data[0]);
    }
  }, [data]);

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
      {twinPlanetInfo && (
        <>
          <Text fontSize={"x-large"} marginLeft={2} fontWeight={"bold"}>
            {twinPlanetInfo.name}
          </Text>
          <Text marginLeft={2} borderWidth={"1px"} width={"fit-content"}>
            {type}
          </Text>
          <Text marginLeft={2} borderWidth={"1px"} width={"fit-content"}></Text>
          <Grid
            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={6}
            paddingTop={4}
            height="80vh"
            gridAutoRows="1fr"
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
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Text fontSize="lg" fontWeight="bold">
                Mass (Jupiters):
              </Text>
              <Text>{twinPlanetInfo.mass}</Text>
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
                Radius (Jupiters):
              </Text>
              <Text>{twinPlanetInfo.radius}</Text>
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
                Average Surface Temp (Kelvin):
              </Text>
              <Text>{twinPlanetInfo.temperature}</Text>
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
                Orbital Period (Days):
              </Text>
              <Text>{twinPlanetInfo.period}</Text>
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
              <Text>{twinPlanetInfo.distance_light_year}</Text>
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
              <Text>{twinPlanetInfo.semi_major_axis}</Text>
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
                Host Star Mass (Suns):
              </Text>
              <Text>{twinPlanetInfo.host_star_mass}</Text>
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
                Host Star Temperature (Kelvin):
              </Text>
              <Text>{twinPlanetInfo.host_star_temperature}</Text>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
};

export default ApiComponent;
