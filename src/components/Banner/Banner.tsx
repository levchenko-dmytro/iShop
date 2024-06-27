/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Dimensions } from '../../services/Dimensions';

const pictures = [
  { id: 1, title: 'phones', url: '_new/img/banner-phones.png' },
  { id: 2, title: 'tablets', url: '_new/img/banner-tablets.png' },
  { id: 3, title: 'accessories', url: '_new/img/banner-accessories.png' },
];

let ANIMATION_DURATION = '500ms';
const imageLinkPart = 'https://mate-academy.github.io/react_phone-catalog/';

export const Banner = () => {
  const [current, setCurrent] = useState(1);
  const { pictureWidth } = useWindowDimensions();
  const [translateX, setTranslateX] = useState(pictureWidth);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(false);
  const { onTablet } = Dimensions;

  const slides = useMemo(() => {
    let items = [...pictures];

    if (pictures.length > 1) {
      items = [
        { ...pictures[pictures.length - 1], id: 0 },
        ...pictures,
        { ...pictures[0], id: pictures.length + 1 },
      ];
    }

    return items;
  }, []);

  const wrapperWidth = pictureWidth * slides.length;

  const handleSwitchSlides = useCallback(
    (mode: string) => {
      ANIMATION_DURATION = '500ms';

      if (mode === 'prev') {
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(pictures.length);
          setIsDisabledPrev(true);
          setTimeout(() => setIsDisabledPrev(false), 500);
        } else {
          setTranslateX(pictureWidth * (current - 1));
          setCurrent(prev => prev - 1);
        }
      } else if (mode === 'next') {
        if (current === pictures.length) {
          setCurrent(1);
          setTranslateX(pictureWidth * (pictures.length + 1));
          setIsDisabledNext(true);
          setTimeout(() => setIsDisabledNext(false), 500);
        } else {
          setTranslateX(pictureWidth * (current + 1));
          setCurrent(prev => prev + 1);
        }
      }
    },
    [current, pictureWidth],
  );

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        ANIMATION_DURATION = '0ms';
        setTranslateX(pictureWidth * current);
      }

      if (current >= pictures.length) {
        ANIMATION_DURATION = '0ms';
        setTranslateX(pictureWidth * pictures.length);
      }
    };

    document.addEventListener('transitionend', transitionEnd);

    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current, pictureWidth, slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwitchSlides('next');
    }, 5000);

    return () => clearInterval(interval);
  }, [handleSwitchSlides, current]);

  let x1: null | number = null;
  let x2 = 0;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    x1 = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!x1) {
      return;
    }

    x2 = event.touches[0].clientX;

    const deltaX = x1 - x2;

    if (deltaX > 0) {
      handleSwitchSlides('next');
    } else if (deltaX < 0) {
      handleSwitchSlides('prev');
    }

    x1 = null;
  };

  return (
    <div
      className={classNames('banner', {
        container: pictureWidth >= onTablet.screenWidth,
      })}
    >
      <div className="banner__container">
        <button
          type="button"
          className="banner__button"
          onClick={() => handleSwitchSlides('prev')}
          disabled={isDisabledPrev}
        >
          <i className="fa fa-angle-left fa-fw" aria-hidden="true" />
        </button>

        <div
          className="banner__img-container"
          style={{ width: `${pictureWidth}px` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className="banner__img-wrapper"
            style={{
              width: `${wrapperWidth}px`,
              transform: `translateX(-${translateX}px)`,
              transition: ANIMATION_DURATION,
            }}
          >
            {slides.map(picture => (
              <img
                className="banner__img"
                key={picture.id}
                src={`${imageLinkPart}/${picture.url}`}
                alt={picture.title}
                style={{ width: `${pictureWidth}px` }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="banner__button"
          onClick={() => handleSwitchSlides('next')}
          disabled={isDisabledNext}
        >
          <i className="fa fa-angle-right fa-fw" aria-hidden="true" />
        </button>
      </div>
      <div className="dots">
        {pictures.map(pic => (
          <div
            key={pic.id}
            className={classNames('dots__dot', {
              'dots__dot--active': current === pic.id,
            })}
          />
        ))}
      </div>
    </div>
  );
};
