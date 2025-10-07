import { Button } from "@chakra-ui/react";
import { useState } from "react";
import apiClient from "../services/api-client";

interface Props {
  onPlanetSelect: (planetName: string) => void;
}

const RandomPlanetButton = ({ onPlanetSelect }: Props) => {
  const [loading, setLoading] = useState(false);

  const interestingPlanets = [
    "Kepler-452 b",
    "Proxima Centauri b",
    "TRAPPIST-1 e",
    "TRAPPIST-1 d",
    "TRAPPIST-1 f",
    "Kepler-186 f",
    "Kepler-442 b",
    "Kepler-62 f",
    "Kepler-1649 c",
    "TOI-700 d",
    "K2-18 b",
    "LHS 1140 b",
    "Gliese 667 Cc",
    "Kepler-22 b",
    "HD 40307 g",
    "Tau Ceti e",
    "Wolf 1061 c",
    "Kepler-69 c",
    "Kepler-452 b",
    "55 Cancri e",
  ];

  const getRandomPlanet = async () => {
    setLoading(true);

    // Pick a random planet from the list
    const randomIndex = Math.floor(Math.random() * interestingPlanets.length);
    const randomPlanet = interestingPlanets[randomIndex];

    try {
      // Verify the planet exists in the API
      const response = await apiClient.get(`/planets?name=${randomPlanet}`);

      if (response.data && response.data.length > 0) {
        onPlanetSelect(response.data[0].name);
      } else {
        // If not found, try another one
        getRandomPlanet();
      }
    } catch (error) {
      console.error("Error fetching random planet:", error);

      getRandomPlanet();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={getRandomPlanet}
      colorScheme="purple"
      size="md"
      isLoading={loading}
      loadingText="Finding..."
      _hover={{ transform: "scale(1.05)" }}
      transition="all 0.2s"
    >
      Random Planet
    </Button>
  );
};

export default RandomPlanetButton;
