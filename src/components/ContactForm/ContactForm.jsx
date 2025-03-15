import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import clsx from "clsx";

import css from "./ContactForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { postContact } from "../../redux/contactsOps";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\+?\d{3,50}$/, "Invalid phone number")
    .required("Required"),
});

function ContactForm() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const phoneFieldId = useId();

  const toAdd = (newContact) => {
    dispatch(postContact({ ...newContact }));
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={toAdd}
      validationSchema={contactSchema}
    >
      <Form className={clsx(css.contactForm)}>
        <div className={clsx(css.contactField)}>
          <label htmlFor={nameFieldId} className={clsx(css.contactLabel)}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={clsx(css.contactInput)}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={clsx(css.contactSpan)}
          />
        </div>
        <div className={clsx(css.contactField)}>
          <label htmlFor={phoneFieldId} className={clsx(css.contactLabel)}>
            Phone
          </label>
          <Field
            type="text"
            name="number"
            id={phoneFieldId}
            className={clsx(css.contactInput)}
          />
          <ErrorMessage
            name="number"
            component="span"
            className={clsx(css.contactSpan)}
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
