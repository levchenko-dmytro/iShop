/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import './Navbar.scss';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { SearchParams, getSearchWith } from '../../services/searchHelper';
import { CartAndFavourites } from '../CartAndFavourites';
import { GlobalContext } from '../../GlobalContext';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames('Navbar__link', { 'Navbar__link--active': isActive });

export const Navbar = () => {
  const { pathname } = useLocation();
  const { isVisibleMenu, setIsVisibleMenu } = useContext(GlobalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({
      query: event.target.value || null,
      page: '1',
    });
  };

  const searchIn = pathname
    .split('')
    .filter(ch => !ch.includes('/'))
    .join('');

  return (
    <nav className="Navbar" role="navigation">
      <div className="Navbar__left">
        <Logo />

        <ul className="Navbar__list">
          <li className="Navbar__item">
            <NavLink to="/" className={getActiveClass}>
              Home
            </NavLink>
          </li>

          <li className="Navbar__item">
            <NavLink to="/phones" className={getActiveClass}>
              Phones
            </NavLink>
          </li>

          <li className="Navbar__item">
            <NavLink to="/tablets" className={getActiveClass}>
              Tablets
            </NavLink>
          </li>

          <li className="Navbar__item">
            <NavLink to="/accessories" className={getActiveClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="Navbar__right">
        {(searchIn === 'phones' ||
          searchIn === 'tablets' ||
          searchIn === 'accessories' ||
          searchIn === 'favourites') && (
          <div
            className="Navbar__search-bar"
            style={{
              backgroundColor: query ? '#fafbfc' : '',
            }}
          >
            <input
              placeholder={`Search...`}
              className="Navbar__search"
              value={query}
              onChange={handleSearch}
              style={{
                backgroundColor: query ? '#fafbfc' : '',
              }}
            />

            {!query ? (
              <img
                src="img/icons/search.svg"
                alt="search"
                style={{
                  height: '16px',
                  width: '16px',
                }}
              />
            ) : (
              <button
                data-cy="searchDelete"
                type="button"
                style={{
                  height: '16px',
                  width: '16px',
                  backgroundColor: query ? '#fafbfc' : '',
                  border: '1px solid transparent',
                  backgroundImage: 'url(img/icons/cross.svg)',
                  cursor: 'pointer',
                }}
                onClick={() => setSearchWith({ query: null })}
              />
            )}
          </div>
        )}

        <div className="Navbar__CartAndFavourites">
          <CartAndFavourites width={'128px'} />
        </div>

        <button
          className="button-burger"
          onClick={() => setIsVisibleMenu(!isVisibleMenu)}
          style={{
            backgroundImage: !isVisibleMenu
              ? 'url(./img/icons/burger_menu.svg)'
              : 'url(./img/icons/burger_menu_close.svg)',
          }}
        />
      </div>
    </nav>
  );
};
