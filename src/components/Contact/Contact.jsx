import React from "react";
import clsx from "clsx";

import css from "./Contact.module.css";

import { useDispatch } from "react-redux";
import { removeContact } from "../../redux/contactsOps";

function Contact({ name, number, id }) {
  const dispatch = useDispatch();

  return (
    <li className={clsx(css.contactItem)}>
      <div>
        <span>👤</span>
        <span>{name}</span>
      </div>
      <div>
        <span>📞</span>
        <span>{number}</span>
      </div>
      <button
        onClick={() => {
          dispatch(removeContact(id));
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default Contact;
