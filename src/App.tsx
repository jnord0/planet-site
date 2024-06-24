import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav " "aside main"` }}
      templateColumns={{
        base: "1fr",
        lg: "50% 1fr",
      }}
    >
      <GridItem area="nav" backgroundColor={"black"}>
        <NavBar />
      </GridItem>
      <GridItem area="aside" backgroundColor={"grey"}>
        hi
      </GridItem>
      <GridItem area="main" backgroundColor={"grey"}>
        hi
      </GridItem>
    </Grid>
  );
}

export default App;
