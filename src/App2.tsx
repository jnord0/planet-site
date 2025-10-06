import { Grid, GridItem, Box } from "@chakra-ui/react";
import "./App.css";
import NavBar2 from "./components/NavBar2";
import TwinSide from "./components/TwinSide";
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
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Grid
        templateAreas={{
          base: `"nav" "aside" "main"`,
          md: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          md: "50% 50%",
        }}
        templateRows={{
          base: "auto 1fr 1fr",
          md: "auto 1fr",
        }}
        flex="1"
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
          overflowY="auto"
        >
          <TwinSide search={search} />
        </GridItem>
        <GridItem
          area="main"
          backgroundImage={planet}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          overflowY="auto"
        >
          <SearchSide search={search} />
        </GridItem>
      </Grid>

      <Box
        textAlign="center"
        py={3}
        bg="blackAlpha.600"
        borderTop="1px solid"
        borderColor="whiteAlpha.300"
      >
        <ResetButton setSearch={setSearch} />
      </Box>
    </Box>
  );
}

export default App;
