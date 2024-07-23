import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NewPageButton = () => {
  return (
    <Link to="/new-page" style={{ textDecoration: "none" }}>
      <Button colorScheme="teal" mr={4}>
        Twin Planet
      </Button>
    </Link>
  );
};

export default NewPageButton;
