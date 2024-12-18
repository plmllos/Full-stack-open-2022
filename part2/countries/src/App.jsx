import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetail";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  const filteredCountry = query
    ? allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase().trim())
      )
    : [];

  const handleQuery = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find countries <input onChange={handleQuery} value={query} />
      </div>
      <div>
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} />
        ) : filteredCountry.length < 11 ? (
          filteredCountry.map((country) => (
            <p key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => showCountry(country)}>show</button>
            </p>
          ))
        ) : (
          "Too many matches, specify another filter"
        )}
      </div>
    </div>
  );
};

export default App;
