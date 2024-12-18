import { useEffect, useState } from "react";
import axios from "axios";

const countryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_SOME_KEY;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`;
  const imgUrl = "http://openweathermap.org/img/w";

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setWeather(response);
    });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h4> Languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} style={{ width: "250px" }} />
      <h2> Weather in {country.capital}</h2>
      <p> temperature {weather?.data?.main.temp} Celcius </p>
      <img src={`${imgUrl}/${weather?.data?.weather[0].icon}.png`} />
      <p> wind {weather?.data?.wind.speed} m/s </p>
    </div>
  );
};

export default countryDetails;
