import React, { useEffect } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import css from "./ContactList.module.css";

import Contact from "../Contact/Contact";

import { getAllContacts } from "../../redux/contactsOps";

function ContactList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filter);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ul className={clsx(css.contactList)}>
      {visibleContacts.map((contact) => (
        <Contact key={contact.id} name={contact.name} number={contact.number} />
      ))}
    </ul>
  );
}

export default ContactList;
