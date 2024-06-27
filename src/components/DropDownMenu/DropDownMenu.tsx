import { NavLink } from 'react-router-dom';
import './DropDownMenu.scss';
import classNames from 'classnames';
import { CartAndFavourites } from '../CartAndFavourites';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames('DropDownMenu__link', { 'DropDownMenu__link--active': isActive });

export const DropDownMenu = () => {
  const { isVisibleMenu, setIsVisibleMenu } = useContext(GlobalContext);

  return (
    <div
      className="DropDownMenu"
      style={{
        transform: !isVisibleMenu ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="DropDownMenu__wrapper">
        <ul className="DropDownMenu__list">
          <li className="DropDownMenu__item">
            <NavLink
              to={'/'}
              className={getActiveClass}
              onClick={() => setIsVisibleMenu(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="DropDownMenu__item">
            <NavLink
              to={'/phones'}
              className={getActiveClass}
              onClick={() => setIsVisibleMenu(false)}
            >
              Phones
            </NavLink>
          </li>
          <li className="DropDownMenu__item">
            <NavLink
              to={'/tablets'}
              className={getActiveClass}
              onClick={() => setIsVisibleMenu(false)}
            >
              Tablets
            </NavLink>
          </li>
          <li className="DropDownMenu__item">
            <NavLink
              to={'/accessories'}
              className={getActiveClass}
              onClick={() => setIsVisibleMenu(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <div style={{ width: '100%', marginTop: 'auto' }}>
          <CartAndFavourites width={'100%'} />
        </div>
      </div>
    </div>
  );
};
