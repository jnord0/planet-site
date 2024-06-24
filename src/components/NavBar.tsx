import { Button, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

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
