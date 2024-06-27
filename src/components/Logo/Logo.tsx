import { useContext } from 'react';
import './Logo.scss';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';

export const Logo = () => {
  const { isVisibleMenu, setIsVisibleMenu } = useContext(GlobalContext);

  return (
    <Link to="/">
      <img
        className="icon-apple"
        src="img/icons/free-icon-mac-os-logo-2235.png"
        alt="icon-mac"
        onClick={() => isVisibleMenu && setIsVisibleMenu(false)}
      />
    </Link>
  );
};
