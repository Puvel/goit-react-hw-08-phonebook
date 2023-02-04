import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redax/contacts/contactsOperations';
import css from './contactsPage.module.css';
import plus from 'image/plus.svg';
import { Modal } from 'components/modal/Modal';
import { ContactItem } from 'components/contactItem/ContactItem';

export const ContactsPage = () => {
  const [isOpen, setIsOpen] = useState('');
  const [hasEdit, setHasEdit] = useState(false);
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const openModal = () => {
    document.querySelector('body').style.overflow = 'hidden';
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    document.querySelector('body').style.overflow = 'auto';
  };

  const setEdit = state => setHasEdit(state);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contacts}>
      <Helmet>
        <title>Contacts page</title>
      </Helmet>
      <h1 className={css.contactsTitle}>Contacts</h1>
      <button onClick={openModal} className={css.contactsAddBtn} type="button">
        <img className={css.contactsAddImage} src={plus} alt="Plus Icon" />
      </button>
      {contacts.length > 0 && (
        <ul className={css.contactsList}>
          {contacts.map(contact => (
            <ContactItem
              setEdit={setEdit}
              hasEdit={hasEdit}
              key={contact.id}
              contactId={contact.id}
              contactName={contact.name}
              contactNumber={contact.number}
            />
          ))}
        </ul>
      )}
      {isOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};
