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
  const [touchStartPos, setTouchStartPos] = useState<null | number>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipingDistance, setSwipingDistance] = useState(0);
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

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      return;
    }

    setTouchStartPos(event.touches[0].screenX);
    setIsSwiping(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      return;
    }

    if (!isSwiping) {
      return;
    }

    if (!touchStartPos) {
      return;
    }

    setSwipingDistance(touchStartPos - event.touches[0].screenX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.changedTouches.length !== 1) {
      return;
    }

    if (swipingDistance > 0) {
      slideCards('next');
    }

    if (swipingDistance < 0) {
      slideCards('prev');
    }

    setIsSwiping(false);
    setTouchStartPos(null);
    setSwipingDistance(0);
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
