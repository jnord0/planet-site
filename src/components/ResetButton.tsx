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
    <Button marginBottom={3} onClick={handleReset}>
      Reset
    </Button>
  );
};

export default ResetButton;
