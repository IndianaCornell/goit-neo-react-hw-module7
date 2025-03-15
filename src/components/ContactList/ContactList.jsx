import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

import css from "./ContactList.module.css";

import Contact from "../Contact/Contact";

function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filter);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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
