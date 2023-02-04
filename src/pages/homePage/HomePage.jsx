import { Helmet } from 'react-helmet-async';
import book from 'image/book.svg';
import css from './homePage.module.css';
export const HomePage = () => (
  <section className={css.home}>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <img className={css.homeImage} src={book} alt="phonebook" />
    <p className={css.homeTitle}>
      Your personal phone book, always at your fingertips.
    </p>
  </section>
);
