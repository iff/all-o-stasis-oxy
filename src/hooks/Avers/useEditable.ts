import * as Avers from "avers";
import * as React from "react";

export function useEditable<T>(aversH: Avers.Handle, id: string): Avers.Editable<T> {
  const cache = React.useRef<undefined | { promise: Promise<void>; id: string }>(undefined);

  const editable = Avers.lookupEditable(aversH, id).get(undefined);
  if (editable) {
    return editable as Avers.Editable<T>;
  }

  if (cache.current?.id !== id) {
    cache.current = undefined;
  }

  if (!cache.current) {
    cache.current = {
      promise: new Promise<void>((resolve) => {
        const listener = () => {
          const editable = Avers.lookupEditable(aversH, id).get(undefined);
          if (editable) {
            resolve();
            Avers.detachGenerationListener(aversH, listener);
          }
        };

        Avers.attachGenerationListener(aversH, listener);
      }),

      id,
    };
  }

  throw cache.current.promise;
}
