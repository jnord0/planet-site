import { Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";
import NavBar2 from "./components/NavBar2";
import EarthInfo from "./components/EarthInfo";
import SearchSide from "./components/SearchSide";
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
        height="100vh"
      >
        <GridItem area="nav">
          <NavBar2
            onSearch={handleSearch}
            searchText={search.searchingText || ""}
          />
        </GridItem>
        <GridItem
          area="aside"
          backgroundImage={earth}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          height="90vh"
        >
          <EarthInfo />
        </GridItem>
        <GridItem
          area="main"
          backgroundImage={planet}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          height="90vh"
        >
          <SearchSide search={search} />
        </GridItem>
      </Grid>
      <center>
        <ResetButton setSearch={setSearch} />
      </center>
    </>
  );
}

export default App;
