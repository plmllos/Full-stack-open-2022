import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber,
    };

    const duplicate = persons.some((person) => person.name === newPerson.name);
    if (duplicate) {
      alert(`${newPerson.name} is already addded to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
    setQuery("");
  };

  const filteredPersons = query
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase().trim())
      )
    : persons;

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onchange={handleQuery} value={query} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons filter={filteredPersons} />
    </div>
  );
};

export default App;
