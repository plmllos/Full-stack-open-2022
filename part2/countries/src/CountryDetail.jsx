const countryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h4> Languages</h4>
      <ul key={Object.keys(country.languages)}>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} style={{ width: "250px" }} />
      <h2> Weather in {country.capital}</h2>
    </div>
  );
};

export default countryDetails;
