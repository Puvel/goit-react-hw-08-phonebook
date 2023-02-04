import { NavLink } from 'react-router-dom';
import css from './authMenu.module.css';

export const AuthMenu = () => (
  <div className={css.authMenu}>
    <NavLink
      to="/register"
      className={({ isActive }) =>
        isActive ? css.authLinkActive : css.authLink
      }
    >
      Register
    </NavLink>
    <NavLink
      to="/login"
      className={({ isActive }) =>
        isActive ? css.authLinkActive : css.authLink
      }
    >
      Log In
    </NavLink>
  </div>
);
