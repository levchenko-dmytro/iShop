/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import useWindowDimensions from '../../hooks/useWindowDimensions';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const { screenWidth } = useWindowDimensions();
  const [slideIndex, setSlideIndex] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const CARDS_QNT = products.length;

  useEffect(() => {
    if (screenWidth >= 1200) {
      setEndPosition(CARDS_QNT - 4);
    } else if (screenWidth >= 640 && screenWidth < 1200) {
      setEndPosition(CARDS_QNT - 2);
    } else {
      setEndPosition(CARDS_QNT - 1);
    }
  }, [CARDS_QNT, screenWidth]);

  const slideCards = (slideTo: string) => {
    if (slideTo === 'next') {
      setSlideIndex(slideIndex !== endPosition ? slideIndex + 1 : 0);
    } else if (slideTo === 'prev') {
      setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : endPosition);
    }
  };

  let x1: null | number = null;
  let x2: null | number = null;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    x1 = event.changedTouches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!x1) {
      return;
    }

    x2 = event.touches[0].clientX;

    if (x1 - x2 < 0 && slideIndex !== endPosition) {
      slideCards('next');
    } else if (x1 - x2 > 0 && slideIndex !== 0) {
      slideCards('prev');
    }

    x1 = null;
    x2 = null;
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__top">
        <h1 className="ProductsSlider__title">{title}</h1>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className="ProductsSlider__button ProductsSlider__button--prev"
            onClick={() => slideCards('prev')}
            disabled={slideIndex === 0}
          />

          <button
            type="button"
            className="ProductsSlider__button ProductsSlider__button--next"
            onClick={() => slideCards('next')}
            disabled={slideIndex === endPosition}
          />
        </div>
      </div>

      <div
        className="ProductsSlider__wrapper"
        onTouchEnd={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ul
          className="ProductsSlider__container"
          style={{
            transform: `translateX(calc(-${slideIndex * 100}% - ${slideIndex * 16}px))`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className="ProductsSlider__card-container">
              <ProductCard product={product} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
