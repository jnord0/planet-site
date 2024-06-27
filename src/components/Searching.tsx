import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

const Searching = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  //<InputLeftElement children={<BsSearch />} />

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search Planets..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default Searching;
