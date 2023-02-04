import { createReducer } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
} from 'redax/auth/authOperations';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  changeFilter,
  editContactRequest,
  editContactSuccess,
  editContactError,
} from 'redax/contacts/contactsActions';

export const loading = createReducer(false, {
  [register.pending]: () => true,
  [register.fulfilled]: () => false,
  [register.rejected]: () => false,
  [logIn.pending]: () => true,
  [logIn.fulfilled]: () => false,
  [logIn.rejected]: () => false,
  [logOut.pending]: () => true,
  [logOut.fulfilled]: () => false,
  [logOut.rejected]: () => false,
  [fetchCurrentUser.pending]: () => true,
  [fetchCurrentUser.fulfilled]: () => false,
  [fetchCurrentUser.rejected]: () => false,
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
  [editContactRequest]: () => true,
  [editContactSuccess]: () => false,
  [editContactError]: () => false,
});

export const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});
