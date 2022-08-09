import style from './App.module.scss';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+38(066)4591256' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38(067)4438912' },
      { id: 'id-3', name: 'Eden Clements', number: '+38(063)6451779' },
      { id: 'id-4', name: 'Annie Copeland', number: '+38(073)2279126' },
    ],

    filter: '',
  };

  componentDidMount() {
    try {
      const contacts = localStorage.getItem('contacts');
      const parseContacts = JSON.parse(contacts);
      if (parseContacts) {
        this.setState({ contacts: parseContacts });
      }
    } catch (error) {
      this.setState({ error: 'SORRY, Backend is unavailable today!' });
    }
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const normalizedName = contact.name.toLowerCase();
    const checkedForName = this.state.contacts.find(
      contact => normalizedName === contact.name.toLowerCase()
    );
    if (checkedForName) {
      return alert(`${contact.name} is already in contacts`);
    }

    this.setState({ contacts: [...this.state.contacts, contact] });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  formSubmitHandler = data => {
    this.handleAddContact(data);
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filterContacts = this.getFilterContact();
    return (
      <div className={style.container}>
        <div className={style.img}></div>
        <h1 className={style.titlePrimary}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={style.titleSecondary}>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />

        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
