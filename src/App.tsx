import { Grid, GridItem, Text, Box } from "@chakra-ui/react";
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
            overflowY="auto"
          >
            <Text
              fontSize={{ base: "lg", md: "x-large" }}
              marginLeft={2}
              fontWeight={"bold"}
              color="white"
            >
              Earth
            </Text>
            <Text
              marginLeft={2}
              borderWidth={"1px"}
              width={"fit-content"}
              color="white"
              borderColor="white"
              px={2}
            >
              Terrestrial
            </Text>
            <EarthInfo />
          </GridItem>
          <GridItem
            area="main"
            backgroundImage={planet}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            overflowY="auto"
          >
            <PlanetInfo search={search} />
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
    </>
  );
}

export default App;
