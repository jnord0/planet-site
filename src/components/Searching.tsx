import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Search } from "../App";
import apiClient from "../services/api-client";

interface Props {
  onSearch: (searchText: string) => void;
}

interface Planet {
  name: string;
}

const Searching = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Planet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (searchText) {
      setError(null);
      apiClient
        .get(`/planets?name=${searchText}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data, try again.");
        });
    } else {
      setData(null);
    }
  }, [searchText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
        console.log(ref.current?.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search Planets..."
          variant="filled"
          value={searchText}
          onChange={handleInputChange}
        />
      </InputGroup>
      {error && <p>{error}</p>}
      {data && (
        <ul>
          {data.slice(0, 3).map((planet) => (
            <li key={planet.name}>{planet.name}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Searching;
