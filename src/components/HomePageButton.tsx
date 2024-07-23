import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePageButton = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Button colorScheme="teal" mr={4}>
        Is it Habitable
      </Button>
    </Link>
  );
};

export default HomePageButton;
