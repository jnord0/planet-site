import { Button, HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Searching from "./Searching";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ onSearch, searchText }: Props) => {
  return (
    <HStack padding="10px" justifyContent="space-between">
      <Text fontSize="large" fontWeight="bold">
        Is it Habitable?
      </Text>
      <Searching onSearch={onSearch} searchText={searchText} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
