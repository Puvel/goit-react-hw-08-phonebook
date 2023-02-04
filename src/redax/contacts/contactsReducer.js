import { createReducer } from '@reduxjs/toolkit';
import {
  addContactSuccess,
  deleteContactSuccess,
  fetchContactsSuccess,
  editContactSuccess,
} from './contactsActions';

export const contacts = createReducer([], builder => {
  builder
    .addCase(fetchContactsSuccess, (_, { payload }) => payload)
    .addCase(addContactSuccess, (state, { payload }) => [...state, payload])
    .addCase(deleteContactSuccess, (state, { payload }) =>
      state.filter(({ id }) => id !== payload)
    )
    .addCase(editContactSuccess, (state, { payload }) =>
      state.map(contact => (contact.id === payload.id ? payload : contact))
    );
});
