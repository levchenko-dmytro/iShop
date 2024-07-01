/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';

const pictures = [
  { id: 1, title: 'phones', url: 'updated_data/img/banner-phones.png' },
  { id: 2, title: 'tablets', url: 'updated_data/img/banner-tablets.png' },
  {
    id: 3,
    title: 'accessories',
    url: 'updated_data/img/banner-accessories.png',
  },
];

let ANIMATION_DURATION = '500ms';
const imageLinkPart = 'https://levchenko-dmytro.github.io/phone-catalog/';

export const Banner = () => {
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(100);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(false);

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
          setTranslateX(100 * (current - 1));
          setCurrent(prev => prev - 1);
        }
      } else if (mode === 'next') {
        if (current === pictures.length) {
          setCurrent(1);
          setTranslateX(100 * (pictures.length + 1));
          setIsDisabledNext(true);
          setTimeout(() => setIsDisabledNext(false), 500);
        } else {
          setTranslateX(100 * (current + 1));
          setCurrent(prev => prev + 1);
        }
      }
    },
    [current],
  );

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        ANIMATION_DURATION = '0ms';
        setTranslateX(100 * current);
      }

      if (current >= pictures.length) {
        ANIMATION_DURATION = '0ms';
        setTranslateX(100 * pictures.length);
      }
    };

    document.addEventListener('transitionend', transitionEnd);

    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current, slides]);

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
    <div className="banner">
      <div className="banner__container">
        <button
          type="button"
          className="banner__button"
          onClick={() => handleSwitchSlides('prev')}
          disabled={isDisabledPrev}
          style={{
            backgroundImage: isDisabledPrev
              ? `url(${imageLinkPart}/img/icons/arrow-left-dis.svg)`
              : `url(${imageLinkPart}/img/icons/arrow-left.svg)`,
          }}
        />

        <div
          className="banner__img-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className="banner__img-wrapper"
            style={{
              transform: `translateX(-${translateX}%)`,
              transition: ANIMATION_DURATION,
            }}
          >
            {slides.map(picture => (
              <img
                className="banner__img"
                key={picture.id}
                src={`${picture.url}`}
                alt={picture.title}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="banner__button"
          onClick={() => handleSwitchSlides('next')}
          disabled={isDisabledNext}
          style={{
            backgroundImage: isDisabledNext
              ? `url(${imageLinkPart}/img/icons/arrow-right-dis.svg)`
              : `url(${imageLinkPart}/img/icons/arrow-right.svg)`,
          }}
        />
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
