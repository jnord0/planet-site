import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

interface Info {
  id: string;
  name: string;
  stats: number;
}

const EarthInfo = () => {
  const earth: Info[] = [
    { id: "mass", name: "Mass (Jupiters)", stats: 0.00315 },
    { id: "radius", name: "Radius (Jupiters)", stats: 0.0892 },
    { id: "temperature", name: "Average Surface temp (Kelvin)", stats: 288 },
    { id: "period", name: "Orbital Period (Days)", stats: 365.2 },
    {
      id: "distance_light_year",
      name: "Distance from Earth (Light Years)",
      stats: 0,
    },
    { id: "semi_major_axis", name: "Semi Major Axis (AU)", stats: 1 },
    {
      id: "host_star_temperature",
      name: "Host Star Temp (Kelvin)",
      stats: 6000,
    },
    { id: "host_star_mass", name: "Host Star Mass (Sun)", stats: 1 },
  ];

  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gap={6}
      paddingTop={8}
    >
      {earth.map(({ id, name, stats }) => (
        <GridItem key={id}>
          <Box
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
              {name}:
            </Text>
            <Text>{stats}</Text>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default EarthInfo;
