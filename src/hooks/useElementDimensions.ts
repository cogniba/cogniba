import { useEffect, useState } from "react";

export default function useElementDimensions(
  targetElement: string,
  padding = 8,
): {
  height: number;
  width: number;
  top: number;
  left: number;
  element: Element;
} | null {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    setElement(null);
    const newElement = document.querySelector(targetElement);
    setElement(newElement);
  }, [targetElement, element]);

  if (!element) {
    return null;
  }

  const { height, width, top, left } = element.getBoundingClientRect();

  return {
    height: height + padding * 2,
    width: width + padding * 2,
    top: top - padding,
    left: left - padding,
    element,
  };
}
