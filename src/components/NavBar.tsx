import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Searching from "./Searching";
import NewPageButton from "./NewPageButton";
import RandomPlanetButton from "./RandomPlanetButton";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ onSearch, searchText }: Props) => {
  return (
    <HStack
      padding="10px"
      justifyContent="space-between"
      bg="blackAlpha.700"
      borderBottom="1px solid"
      borderColor="whiteAlpha.300"
      spacing={4}
      flexWrap="wrap"
    >
      <HStack spacing={2}>
        <NewPageButton />
        <RandomPlanetButton onPlanetSelect={onSearch} />
      </HStack>
      <Text
        fontSize="large"
        fontWeight="bold"
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
      >
        Is it Habitable?
      </Text>
      <HStack spacing={2}>
        <Searching onSearch={onSearch} searchText={searchText} />
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
