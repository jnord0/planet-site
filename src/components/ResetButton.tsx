import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

const ResetButton = ({ onClick }: Props) => {
  return <Button>Reset</Button>;
};

export default ResetButton;
