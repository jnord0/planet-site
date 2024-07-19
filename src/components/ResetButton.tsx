import { Button, Center } from "@chakra-ui/react";
import { Search } from "../App";

interface ApiProps {
  setSearch: React.Dispatch<React.SetStateAction<Search>>;
}

const ResetButton = ({ setSearch }: ApiProps) => {
  const handleReset = () => {
    setSearch({ holder: null, searchingText: "" });
  };

  return <Button onClick={handleReset}>Reset</Button>;
};

export default ResetButton;
