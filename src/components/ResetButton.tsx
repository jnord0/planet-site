import { Button } from "@chakra-ui/react";
import { Search } from "../App";

interface ApiProps {
  setSearch: React.Dispatch<React.SetStateAction<Search>>;
}

const ResetButton = ({ setSearch }: ApiProps) => {
  const handleReset = () => {
    setSearch({ holder: null, searchingText: "" });
  };

  return (
    <Button
      onClick={handleReset}
      colorScheme="blue"
      size="md"
      _hover={{ transform: "scale(1.05)" }}
      transition="all 0.2s"
    >
      Reset
    </Button>
  );
};

export default ResetButton;
