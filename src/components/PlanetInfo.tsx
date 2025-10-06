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

interface StatCardProps {
  label: string;
  value: number;
  isHabitable?: boolean;
}

const StatCard = ({ label, value, isHabitable }: StatCardProps) => (
  <GridItem
    borderWidth="2px"
    borderRadius="lg"
    borderColor={
      isHabitable === undefined
        ? "gray.500"
        : isHabitable
        ? "green.400"
        : "red.400"
    }
    overflow="hidden"
    boxShadow="md"
    padding={3}
    margin={2}
    backgroundColor="rgba(0, 0, 0, 0.7)"
    color="white"
    textAlign="center"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    height="100%"
    transition="all 0.3s"
    _hover={{
      transform: "translateY(-4px)",
      boxShadow: "xl",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      borderColor:
        isHabitable === undefined
          ? "gray.400"
          : isHabitable
          ? "green.300"
          : "red.300",
    }}
  >
    <Text fontSize="lg" fontWeight="bold">
      {label}
    </Text>
    <Text fontSize="xl">{value}</Text>
  </GridItem>
);

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
          setData(response.data as Planet[]);
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
    return <Spinner size="xl" color="blue.500" />;
  }

  if (error) {
    return (
      <Box color="red.500" fontSize="lg" p={4}>
        {error}
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box fontSize="lg" p={4}>
        No data found. Enter a valid planet name.
      </Box>
    );
  }

  const planet = data[0];

  // Habitability checks
  const EARTH_MASS = 0.00315;
  const EARTH_RADIUS = 0.0892;

  const tempHabitable = planet.temperature >= 258 && planet.temperature <= 395;
  const massHabitable =
    planet.mass >= EARTH_MASS * 0.5 && planet.mass <= EARTH_MASS * 5;
  const radiusHabitable =
    planet.radius >= EARTH_RADIUS * 0.5 && planet.radius <= EARTH_RADIUS * 3;

  // Planet type classification
  let type = "";
  let rightType = true;

  if (planet.mass == null) {
    if (planet.radius >= EARTH_RADIUS * 6) {
      type = "Gas Giant";
      rightType = false;
    } else if (planet.radius < EARTH_RADIUS * 2) {
      type = "Terrestrial";
      rightType = true;
    } else if (
      planet.radius > EARTH_RADIUS * 3 &&
      planet.radius < EARTH_RADIUS * 6
    ) {
      type = "Neptune-Like";
      rightType = false;
    } else if (
      planet.radius >= EARTH_RADIUS * 2 &&
      planet.radius < EARTH_RADIUS * 3
    ) {
      type = "Super Earth";
      rightType = true;
    }
  } else {
    if (planet.radius >= EARTH_RADIUS * 6) {
      type = "Gas Giant";
      rightType = false;
    } else if (planet.radius < EARTH_RADIUS * 2) {
      type = "Terrestrial";
      rightType = true;
    } else if (
      planet.radius > EARTH_RADIUS * 2 &&
      planet.radius < EARTH_RADIUS * 6 &&
      planet.mass > EARTH_MASS * 5
    ) {
      type = "Neptune-Like";
      rightType = false;
    } else if (
      planet.radius >= EARTH_RADIUS * 2 &&
      planet.radius < EARTH_RADIUS * 3 &&
      planet.mass < EARTH_MASS * 5
    ) {
      type = "Super Earth";
      rightType = true;
    }
  }

  return (
    <>
      <Text fontSize="x-large" marginLeft={2} fontWeight="bold">
        {planet.name}
      </Text>
      <Text
        marginLeft={2}
        borderColor={rightType ? "green" : "red"}
        borderWidth="1px"
        width="fit-content"
        px={2}
        py={1}
        borderRadius="md"
      >
        {type}
      </Text>

      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={6}
        paddingTop={4}
        height="80vh"
        gridAutoRows="1fr"
      >
        <StatCard
          label="Mass (Jupiters)"
          value={planet.mass}
          isHabitable={massHabitable}
        />
        <StatCard
          label="Radius (Jupiters)"
          value={planet.radius}
          isHabitable={radiusHabitable}
        />
        <StatCard
          label="Temperature (Kelvin)"
          value={planet.temperature}
          isHabitable={tempHabitable}
        />
        <StatCard label="Orbital Period (Days)" value={planet.period} />
        <StatCard
          label="Distance (Light Years)"
          value={planet.distance_light_year}
        />
        <StatCard label="Semi Major Axis (AU)" value={planet.semi_major_axis} />
        <StatCard
          label="Host Star Temp (Kelvin)"
          value={planet.host_star_temperature}
        />
        <StatCard label="Host Star Mass (Suns)" value={planet.host_star_mass} />
      </Grid>
    </>
  );
};

export default ApiComponent;
