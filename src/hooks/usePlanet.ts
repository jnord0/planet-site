import useData from "./useData.ts";


export interface Planet {
    name: string;
    mass: number;
    radius: number;
    temperature: number;
    period: number;
    distance_light_years: number;
    semi_major_axis: number;
    host_star_temperature: number;
    host_star_mass: number;
}

const usePlanet = () => {
    const { data, error, isLoading } = useData<Planet>('mars');
  return { data: data[0], error, isLoading };
}

export default usePlanet;