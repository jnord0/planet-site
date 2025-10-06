import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Searching from "./Searching";
import HomePageButton from "./HomePageButton";

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
    >
      <HomePageButton />
      <Text
        fontSize="large"
        fontWeight="bold"
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
      >
        Twin Planet
      </Text>
      <Searching onSearch={onSearch} searchText={searchText} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
