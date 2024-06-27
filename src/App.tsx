import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BreadCrumbs } from './components/BreadCrumbs';
import { DropDownMenu } from './components/DropDownMenu';
import classNames from 'classnames';
import { GlobalContext } from './GlobalContext';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  const isVisible = pathname
    .split('/')
    .filter(item => item !== '')
    .some(item => item !== 'cart');

  const { isVisibleMenu } = useContext(GlobalContext);

  return (
    <div className="App" style={{ overflow: isVisibleMenu ? 'hidden' : '' }}>
      <header className="header">
        <Navbar />

        <DropDownMenu />
      </header>

      <div className="wrapper">
        <div className={classNames('main', { container: '/' !== pathname })}>
          {isVisible && <BreadCrumbs />}
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};
