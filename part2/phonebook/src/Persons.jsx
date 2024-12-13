const Persons = ({ filter }) => {
  return (
    <div>
      {filter.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
