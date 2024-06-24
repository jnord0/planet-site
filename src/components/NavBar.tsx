import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = () => {
  return (
    <HStack padding="10px" justifyContent="space-between">
      <Button>Twin Planet</Button>
      <div>Is it Habitable?</div>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
