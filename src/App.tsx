import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import EarthInfo from "./components/EarthInfo";
import PlanetInfo from "./components/PlanetInfo";
import { useState } from "react";

interface Search {
  holder: string | null;
  searchingText?: string;
}

function App({ searchingText }: Search) {
  const [search, setSearch] = useState<Search>({} as Search);

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav " "aside main"` }}
      templateColumns={{
        base: "1fr",
        lg: "50% 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchingText) =>
            setSearch((prevState) => ({ ...prevState, searchingText }))
          }
        />
      </GridItem>
      <GridItem
        area="aside"
        style={{ backgroundImage: 'url("./assets/earth.jpeg")' }}
      >
        Earth
        <EarthInfo />
      </GridItem>
      <GridItem area="main" backgroundColor={"grey"}>
        hi
        <PlanetInfo />
      </GridItem>
    </Grid>
  );
}

export default App;
