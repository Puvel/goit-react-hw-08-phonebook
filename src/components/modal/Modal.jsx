import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addContact } from 'redax/contacts/contactsOperations';
import cross from 'image/cross.svg';
import css from './modal.module.css';

export const Modal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const overlayRef = useRef(null);

  const handleKeyDown = useCallback(
    e => {
      if (e.code !== 'Escape') return;
      closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOverlayClick = e => {
    const { current } = overlayRef;
    if (current && e.target !== current) {
      return;
    }
    closeModal();
  };

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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
    closeModal();
  };
  return (
    <>
      <div
        className={css.overlay}
        ref={overlayRef}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
      ></div>
      <div className={css.modal}>
        <div className={css.modalCloseWrap}>
          <p className={css.modalText}>New contact</p>
          <button
            className={css.modalCloseBtn}
            onClick={closeModal}
            type="button"
          >
            <img className={css.modalCloseIcon} src={cross} alt="Cross Icon" />
          </button>
        </div>
        <form
          className={css.modalForm}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={css.modalInputWrap}>
            <input
              className={css.modalInput}
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <label
              className={`${css.modalLabel} ${name.length && css.focuded}`}
            >
              Name
            </label>
          </div>

          <div className={css.modalInputWrap}>
            <input
              className={css.modalInput}
              id="number"
              type="text"
              name="number"
              value={number}
              onChange={handleChange}
            />
            <label
              className={`${css.modalLabel} ${number.length && css.focuded}`}
            >
              Password
            </label>
          </div>

          <button
            className={css.modalBtn}
            disabled={!name || !number}
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
