import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import {
  Box,
  Grid,
  HStack,
  Spinner,
  Text,
  VStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
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

interface ComparisonBarProps {
  label: string;
  value: number;
  earthValue: number;
  unit: string;
  isHabitable?: boolean;
}

const ComparisonBar = ({
  label,
  value,
  earthValue,
  unit,
  isHabitable,
}: ComparisonBarProps) => {
  // Handle null/undefined values
  if (value === null || value === undefined || isNaN(value)) {
    return (
      <Box
        p={4}
        bg="blackAlpha.700"
        backdropFilter="blur(8px)"
        borderRadius="lg"
        borderWidth="2px"
        borderColor="gray.500"
        transition="all 0.3s"
      >
        <HStack justify="space-between" mb={2}>
          <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.700">
            {label}
          </Text>
          <Text fontSize="md" color="whiteAlpha.500" fontStyle="italic">
            No data available
          </Text>
        </HStack>
      </Box>
    );
  }

  const percentage = (value / earthValue) * 100;
  const displayPercentage = Math.min(Math.max(percentage, 0), 200);
  const difference = (value / earthValue - 1) * 100;
  const diffColor = Math.abs(difference) < 50 ? "green.400" : "orange.400";

  return (
    <Box
      p={4}
      bg="blackAlpha.700"
      backdropFilter="blur(8px)"
      borderRadius="lg"
      borderWidth="2px"
      borderColor={
        isHabitable === undefined
          ? "gray.500"
          : isHabitable
          ? "green.400"
          : "red.400"
      }
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "xl",
      }}
    >
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.700">
          {label}
        </Text>
        <VStack spacing={0} align="flex-end">
          <Text fontSize="xl" fontWeight="bold" color="white">
            {value.toFixed(4)} {unit}
          </Text>
          <Text fontSize="xs" color={diffColor}>
            {difference > 0 ? "+" : ""}
            {difference.toFixed(1)}% vs Earth
          </Text>
        </VStack>
      </HStack>

      <Box
        position="relative"
        h="20px"
        bg="whiteAlpha.200"
        borderRadius="full"
        overflow="hidden"
      >
        {/* Earth reference line at 50% */}
        <Box
          position="absolute"
          left="50%"
          top="0"
          bottom="0"
          w="2px"
          bg="cyan.400"
          zIndex={2}
        />

        {/* Value bar */}
        <Box
          h="100%"
          w={`${displayPercentage / 2}%`}
          bg={
            isHabitable === undefined
              ? "blue.500"
              : isHabitable
              ? "green.500"
              : "red.500"
          }
          transition="all 0.5s"
          bgGradient={
            isHabitable === undefined
              ? "linear(to-r, blue.600, blue.400)"
              : isHabitable
              ? "linear(to-r, green.600, green.400)"
              : "linear(to-r, red.600, red.400)"
          }
        />
      </Box>

      <HStack
        justify="space-between"
        mt={1}
        fontSize="xs"
        color="whiteAlpha.500"
      >
        <Text>0</Text>
        <Text color="cyan.400" fontWeight="bold">
          🌍 {earthValue}
        </Text>
        <Text>{(earthValue * 2).toFixed(2)}</Text>
      </HStack>
    </Box>
  );
};

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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text color="white" mt={4} fontSize="lg">
          Searching the cosmos...
        </Text>
      </Box>
    );
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        textAlign="center"
        p={8}
      >
        <Box
          bg="blackAlpha.700"
          backdropFilter="blur(10px)"
          p={8}
          borderRadius="xl"
          boxShadow="xl"
        >
          <Text fontSize="4xl" mb={3}>
            🔭
          </Text>
          <Text fontSize="xl" color="white" fontWeight="bold" mb={3}>
            No Planet Found
          </Text>
          <Text fontSize="md" color="whiteAlpha.700" mb={4}>
            Try searching for exoplanets like:
          </Text>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text color="cyan.300" fontSize="sm">
              • Kepler-452 b
            </Text>
            <Text color="cyan.300" fontSize="sm">
              • Proxima Centauri b
            </Text>
            <Text color="cyan.300" fontSize="sm">
              • TRAPPIST-1 e
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  const planet = data[0];

  // Habitability checks
  const EARTH_MASS = 0.00315;
  const EARTH_RADIUS = 0.0892;
  const EARTH_TEMP = 288;

  const tempHabitable = planet.temperature >= 258 && planet.temperature <= 395;
  const massHabitable =
    planet.mass >= EARTH_MASS * 0.5 && planet.mass <= EARTH_MASS * 5;
  const radiusHabitable =
    planet.radius >= EARTH_RADIUS * 0.5 && planet.radius <= EARTH_RADIUS * 3;

  // Calculate habitability score
  const calculateHabitabilityScore = (): number => {
    let score = 0;

    // Temperature (0-40 points)
    if (tempHabitable) score += 40;
    else if (planet.temperature >= 200 && planet.temperature <= 450)
      score += 20;
    else if (planet.temperature >= 150 && planet.temperature <= 500)
      score += 10;

    // Mass (0-30 points)
    if (massHabitable) score += 30;
    else if (planet.mass >= EARTH_MASS * 0.3 && planet.mass <= EARTH_MASS * 8)
      score += 15;
    else if (planet.mass >= EARTH_MASS * 0.1 && planet.mass <= EARTH_MASS * 10)
      score += 5;

    // Radius (0-30 points)
    if (radiusHabitable) score += 30;
    else if (
      planet.radius >= EARTH_RADIUS * 0.3 &&
      planet.radius <= EARTH_RADIUS * 5
    )
      score += 15;
    else if (
      planet.radius >= EARTH_RADIUS * 0.1 &&
      planet.radius <= EARTH_RADIUS * 8
    )
      score += 5;

    return score;
  };

  const habitabilityScore = calculateHabitabilityScore();

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "green.400";
    if (score >= 60) return "lime.400";
    if (score >= 40) return "yellow.400";
    if (score >= 20) return "orange.400";
    return "red.400";
  };

  return (
    <Box overflowY="auto" height="100%" p={4}>
      {/* Header with planet name and type */}
      <Box mb={6}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="white"
          textShadow="0 0 20px rgba(100, 200, 255, 0.6), 2px 2px 8px blackAlpha.700"
          mb={2}
        >
          {planet.name}
        </Text>
        <HStack spacing={3}>
          <Box
            display="inline-block"
            px={3}
            py={1}
            borderRadius="full"
            bg={rightType ? "green.500" : "red.500"}
            color="white"
            fontSize="sm"
            fontWeight="bold"
            boxShadow="md"
          >
            {type}
          </Box>
        </HStack>
      </Box>

      {/* Habitability Score */}
      <Box
        bg="blackAlpha.700"
        backdropFilter="blur(10px)"
        p={6}
        borderRadius="xl"
        mb={6}
        textAlign="center"
        borderWidth="2px"
        borderColor={getScoreColor(habitabilityScore)}
      >
        <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
          HABITABILITY SCORE
        </Text>
        <HStack justify="center" spacing={6}>
          <CircularProgress
            value={habitabilityScore}
            size="120px"
            thickness="8px"
            color={getScoreColor(habitabilityScore)}
          >
            <CircularProgressLabel>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color={getScoreColor(habitabilityScore)}
              >
                {habitabilityScore}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.600">
                /100
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
          <VStack align="flex-start" spacing={2}>
            <HStack>
              <Box
                w={3}
                h={3}
                borderRadius="full"
                bg={tempHabitable ? "green.400" : "red.400"}
              />
              <Text fontSize="sm" color="white">
                Temperature
              </Text>
            </HStack>
            <HStack>
              <Box
                w={3}
                h={3}
                borderRadius="full"
                bg={massHabitable ? "green.400" : "red.400"}
              />
              <Text fontSize="sm" color="white">
                Mass
              </Text>
            </HStack>
            <HStack>
              <Box
                w={3}
                h={3}
                borderRadius="full"
                bg={radiusHabitable ? "green.400" : "red.400"}
              />
              <Text fontSize="sm" color="white">
                Radius
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      {/* Comparison Bars */}
      <VStack spacing={4} align="stretch">
        <ComparisonBar
          label="Mass"
          value={planet.mass}
          earthValue={EARTH_MASS}
          unit="Jupiters"
          isHabitable={massHabitable}
        />
        <ComparisonBar
          label="Radius"
          value={planet.radius}
          earthValue={EARTH_RADIUS}
          unit="Jupiters"
          isHabitable={radiusHabitable}
        />
        <ComparisonBar
          label="Temperature"
          value={planet.temperature}
          earthValue={EARTH_TEMP}
          unit="K"
          isHabitable={tempHabitable}
        />
        <ComparisonBar
          label="Orbital Period"
          value={planet.period}
          earthValue={365.2}
          unit="Days"
        />
        <ComparisonBar
          label="Semi Major Axis"
          value={planet.semi_major_axis}
          earthValue={1}
          unit="AU"
        />

        {/* Additional Info Cards */}
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={4}
          mt={4}
        >
          <Box
            p={4}
            bg="blackAlpha.700"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="gray.500"
          >
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
              Distance from Earth
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {planet.distance_light_year.toFixed(2)}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              Light Years
            </Text>
          </Box>

          <Box
            p={4}
            bg="blackAlpha.700"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="gray.500"
          >
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
              Host Star Mass
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {planet.host_star_mass.toFixed(2)}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              Solar Masses
            </Text>
          </Box>

          <Box
            p={4}
            bg="blackAlpha.700"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="gray.500"
          >
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
              Host Star Temp
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {planet.host_star_temperature}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              Kelvin
            </Text>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default ApiComponent;
