import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber,
    };

    const duplicatePerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (duplicatePerson) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to the phonebook. Replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const changeNumber = { ...duplicatePerson, number: newNumber };

        personService
          .update(duplicatePerson.id, changeNumber)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === duplicatePerson.id ? response.data : person
              )
            );
          });
      }
    } else {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
      });
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

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .delete(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

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
      <Persons filter={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
