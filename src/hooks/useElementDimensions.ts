import { useCallback, useEffect, useRef, useState } from "react";

type ElementDimensions = {
  height: number;
  width: number;
  top: number;
  left: number;
  element: Element;
};

export default function useElementDimensions(
  targetElement: string,
  padding = 8,
): ElementDimensions | null {
  const [dimensions, setDimensions] = useState<ElementDimensions | null>(null);
  const dimensionsRef = useRef<ElementDimensions | null>(null);

  const updateDimensions = useCallback(
    (nextElement: Element | null) => {
      if (!nextElement) {
        setDimensions(null);
        return;
      }

      const { height, width, top, left } = nextElement.getBoundingClientRect();

      const nextDimensions = {
        height: height + padding * 2,
        width: width + padding * 2,
        top: top - padding,
        left: left - padding,
        element: nextElement,
      };

      dimensionsRef.current = nextDimensions;
      setDimensions(nextDimensions);
    },
    [padding],
  );

  useEffect(() => {
    const newElement = document.querySelector(targetElement);

    if (!newElement) {
      dimensionsRef.current = null;
      return;
    }

    const handleResize = () => {
      updateDimensions(newElement);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [padding, targetElement, updateDimensions]);

  return dimensions;
}
