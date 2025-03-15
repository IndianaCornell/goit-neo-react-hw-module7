import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import contacts from "../data/contacts.json";

import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import { useDispatch } from "react-redux";
import { getAllContacts } from "../redux/contactsOps";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
}

export default App;
