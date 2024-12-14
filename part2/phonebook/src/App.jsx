import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
