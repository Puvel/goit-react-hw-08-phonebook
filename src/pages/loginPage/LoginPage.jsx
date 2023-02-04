import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { logIn } from 'redax/auth/authOperations';
import css from './loginPage.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
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
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div className={css.login}>
      <Helmet>
        <title>Login page</title>
      </Helmet>
      <h1 className={css.loginTitle}>Login</h1>
      <form
        className={css.loginForm}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className={css.loginInputWrap}>
          <input
            className={css.loginInput}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label className={`${css.loginLabel} ${email.length && css.focuded}`}>
            Email
          </label>
        </div>

        <div className={css.loginInputWrap}>
          <input
            className={css.loginInput}
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <label
            className={`${css.loginLabel} ${password.length && css.focuded}`}
          >
            Password
          </label>
        </div>

        <button
          className={css.loginBtn}
          disabled={!email || !password}
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
};
