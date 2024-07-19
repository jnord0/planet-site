import { Button, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Searching from "./Searching";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ onSearch, searchText }: Props) => {
  return (
    <HStack padding="10px" justifyContent="space-between">
      <Button>Twin Planet</Button>
      <div>Is it Habitable?</div>
      <Searching onSearch={onSearch} searchText={searchText} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
