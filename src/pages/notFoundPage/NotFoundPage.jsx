import { Helmet } from 'react-helmet-async';
import css from './notFoundPage.module.css';
export const NotFoundPage = () => {
  return (
    <div className={css.notFoundWrap}>
      <Helmet>
        <title>Not Found Page</title>
      </Helmet>
      <h2 className={css.notFoundTitle}>Not Found!</h2>
    </div>
  );
};
