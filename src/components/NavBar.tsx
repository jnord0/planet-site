import { Button, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Button></Button>
      <h1>Is it Habitable?</h1>
    </HStack>
  );
};

export default NavBar;
