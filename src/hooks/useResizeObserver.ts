import { useRef, useState, useEffect } from "react";

export interface BoundingRect {
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
  readonly bottom: number;
  readonly right: number;
}

export interface UseResizeObserverResult {
  ref: React.RefCallback<Element>;
  bounds: BoundingRect | undefined;
}

export function useResizeObserver(): UseResizeObserverResult {
  const [bounds, setBounds] = useState<BoundingRect | undefined>(undefined);
  const elementRef = useRef<Element | null>(null);

  const ref: React.RefCallback<Element> = (element) => {
    elementRef.current = element;
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        setBounds({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
        });
      }
    });

    observer.observe(element);

    // Get initial dimensions
    const rect = element.getBoundingClientRect();
    setBounds({
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    });

    return () => {
      observer.disconnect();
    };
  }, [elementRef.current]);

  return { ref, bounds };
}
