import { useState, useEffect, RefObject } from 'react';

export function useInView(ref: RefObject<Element>, options: IntersectionObserverInit = {}): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIntersecting(true);
            // Once it's in view, we don't need to observe it anymore
            observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]); 

  return isIntersecting;
}