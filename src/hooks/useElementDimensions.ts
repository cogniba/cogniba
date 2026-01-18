import { useCallback, useEffect, useState } from "react";

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
  const [element, setElement] = useState<Element | null>(null);
  const [dimensions, setDimensions] = useState<ElementDimensions | null>(null);

  const updateDimensions = useCallback(
    (nextElement: Element | null) => {
      if (!nextElement) {
        setDimensions(null);
        return;
      }

      const { height, width, top, left } = nextElement.getBoundingClientRect();

      setDimensions({
        height: height + padding * 2,
        width: width + padding * 2,
        top: top - padding,
        left: left - padding,
        element: nextElement,
      });
    },
    [padding],
  );

  useEffect(() => {
    const newElement = document.querySelector(targetElement);
    if (newElement !== element) {
      setElement(newElement);
    }
    updateDimensions(newElement);

    if (!newElement) return;

    const handleResize = () => {
      updateDimensions(newElement);
    };

    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); };
  }, [element, targetElement, updateDimensions]);

  return dimensions;
}
