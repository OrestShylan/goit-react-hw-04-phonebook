import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { v4 as uuid } from 'uuid';

const LOCALSTORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    const isExistContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExistContact) {
      alert(`${newContact.name} is already in contacts.`);
      return false;
    }
    setContacts(prevState => [...contacts, { ...newContact, id: uuid() }]);
    return true;
  };

  const handleRemoveContact = id => {
    setContacts(prevState => contacts.filter(contact => contact.id !== id));
    // const newContacts = contacts.filter(contact => contact.id !== id);
    // setContacts(newContacts);
  };

  const handleFilterChange = filter => setFilter(filter);

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="formSection">
      <h1>Phone book</h1>
      <ContactForm onAdd={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filterContacts} onRemove={handleRemoveContact} />
    </div>
  );
};

export default App;
