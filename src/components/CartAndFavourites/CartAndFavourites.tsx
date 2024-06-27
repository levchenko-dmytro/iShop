import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import './CartAndFavourites.scss';
import useWindowDimensions from '../../hooks/useWindowDimensions';

type Props = {
  width: string;
};

export const CartAndFavourites: React.FC<Props> = ({ width }) => {
  const { pathname } = useLocation();
  const { favouriteItems, cartItems, setIsVisibleMenu } =
    useContext(GlobalContext);

  const { screenWidth } = useWindowDimensions();

  const qntOfItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const handleCloseMenu = () => {
    if (screenWidth >= 640) {
      return;
    }

    setIsVisibleMenu(false);
  };

  return (
    <div className="CartAndFavourites" style={{ width: width }}>
      <Link
        to="/favourites"
        className={classNames(
          'CartAndFavourites__heart CartAndFavourites__link-icons',
          {
            'CartAndFavourites__link-icons--active': pathname === '/favourites',
          },
        )}
        onClick={handleCloseMenu}
      >
        <div
          className="CartAndFavourites__icons-count"
          style={{ display: favouriteItems.length ? '' : 'none' }}
        >
          <span className="CartAndFavourites__icons-text">
            {favouriteItems.length}
          </span>
        </div>
      </Link>

      <Link
        to="/cart"
        className={classNames(
          'CartAndFavourites__cart CartAndFavourites__link-icons',
          {
            'CartAndFavourites__link-icons--active': pathname === '/cart',
          },
        )}
        onClick={handleCloseMenu}
      >
        <div
          className="CartAndFavourites__icons-count"
          style={{ display: cartItems.length ? '' : 'none' }}
        >
          <span className="CartAndFavourites__icons-text">
            {qntOfItemsInCart}
          </span>
        </div>
      </Link>
    </div>
  );
};
