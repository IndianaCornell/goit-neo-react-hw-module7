import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getAllContacts, postContact, removeContact } from "./contactsOps";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleAddFulfilled = (state, action) => {
  return { ...state, items: [...state.items, action.payload] };
};

const handleDeleteContact = (state, action) => {
  return {
    ...state,
    items: state.items.filter((item) => item.id !== action.payload.id),
  };
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, handlePending)
      .addCase(getAllContacts.fulfilled, handleFulfilled)
      .addCase(getAllContacts.rejected, handleRejected)
      .addCase(postContact.pending, handlePending)
      .addCase(postContact.fulfilled, handleAddFulfilled)
      .addCase(postContact.rejected, handleRejected)
      .addCase(removeContact.pending, handlePending)
      .addCase(removeContact.fulfilled, handleDeleteContact)
      .addCase(removeContact.rejected, handleRejected);
  },
});

export const contactsReducer = slice.reducer;

const selectContacts = (state) => state.contacts.items;
const selectFilter = (state) => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (items, filter) => {
    return items.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
