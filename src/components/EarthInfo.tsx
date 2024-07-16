import { List, ListItem } from "@chakra-ui/react";

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
    <List paddingTop={8}>
      {earth.map((_earths, index) => (
        <ListItem
          border={"solid"}
          borderColor={"black"}
          backgroundColor={"rgba(0,0,0,0.7)"}
          padding={3}
          width={"fit-content"}
          marginTop={3}
          marginLeft={3}
          key={earth[index].id}
        >
          {earth[index].name}: {earth[index].stats}
        </ListItem>
      ))}
    </List>
  );
};

export default EarthInfo;
