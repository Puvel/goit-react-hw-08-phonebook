import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redax/auth/authOperations';
import css from './userMenu.module.css';
export const UserMenu = () => {
  const email = useSelector(state => state.auth.user.email);
  const dispatch = useDispatch();
  return (
    <div className={css.userMenu}>
      <p className={css.userMenuText}>{email}</p>
      <button
        className={css.userMenuBtn}
        onClick={() => dispatch(logOut())}
        type="button"
      >
        Log Out
      </button>
    </div>
  );
};
