import * as Avers from "avers";
import * as React from "react";

export function useEditable<T>(aversH: Avers.Handle, id: string): Avers.Editable<T> {
  const cache = React.useRef<undefined | { promise: Promise<void>; id: string; listener: () => void }>(undefined);

  // Clean up listener when id changes or component unmounts
  React.useEffect(() => {
    // If id changes and there's a cached listener for a different id, clean it up
    if (cache.current?.id !== id && cache.current?.listener) {
      Avers.detachGenerationListener(aversH, cache.current.listener);
      cache.current = undefined;
    }

    // Cleanup on unmount
    return () => {
      if (cache.current?.listener) {
        Avers.detachGenerationListener(aversH, cache.current.listener);
      }
    };
  }, [aversH, id]);

  const editable = Avers.lookupEditable(aversH, id).get(undefined);
  if (editable) {
    return editable as Avers.Editable<T>;
  }

  if (cache.current?.id !== id) {
    cache.current = undefined;
  }

  if (!cache.current) {
    let listener: () => void;

    const promise = new Promise<void>((resolve) => {
      listener = () => {
        const editable = Avers.lookupEditable(aversH, id).get(undefined);
        if (editable) {
          resolve();
        }
      };

      Avers.attachGenerationListener(aversH, listener);
    });

    cache.current = {
      promise,
      id,
      listener: listener!,
    };
  }

  throw cache.current.promise;
}
