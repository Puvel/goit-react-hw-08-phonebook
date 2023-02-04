import axios from 'axios';
import toast from 'react-hot-toast';
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
  editContactRequest,
  editContactSuccess,
  editContactError,
} from './contactsActions';

export const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    let message = '';
    if (error.response.status === 401) {
      message = 'Unauthorized';
    } else if (error.response.status === 404) {
      message = 'Not found!';
    } else if (error.response.status === 500) {
      message = 'Server error!';
    }
    toast(message);
    dispatch(fetchContactsError(error.message));
  }
};

export const addContact = contactData => async dispatch => {
  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contactData);
    dispatch(addContactSuccess(data));
  } catch (error) {
    let message = '';
    if (error.response.status === 400) {
      message = 'Name and phone is required!';
    } else if (error.response.status === 401) {
      message = 'Unauthorized';
    } else if (error.response.status === 404) {
      message = 'Not found!';
    } else if (error.response.status === 500) {
      message = 'Server error!';
    }
    toast(message);
    dispatch(addContactError(error.message));
  }
};

export const deleteContact = contactId => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);
    dispatch(deleteContactSuccess(contactId));
  } catch (error) {
    let message = '';
    if (error.response.status === 401) {
      message = 'Unauthorized';
    } else if (error.response.status === 404) {
      message = 'Not found!';
    } else if (error.response.status === 500) {
      message = 'Server error!';
    }
    toast(message);
    deleteContactError(error.message);
  }
};

export const editContact = (contactId, contactBody) => async dispatch => {
  dispatch(editContactRequest());

  try {
    const { data } = await axios.patch(`/contacts/${contactId}`, contactBody);
    dispatch(editContactSuccess(data));
  } catch (error) {
    let message = '';
    if (error.response.status === 401) {
      message = 'Unauthorized';
    } else if (error.response.status === 404) {
      message = 'Not found!';
    } else if (error.response.status === 500) {
      message = 'Server error!';
    }
    toast(message);
    editContactError(error.message);
  }
};
