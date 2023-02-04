import { lazy, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from 'redax/auth/authOperations';
import { Layout } from 'components/layout/Layout';

const HomePage = lazy(() =>
  import('pages/homePage/HomePage').then(module => ({
    default: module.HomePage,
  }))
);

const RegisterPage = lazy(() =>
  import('pages/registerPage/RegisterPage').then(module => ({
    default: module.RegisterPage,
  }))
);

const LoginPage = lazy(() =>
  import('../pages/loginPage/LoginPage').then(module => ({
    default: module.LoginPage,
  }))
);

const ContactsPage = lazy(() =>
  import('pages/contactsPage/ContactsPage').then(module => ({
    default: module.ContactsPage,
  }))
);

const NotFoundPage = lazy(() =>
  import('pages/notFoundPage/NotFoundPage').then(module => ({
    default: module.NotFoundPage,
  }))
);

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={
              isLoggedIn ? <Navigate to="/contacts" /> : <RegisterPage />
            }
          />
          <Route
            path="login"
            element={isLoggedIn ? <Navigate to="/contacts" /> : <LoginPage />}
          />
          <Route
            path="contacts"
            element={
              !isRefreshing && !isLoggedIn ? (
                <Navigate to="/login" />
              ) : (
                <ContactsPage />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    )
  );
};
