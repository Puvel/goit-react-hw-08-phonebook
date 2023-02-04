import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContact, editContact } from 'redax/contacts/contactsOperations';
import bin from 'image/bin.svg';
import pencil from 'image/pencil.svg';
import disk from 'image/floppy-disk.svg';
import cancel from 'image/cancel.svg';
import css from './contactItem.module.css';

export const ContactItem = ({
  contactId,
  contactName,
  contactNumber,
  hasEdit,
  setEdit,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(contactName);
  const [number, setNumber] = useState(contactNumber);
  const [isEdit, setIsEdit] = useState(false);

  const editHandle = () =>
    setTimeout(() => {
      setIsEdit(true);
      setEdit(true);
    }, 0);
  const cancelHandle = () => {
    setName(contactName);
    setNumber(contactNumber);
    setIsEdit(false);
    setEdit(false);
  };

  const deleteHandle = () => dispatch(deleteContact(contactId));

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const submitHandle = e => {
    e.preventDefault();

    if (!name || !number) return;

    dispatch(editContact(contactId, { name, number }));
    setIsEdit(false);
    setEdit(false);
  };

  return (
    <li key={contactId} className={css.contact}>
      <form className={css.contactForm} onSubmit={submitHandle}>
        <div className={css.contactInputsWrap}>
          <div className={css.contactControl}>
            <label className={css.contactLabel} htmlFor="name">
              Name
            </label>
            {isEdit ? (
              <input
                className={css.contactInput}
                type="text"
                id="name"
                name="name"
                disabled={!isEdit}
                onChange={handleChange}
                value={name}
              />
            ) : (
              <p className={css.contactText}>{name}</p>
            )}
          </div>
          <div className={css.contactControl}>
            <label className={css.contactLabel} htmlFor="number">
              Number
            </label>
            {isEdit ? (
              <input
                className={css.contactInput}
                id="number"
                type="text"
                name="number"
                disabled={!isEdit}
                onChange={handleChange}
                value={number}
              />
            ) : (
              <p className={css.contactText}>{number}</p>
            )}
          </div>
        </div>

        {isEdit ? (
          <div className={css.contactsBtnWrap}>
            <button
              disabled={!isEdit}
              className={`${css.contactsSaveBtn} ${css.btn}`}
              type="submit"
            >
              <img
                className={css.contactsBtnIcon}
                src={disk}
                alt="Floppy disk Icon"
              />
            </button>
            <button
              onClick={cancelHandle}
              disabled={!isEdit}
              className={`${css.contactsCancelBtn} ${css.btn}`}
              type="button"
            >
              <img
                className={css.contactsBtnIcon}
                src={cancel}
                alt="Cancel Icon"
              />
            </button>
          </div>
        ) : (
          !hasEdit && (
            <div className={css.contactsBtnWrap}>
              <button
                disabled={isEdit}
                onClick={editHandle}
                className={`${css.contactsEditBtn} ${css.btn}`}
                type="button"
              >
                <img
                  className={css.contactsBtnIcon}
                  src={pencil}
                  alt="Pencil Icon"
                />
              </button>
              <button
                disabled={isEdit}
                onClick={deleteHandle}
                className={`${css.contactsDeleteBtn} ${css.btn}`}
                type="button"
              >
                <img className={css.contactsBtnIcon} src={bin} alt="Bin Icon" />
              </button>
            </div>
          )
        )}
      </form>
    </li>
  );
};

ContactItem.propTypes = {
  contactId: PropTypes.string.isRequired,
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  contact: PropTypes.func.isRequired,
  hasEdit: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
};
