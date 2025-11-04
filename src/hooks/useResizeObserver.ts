import { useState, useCallback, useRef } from "react";

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
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback<React.RefCallback<Element>>((element) => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!element) {
      setBounds(undefined);
      return;
    }

    // Create new observer
    observerRef.current = new ResizeObserver((entries) => {
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

    observerRef.current.observe(element);

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
  }, []);

  return { ref, bounds };
}
