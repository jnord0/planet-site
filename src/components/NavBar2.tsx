import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Searching from "./Searching";
import HomePageButton from "./HomePageButton";
import ResetButton from "./ResetButton";
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
        <HomePageButton />
        <RandomPlanetButton onPlanetSelect={onSearch}></RandomPlanetButton>
      </HStack>
      <Text
        fontSize="large"
        fontWeight="bold"
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
        color={"white"}
      >
        Twin Planet
      </Text>
      <HStack spacing={2}>
        <Searching onSearch={onSearch} searchText={searchText} />
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
