import { useSelector } from 'react-redux';
import { Navigation } from 'components/navigation/Navigation';
import { AuthMenu } from 'components/authMenu/AuthMenu';
import { UserMenu } from 'components/userMenu/UserMenu';
import css from './appBar.module.css';

export const AppBar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthMenu />}
    </header>
  );
};
