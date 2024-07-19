import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import EarthInfo from "./components/EarthInfo";
import PlanetInfo from "./components/PlanetInfo";
import { useState } from "react";
import earth from "./assets/earth.jpeg";
import planet from "./assets/planet.jpeg";
import ResetButton from "./components/ResetButton";

export interface Search {
  holder: string | null;
  searchingText?: string;
}

const initialSearchState: Search = { holder: null, searchingText: "" };

function App() {
  const [search, setSearch] = useState<Search>(initialSearchState);

  const handleSearch = (searchingText: string) => {
    setSearch((prevState) => ({ ...prevState, searchingText }));
  };

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
            onSearch={handleSearch}
            searchText={search.searchingText || ""}
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
          <PlanetInfo search={search} />
        </GridItem>
      </Grid>
      <ResetButton setSearch={setSearch} />
    </>
  );
}

export default App;
