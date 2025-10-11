import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import apiClient from "../services/api-client";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
}

interface Planet {
  name: string;
}

const Searching = ({ onSearch, searchText }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Planet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (searchText) {
      setError(null);
      apiClient
        .get(`/planets?name=${searchText}`)
        .then((response) => {
          setData(response.data as Planet[]);
          setShowSuggestions(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data, try again.");
        });
    } else {
      setData(null);
      setShowSuggestions(false);
    }
  }, [searchText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };

  const handlePlanetClick = (planetName: string) => {
    onSearch(planetName);
    setShowSuggestions(false);
    if (ref.current) {
      ref.current.value = planetName;
      ref.current.blur();
    }
  };

  return (
    <Box position="relative" width="300px">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) {
            onSearch(ref.current.value);
            setShowSuggestions(false);
          }
        }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BsSearch color="gray.300" />
          </InputLeftElement>
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search Planets..."
            variant="filled"
            value={searchText}
            onChange={handleInputChange}
            onFocus={() => data && setShowSuggestions(true)}
            _hover={{ bg: "whiteAlpha.200" }}
            _focus={{ bg: "whiteAlpha.300", borderColor: "blue.400" }}
          />
        </InputGroup>
      </form>

      {error && (
        <Box
          color="red.400"
          mt={2}
          fontSize="sm"
          bg="red.900"
          p={2}
          borderRadius="md"
        >
          {error}
        </Box>
      )}

      {showSuggestions && data && data.length > 0 && (
        <VStack
          position="absolute"
          top="calc(100% + 4px)"
          left={0}
          right={0}
          bg="blackAlpha.800"
          backdropFilter="blur(10px)"
          borderRadius="md"
          boxShadow="xl"
          border="1px solid"
          borderColor="whiteAlpha.300"
          zIndex={1000}
          spacing={0}
          overflow="hidden"
          maxH="300px"
          overflowY="auto"
        >
          {data.slice(0, 8).map((planet, index) => (
            <Button
              key={planet.name}
              width="100%"
              variant="ghost"
              justifyContent="flex-start"
              borderRadius={0}
              py={3}
              px={4}
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              onClick={() => handlePlanetClick(planet.name)}
              borderTop={index > 0 ? "1px solid" : "none"}
              borderColor="gray.700"
              textAlign="left"
            >
              <Text fontSize="md" fontWeight="medium">
                {planet.name}
              </Text>
            </Button>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Searching;
