const Persons = ({ filter, handleDelete }) => {
  return (
    <div>
      {filter.map((person) => (
        <ul key={person.id}>
          <li>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}> delete </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Persons;
