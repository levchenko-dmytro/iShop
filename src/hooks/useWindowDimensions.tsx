import { useState, useLayoutEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: screenWidth } = window;
  let pictureWidth = screenWidth;
  let cardWidth = 212;

  if (screenWidth >= 1200) {
    pictureWidth = 1040;
    cardWidth = 272;
  } else if (screenWidth >= 640 && screenWidth < 1200) {
    pictureWidth = 490;
    cardWidth = 237;
  }

  return { pictureWidth, screenWidth, cardWidth };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useLayoutEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    // window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      // window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
}
