import style from './App.module.scss';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import ContactForm from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '+38(066)4591256' },
    { id: 'id-2', name: 'Hermione Kline', number: '+38(067)4438912' },
    { id: 'id-3', name: 'Eden Clements', number: '+38(063)6451779' },
    { id: 'id-4', name: 'Annie Copeland', number: '+38(073)2279126' },
  ]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  const handleAddContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const normalizedName = contact.name.toLowerCase();
    const checkedForName = contacts.find(
      contact => normalizedName === contact.name.toLowerCase()
    );

    if (checkedForName) {
      return alert(`${contact.name} is already in contacts`);
    }

    setContacts([...contacts, contact]);
  };

  function handleDeleteContact(contactId) {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  }

  const formSubmitHandler = (name, number) => {
    handleAddContact(name, number);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  function getFilterContact() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <div className={style.container}>
      <div className={style.img}></div>
      <h1 className={style.titlePrimary}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={style.titleSecondary}>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilterContact()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
