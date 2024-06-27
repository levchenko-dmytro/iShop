/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Dimensions } from '../../services/Dimensions';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const { onDesktop, onMobile, onTablet, gap } = Dimensions;

  const { cardWidth } = useWindowDimensions();
  const SLIDER_WIDTH =
    cardWidth === onDesktop.cardWidth
      ? onDesktop.screenWidth - onDesktop.padding * 2
      : cardWidth === onTablet.cardWidth
        ? onTablet.screenWidth - onTablet.padding * 2
        : onMobile.screenWidth - onMobile.padding * 2;

  const CARDS_QNT = products.length;
  const GAPS_QNT = products.length - 1;

  const END_PSN =
    cardWidth === onDesktop.cardWidth
      ? CARDS_QNT - 4
      : cardWidth === onTablet.cardWidth
        ? CARDS_QNT - 2
        : CARDS_QNT - 1;

  const PRODUCT_CARD_CONTAINER_WIDTH = CARDS_QNT * cardWidth + GAPS_QNT * gap;

  const [slideIndex, setSlideIndex] = useState(0);

  const slideCards = (slideTo: string) => {
    if (slideTo === 'next') {
      setSlideIndex(slideIndex !== END_PSN ? slideIndex + 1 : 0);
    } else if (slideTo === 'prev') {
      setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : END_PSN);
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

    if (x1 - x2 < 0 && slideIndex !== END_PSN) {
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
            disabled={slideIndex === END_PSN}
          />
        </div>
      </div>

      <div
        className="ProductsSlider__wrapper"
        style={{
          width: `${SLIDER_WIDTH}px`,
          overflow: cardWidth === onDesktop.cardWidth ? 'hidden' : 'visible',
        }}
        onTouchEnd={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ul
          className="ProductsSlider__container"
          style={{
            width: PRODUCT_CARD_CONTAINER_WIDTH,
            transform: `translateX(-${slideIndex * (cardWidth + gap)}px)`,
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
