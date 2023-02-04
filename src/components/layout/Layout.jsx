import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { AppBar } from 'components/appBar/AppBar';
import { Loader } from 'components/loader/Loader';
import css from './layout.module.css';

export const Layout = () => {
  const isLoading = useSelector(state => state.loading);
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense>
        <Outlet />
      </Suspense>
      <Toaster />
      {isLoading && <Loader />}
    </div>
  );
};
