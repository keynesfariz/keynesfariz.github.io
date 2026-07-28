import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const lastScrollY = useRef(0);
  const isScrollingDownRef = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if at bottom to avoid overlapping with footer
      const atBottom =
        window.innerHeight + Math.round(currentScrollY) >=
        document.body.offsetHeight - 100;
      setIsAtBottom(atBottom);

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        if (!isScrollingDownRef.current && currentScrollY > 10) {
          isScrollingDownRef.current = true;
          setIsScrollingDown(true);
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        if (isScrollingDownRef.current) {
          isScrollingDownRef.current = false;
          setIsScrollingDown(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrollingDown, isAtBottom };
}
