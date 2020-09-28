import React, { Component } from "react";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (contact) => {
    const newContact = {
      ...contact,
      id: uuidv4(),
    };

    const { contacts } = this.state;

    const isInContacts = contacts.some((contact) =>
      contact.name.includes(newContact.name)
    );

    isInContacts
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState((prevState) => {
          const { contacts } = prevState;

          const newContactsArr = [...contacts, newContact];

          return { contacts: newContactsArr };
        });
  };

  filterHandler = (e) => {
    const { value } = e.target;

    this.setState({
      filter: value,
    });

    this.filterUpdater();
  };

  filterUpdater = () => {
    const { filter, contacts } = this.state;

    if (filter.length === 0) {
      return;
    }
    const filteredArray = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredArray;
  };

  deleteButtonHandler = (id) => {
    this.setState((prevState) => {
      const { contacts } = prevState;

      const newContactsArr = contacts.filter((contact) => contact.id !== id);

      return { contacts: newContactsArr };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const listArray = filter.length === 0 ? contacts : this.filterUpdater();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onAddButton={this.addContact} />

        <h2 className="contactsTitle">Contacts</h2>

        <Filter filterHandler={this.filterHandler} />
        <ContactList
          contactsList={listArray}
          deleteHandler={this.deleteButtonHandler}
        />
      </div>
    );
  }
}

export default App;
