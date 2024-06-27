import React, { createContext, useEffect, useState } from 'react';
import { useLocaleStorage } from './hooks/useLocalStorage';
import { Product } from './types/Product';
import { getProducts } from './api/products';
import { Category } from './types/Category';
import { Cart } from './types/Cart';
import useWindowDimensions from './hooks/useWindowDimensions';

type GlobalProps = {
  productsList: Product[];
  setProductsList: (products: Product[]) => void;
  cartItems: Cart[];
  setCartItems: (items: Cart[]) => void;
  favouriteItems: Product[];
  setFavouriteItems: (items: Product[]) => void;
  categoriesList: Category[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isVisibleMenu: boolean;
  setIsVisibleMenu: (val: boolean) => void;
};

export const GlobalContext = createContext<GlobalProps>({
  productsList: [],
  setProductsList: () => {},
  cartItems: [],
  setCartItems: () => {},
  favouriteItems: [],
  setFavouriteItems: () => {},
  categoriesList: [],
  isLoading: false,
  setIsLoading: () => {},
  isVisibleMenu: false,
  setIsVisibleMenu: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);

  const [cartItems, setCartItems] = useLocaleStorage<Cart[]>('cartItems', []);

  const [favouriteItems, setFavouriteItems] = useLocaleStorage<Product[]>(
    'favouriteItems',
    [],
  );

  const [isLoading, setIsLoading] = useState(false);

  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProductsList)
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  const getQntOfproducts = (type: string) => {
    return productsList.filter(item => item.category === type).length;
  };

  const { pictureWidth } = useWindowDimensions();

  const path = pictureWidth === 490 ? 'tablet' : 'desktop';

  const categoriesList = [
    {
      title: 'Mobile phones',
      img: `img/Shop-by-category/${path}/mobiles.png`,
      color: '#fcdbc1',
      name: 'phones',
      qnt: getQntOfproducts('phones'),
    },
    {
      title: 'Tablets',
      img: `img/Shop-by-category/${path}/tabs.png`,
      color: '#8d8d92',
      name: 'tablets',
      qnt: getQntOfproducts('tablets'),
    },
    {
      title: 'Accessories',
      img: `img/Shop-by-category/${path}/accessories.png`,
      color: '#973d5f',
      name: 'accessories',
      qnt: getQntOfproducts('accessories'),
    },
  ];

  return (
    <GlobalContext.Provider
      value={{
        productsList,
        setProductsList,
        cartItems,
        setCartItems,
        favouriteItems,
        setFavouriteItems,
        categoriesList,
        isLoading,
        setIsLoading,
        isVisibleMenu,
        setIsVisibleMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
