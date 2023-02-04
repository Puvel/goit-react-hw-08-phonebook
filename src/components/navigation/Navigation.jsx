import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './navigation.module.css';

export const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? css.navigationLinkActive : css.navigationLink
        }
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? css.navigationLinkActive : css.navigationLink
          }
        >
          Contacts
        </NavLink>
      )}
    </div>
  );
};
