import {
  Box,
  Grid,
  HStack,
  Text,
  VStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

interface EarthData {
  name: string;
  mass: number;
  radius: number;
  temperature: number;
  period: number;
  semiMajorAxis: number;
  distanceLightYear: number;
  hostStarMass: number;
  hostStarTemp: number;
}

const earthData: EarthData = {
  name: "Earth",
  mass: 0.00315,
  radius: 0.0892,
  temperature: 288,
  period: 365.2,
  semiMajorAxis: 1,
  distanceLightYear: 0,
  hostStarMass: 1,
  hostStarTemp: 6000,
};

interface HabitableRangeBarProps {
  label: string;
  earthValue: number;
  minHabitable: number;
  maxHabitable: number;
  unit: string;
}

const HabitableRangeBar = ({
  label,
  earthValue,
  minHabitable,
  maxHabitable,
  unit,
}: HabitableRangeBarProps) => {
  // Calculate positions as percentages
  const range = maxHabitable - minHabitable;
  const earthPosition = ((earthValue - minHabitable) / range) * 100;

  return (
    <Box
      p={4}
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(8px)"
      borderRadius="lg"
      borderWidth="2px"
      borderColor="green.400"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "xl",
        borderColor: "green.300",
      }}
    >
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.700">
          {label}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="white">
          {earthValue} {unit}
        </Text>
      </HStack>

      <Box
        position="relative"
        h="24px"
        bg="whiteAlpha.200"
        borderRadius="full"
        overflow="hidden"
      >
        {/* Habitable zone (green background) */}
        <Box
          position="absolute"
          left="0"
          top="0"
          bottom="0"
          right="0"
          bgGradient="linear(to-r, red.900, green.500, green.500, red.900)"
        />

        {/* Earth marker */}
        <Box
          position="absolute"
          left={`${earthPosition}%`}
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex={3}
        >
          <Box
            w="12px"
            h="12px"
            borderRadius="full"
            bg="cyan.400"
            border="3px solid white"
            boxShadow="0 0 10px rgba(0, 200, 255, 0.8)"
          />
        </Box>
      </Box>
      <HStack
        justify="space-between"
        mt={2}
        fontSize="xs"
        color="whiteAlpha.600"
      >
        <VStack spacing={0} align="flex-start">
          <Text color="red.400" fontWeight="bold">
            Min
          </Text>
          <Text>{minHabitable}</Text>
        </VStack>
        <VStack spacing={0}>
          <Text color="cyan.400" fontWeight="bold">
            🌍 Earth
          </Text>
          <Text>{earthValue}</Text>
        </VStack>
        <VStack spacing={0} align="flex-end">
          <Text color="red.400" fontWeight="bold">
            Max
          </Text>
          <Text>{maxHabitable}</Text>
        </VStack>
      </HStack>
      <Text
        fontSize="xs"
        color="green.400"
        mt={2}
        textAlign="center"
        fontWeight="semibold"
      >
        ✓ Habitable Range: {minHabitable} - {maxHabitable} {unit}
      </Text>
    </Box>
  );
};

const EarthInfo = () => {
  const EARTH_MASS = 0.00315;
  const EARTH_RADIUS = 0.0892;

  return (
    <Box overflowY="auto" height="100%" p={4}>
      {/* Perfect Habitability Score */}
      <Box
        bg="blackAlpha.800"
        backdropFilter="blur(10px)"
        p={6}
        borderRadius="xl"
        mb={6}
        textAlign="center"
        borderWidth="2px"
        borderColor="green.400"
      >
        <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
          HABITABILITY SCORE
        </Text>
        <HStack justify="center" spacing={6}>
          <CircularProgress
            value={100}
            size="120px"
            thickness="8px"
            color="green.400"
          >
            <CircularProgressLabel>
              <Text fontSize="3xl" fontWeight="bold" color="green.400">
                100
              </Text>
              <Text fontSize="sm" color="whiteAlpha.600">
                /100
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
          <VStack align="flex-start" spacing={2}>
            <HStack>
              <Box w={3} h={3} borderRadius="full" bg="green.400" />
              <Text fontSize="sm" color="white">
                Perfect Temperature
              </Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} borderRadius="full" bg="green.400" />
              <Text fontSize="sm" color="white">
                Ideal Mass
              </Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} borderRadius="full" bg="green.400" />
              <Text fontSize="sm" color="white">
                Perfect Radius
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Text fontSize="xs" color="green.400" mt={3} fontWeight="semibold">
          🌍 Reference Planet - All exoplanets compared to Earth
        </Text>
      </Box>

      {/* Habitable Range Bars */}
      <VStack spacing={4} align="stretch">
        <HabitableRangeBar
          label="Mass"
          earthValue={earthData.mass}
          minHabitable={EARTH_MASS * 0.5}
          maxHabitable={EARTH_MASS * 5}
          unit="Jupiters"
        />

        <HabitableRangeBar
          label="Radius"
          earthValue={earthData.radius}
          minHabitable={EARTH_RADIUS * 0.5}
          maxHabitable={EARTH_RADIUS * 3}
          unit="Jupiters"
        />

        <HabitableRangeBar
          label="Temperature"
          earthValue={earthData.temperature}
          minHabitable={258}
          maxHabitable={395}
          unit="K"
        />

        <HabitableRangeBar
          label="Orbital Period"
          earthValue={earthData.period}
          minHabitable={200}
          maxHabitable={500}
          unit="Days"
        />

        {/* Additional Info Cards */}
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={4}
          mt={4}
        >
          <Box
            p={4}
            bg="rgba(0, 0, 0, 0.8)"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="green.500"
          >
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
              Distance from Sun
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {earthData.semiMajorAxis}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              AU (Astronomical Units)
            </Text>
          </Box>

          <Box
            p={4}
            bg="rgba(0, 0, 0, 0.8)"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="green.500"
          >
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
              Star (Sun) Mass
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {earthData.hostStarMass}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              Solar Masses
            </Text>
          </Box>

          <Box
            p={4}
            bg="rgba(0, 0, 0, 0.8)"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="green.500"
          >
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
              Sun Temperature
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {earthData.hostStarTemp}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              Kelvin
            </Text>
          </Box>
        </Grid>

        {/* Info box explaining the ranges */}
        <Box
          bg="blue.900"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.500"
          mt={2}
        >
          <Text fontSize="sm" color="blue.200" fontWeight="semibold" mb={2}>
            About Habitable Zones
          </Text>
          <Text fontSize="xs" color="blue.100">
            These ranges represent conditions where liquid water could exist and
            life as we know it might be possible. Planets outside these ranges
            may still be interesting, but are less likely to support Earth-like
            life.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default EarthInfo;
