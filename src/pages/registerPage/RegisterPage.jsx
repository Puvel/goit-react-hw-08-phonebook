import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { register } from 'redax/auth/authOperations';
import css from './registerPage.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={css.register}>
      <Helmet>
        <title>Registration page</title>
      </Helmet>
      <h1 className={css.registerTitle}>Registration</h1>
      <form
        className={css.registerForm}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className={css.registerInputWrap}>
          <input
            className={css.registerInput}
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <label
            className={`${css.registerLabel} ${name.length && css.focuded}`}
          >
            Name
          </label>
        </div>

        <div className={css.registerInputWrap}>
          <input
            className={css.registerInput}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label
            className={`${css.registerLabel} ${email.length && css.focuded}`}
          >
            Email
          </label>
        </div>

        <div className={css.registerInputWrap}>
          <input
            className={css.registerInput}
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <label
            className={`${css.registerLabel} ${password.length && css.focuded}`}
          >
            Password
          </label>
        </div>

        <button
          className={css.registerBtn}
          disabled={!name || !email || !password}
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
