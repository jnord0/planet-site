import { Grid, GridItem, Image } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import EarthInfo from "./components/EarthInfo";
import PlanetInfo from "./components/PlanetInfo";
import { useState } from "react";
import earth from "./assets/earth.jpeg";
import planet from "./assets/planet.jpeg";
import ResetButton from "./components/ResetButton";

interface Search {
  holder: string | null;
  searchingText?: string;
}

function App() {
  const [search, setSearch] = useState<Search>({} as Search);

  return (
    <>
      {" "}
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
          backgroundImage={earth}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          height={"100%"}
        >
          Earth
          <EarthInfo />
        </GridItem>
        <GridItem
          area="main"
          backgroundImage={planet}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        >
          hi
          <PlanetInfo />
        </GridItem>
      </Grid>
      <ResetButton />
    </>
  );
}

export default App;
