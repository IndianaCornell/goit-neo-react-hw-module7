import React from "react";
import { Formik, Form, Field } from "formik";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import css from "./SearchBox.module.css";
import { filteredContacts } from "../../redux/filtersSlice";

function SearchBox() {
  const dispatch = useDispatch();
  return (
    <Formik initialValues={{ search: "" }}>
      {({ values, handleChange }) => (
        <Form>
          <Field
            type="text"
            name="search"
            placeholder="Search contacts..."
            value={values.search}
            className={clsx(css.contactLabel)}
            onChange={(e) => {
              handleChange(e);
              dispatch(filteredContacts(e.target.value));
            }}
          />
        </Form>
      )}
    </Formik>
  );
}

export default SearchBox;
