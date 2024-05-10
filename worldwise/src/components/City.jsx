import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const City = ({ cities }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const cityData = useMemo(() => {
    return cities.find((city) => city.id === parseInt(id));
  }, [id, cities]);

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <h1>
      {" "}
      Position: {lat}, {lng}
    </h1>
  );
};

export default City;
