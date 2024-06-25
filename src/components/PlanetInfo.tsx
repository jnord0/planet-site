import { Alert, AlertIcon, List, ListItem, Spinner } from "@chakra-ui/react";
import usePlanet from "../hooks/usePlanet";

const PlanetInfo = () => {
  const { data, error, isLoading } = usePlanet();

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  if (!data) return null;
  return (
    <List>
      <ListItem>Mass (Jupiters): {data.mass}</ListItem>
      <ListItem>Radius (Jupiters): {data.radius}</ListItem>
      <ListItem>Average Surface temp (kelvin): {data.temperature}</ListItem>
      <ListItem>Orbital Period (Days):: {data.period}</ListItem>
      <ListItem>
        Distance from Earth (Light Years): {data.distance_light_years}
      </ListItem>
      <ListItem>Semi Major Axis (AU): {data.semi_major_axis}</ListItem>
      <ListItem>Host Star Temp (Kelvin): {data.host_star_temperature}</ListItem>
      <ListItem>Host Star Mass (Sun): {data.host_star_mass}</ListItem>
    </List>
  );
};

export default PlanetInfo;
