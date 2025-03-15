import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

import css from "./ContactList.module.css";

import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contactsSlice";

function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={clsx(css.contactList)}>
      {visibleContacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          number={contact.number}
          id={contact.id}
        />
      ))}
    </ul>
  );
}

export default ContactList;
